import Navbar from './Navbar'

/**
 * Fixed header (outside the ScrollSmoother wrapper so it never moves).
 * One white bar only: the old dark top bar was removed to keep the page calm.
 */
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Navbar />
    </header>
  )
}
