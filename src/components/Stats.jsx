import { Users, CalendarCheck, Award, Stethoscope } from 'lucide-react'
import { stats } from '../data'

const icons = [Users, CalendarCheck, Award, Stethoscope]

export default function Stats() {
  if (!stats.length) return null // no invented numbers: add real ones in data.js
  return (
    <section aria-label="Clinic in numbers" className="container-x">
      <ul data-stagger className="grid grid-cols-2 gap-x-6 gap-y-10 rounded-2xl bg-peach px-6 py-10 sm:py-12 lg:grid-cols-4">
        {stats.map(({ value, label }, i) => {
          const Icon = icons[i]
          return (
            <li key={label} className="text-center">
              <Icon className="mx-auto h-9 w-9 sm:h-10 sm:w-10 text-gold-ink" strokeWidth={1.5} aria-hidden />
              <p className="mt-4 text-h2 font-black text-navy tabular-nums">
                <span data-count={value}>{value.toLocaleString('en-US')}</span>
                <span className="text-gold-ink">+</span>
              </p>
              <p className="mt-1 text-muted">{label}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
