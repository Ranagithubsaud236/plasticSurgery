import { useEffect, useRef, useState } from 'react'
import { Img } from './ui'
import { gsap } from '../lib/motion'

/* ---------------------------------------------------------------------------
 * WebGL liquid distortion for image hovers.
 *
 * The normal <img> always renders (SEO, alt text, srcset, fallback). On the first
 * hover a WebGL canvas is created on top of it, drawn with the exact same
 * object-cover crop, so at rest it is pixel-identical. While hovering, a flowing
 * noise field and a ripple around the cursor bend the picture like liquid.
 * No colour split or glow: the photo keeps its true colours. The effect is rendered only while it is visible/animating.
 *
 * Disabled (plain image + CSS zoom instead) on touch devices, with reduced motion,
 * or when WebGL is unavailable.
 * ------------------------------------------------------------------------- */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uRes;      // canvas size (px)
uniform vec2 uImg;      // texture size (px)
uniform vec2 uFocus;    // object-position (0..1)
uniform vec2 uMouse;    // cursor in uv space
uniform float uHover;   // 0..1 effect strength
uniform float uTime;
uniform float uStrength;

// value noise
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) { return noise(p) * 0.6 + noise(p * 2.1) * 0.3 + noise(p * 4.3) * 0.1; }

// object-fit: cover
vec2 coverUv(vec2 uv) {
  float rs = uRes.x / uRes.y, ri = uImg.x / uImg.y;
  vec2 scale = rs < ri ? vec2(rs / ri, 1.0) : vec2(1.0, ri / rs);
  return uv * scale + (1.0 - scale) * uFocus;
}

void main() {
  vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
  float d = distance(vUv * aspect, uMouse * aspect);
  float near = smoothstep(0.75, 0.0, d);

  // flowing liquid field
  vec2 flow = vec2(fbm(vUv * 3.0 + uTime * 0.35), fbm(vUv * 3.0 - uTime * 0.3 + 7.3)) - 0.5;
  // ripple rings spreading from the cursor
  vec2 dir = normalize(vUv - uMouse + 1e-5);
  float ripple = sin(d * 24.0 - uTime * 4.5) * near;

  vec2 disp = (flow * (0.45 + near) * 0.14 + dir * ripple * 0.022) * uHover * uStrength;

  // gentle zoom-in while hovering
  vec2 uv = (vUv - 0.5) * (1.0 - 0.06 * uHover) + 0.5;

  gl_FragColor = vec4(texture2D(uTex, coverUv(uv + disp)).rgb, 1.0);
}`

const canUseLiquid = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(any-hover: hover)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const parseFocus = (pos = 'center') => {
  const word = { left: 0, top: 0, center: 0.5, right: 1, bottom: 1 }
  const parts = pos.trim().split(/\s+/)
  const toN = (v) => (v in word ? word[v] : v.endsWith('%') ? parseFloat(v) / 100 : 0.5)
  let x = toN(parts[0] ?? 'center'), y = toN(parts[1] ?? 'center')
  if (parts.length === 1 && (parts[0] === 'top' || parts[0] === 'bottom')) { x = 0.5; y = word[parts[0]] }
  return [x, 1 - y] // WebGL uv has y up
}

const MAX_LIVE = 8
const pool = [] // { release }, most recently used last
function touchPool(entry) {
  const i = pool.indexOf(entry)
  if (i !== -1) pool.splice(i, 1)
  pool.push(entry)
  while (pool.length > MAX_LIVE) pool.shift().release()
}

function createRenderer(canvas, imgEl, focus) {
  const gl = canvas.getContext('webgl', { premultipliedAlpha: false, antialias: false, alpha: false })
  if (!gl) return null

  const compile = (type, src) => {
    const s = gl.createShader(type)
    gl.shaderSource(s, src); gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s))
    return s
  }
  const prog = gl.createProgram()
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const aPos = gl.getAttribLocation(prog, 'aPos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const u = Object.fromEntries(['uTex', 'uRes', 'uImg', 'uFocus', 'uMouse', 'uHover', 'uTime', 'uStrength'].map((n) => [n, gl.getUniformLocation(prog, n)]))
  gl.uniform2f(u.uFocus, focus[0], focus[1])

  const tex = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v)

  const state = { ready: false }
  // Load a CORS-enabled copy of whichever srcset candidate the browser picked.
  const src = new Image()
  src.crossOrigin = 'anonymous'
  src.onload = () => {
    try {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src)
      gl.uniform2f(u.uImg, src.naturalWidth, src.naturalHeight)
      state.ready = true
    } catch { state.error = true /* tainted or blocked: stay on the plain image */ }
  }
  src.onerror = () => { state.error = true }
  src.src = imgEl.currentSrc || imgEl.src

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const { width, height } = canvas.getBoundingClientRect()
    canvas.width = Math.max(1, Math.round(width * dpr))
    canvas.height = Math.max(1, Math.round(height * dpr))
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(u.uRes, canvas.width, canvas.height)
  }
  resize()

  return {
    state,
    resize,
    draw(t, mouse, hover, strength) {
      gl.uniform1f(u.uTime, t)
      gl.uniform2f(u.uMouse, mouse[0], mouse[1])
      gl.uniform1f(u.uHover, hover)
      gl.uniform1f(u.uStrength, strength)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    },
    destroy() { gl.getExtension('WEBGL_lose_context')?.loseContext() },
  }
}

/**
 * Drop-in replacement for <Img> with a liquid hover.
 *  - `strength` 0.5 = subtle, 1 = default, 1.5 = dramatic
 *  - hover is triggered by the closest `[data-liquid-trigger]` ancestor (e.g. the whole card), or the image itself
 */
export default function LiquidImage({ image, alt, sizes, className = '', strength = 1, loading }) {
  const wrap = useRef(null)
  const layer = useRef(null)
  const [enabled] = useState(canUseLiquid)

  useEffect(() => {
    if (!enabled) return
    const el = wrap.current
    const trigger = el.closest('[data-liquid-trigger]') ?? el
    const focus = parseFocus(image.position)
    let renderer = null
    let canvas = null
    let failed = false
    let raf = 0
    const fx = { hover: 0 }
    const mouse = [0.5, 0.5]
    const target = [0.5, 0.5]
    const start = performance.now()

    const release = () => {
      renderer?.destroy()
      canvas?.remove()
      renderer = null
      canvas = null
    }
    const poolEntry = { release }

    const ensureRenderer = () => {
      if (renderer || failed) return !!renderer
      const img = el.querySelector('img')
      if (!img) return false
      canvas = document.createElement('canvas')
      canvas.className = 'absolute inset-0 h-full w-full'
      canvas.style.opacity = '0'
      canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); release() })
      layer.current.appendChild(canvas)
      try { renderer = createRenderer(canvas, img, focus) } catch { renderer = null }
      if (!renderer) { failed = true; canvas.remove(); canvas = null; return false }
      return true
    }

    const loop = () => {
      raf = 0
      if (!renderer) return
      mouse[0] += (target[0] - mouse[0]) * 0.12
      mouse[1] += (target[1] - mouse[1]) * 0.12
      const visible = renderer.state.ready && fx.hover > 0.001
      canvas.style.opacity = visible ? '1' : '0'
      if (visible) renderer.draw((performance.now() - start) / 1000, mouse, fx.hover, strength)
      const waiting = !renderer.state.ready && !renderer.state.error
      if (fx.hover > 0.001 || waiting) raf = requestAnimationFrame(loop)
    }
    const kick = () => { if (renderer && !raf) raf = requestAnimationFrame(loop) }

    const setTarget = (e) => {
      const r = el.getBoundingClientRect()
      target[0] = (e.clientX - r.left) / r.width
      target[1] = 1 - (e.clientY - r.top) / r.height
    }
    const onEnter = (e) => {
      if (e.pointerType === 'touch' || !ensureRenderer()) return
      touchPool(poolEntry)
      setTarget(e)
      mouse[0] = target[0]; mouse[1] = target[1]
      gsap.to(fx, { hover: 1, duration: 0.7, ease: 'power2.out', overwrite: true })
      kick()
    }
    const onMove = (e) => { if (e.pointerType !== 'touch') { setTarget(e); kick() } }
    const onLeave = () => { gsap.to(fx, { hover: 0, duration: 0.3, ease: 'power2.in', overwrite: true }); kick() }

    const ro = new ResizeObserver(() => renderer?.resize())
    ro.observe(el)
    trigger.addEventListener('pointerenter', onEnter)
    trigger.addEventListener('pointermove', onMove)
    trigger.addEventListener('pointerleave', onLeave)
    return () => {
      trigger.removeEventListener('pointerenter', onEnter)
      trigger.removeEventListener('pointermove', onMove)
      trigger.removeEventListener('pointerleave', onLeave)
      ro.disconnect()
      cancelAnimationFrame(raf)
      gsap.killTweensOf(fx)
      const i = pool.indexOf(poolEntry)
      if (i !== -1) pool.splice(i, 1)
      release()
    }
  }, [enabled, image.position, strength])

  return (
    <div ref={wrap} className={`relative h-full w-full overflow-hidden ${className}`}>
      <Img image={image} alt={alt} sizes={sizes} {...(loading ? { loading } : {})}
        className={`h-full w-full ${enabled ? '' : 'transition-transform duration-500 ease-out group-hover:scale-105'}`} />
      {/* WebGL canvas is created here on first hover (and recycled when off-screen cards exceed the pool) */}
      {enabled && <div ref={layer} aria-hidden className="pointer-events-none absolute inset-0" />}
    </div>
  )
}
