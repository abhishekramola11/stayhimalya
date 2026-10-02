import { useEffect, useMemo, useState } from 'react'
import { STAYS, FILTERS, DESTINATIONS, img, type Stay } from './data'
import HostApply from './HostApply'

export default function App() {
  const [region, setRegion] = useState<'All' | 'Himachal' | 'Uttarakhand'>('All')
  const [filter, setFilter] = useState('All')
  const [saved, setSaved] = useState<number[]>([2])
  const [weeks, setWeeks] = useState(4)
  const [booked, setBooked] = useState<Stay | null>(null)
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const on = () => { setHash(window.location.hash); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  const stays = useMemo(
    () =>
      STAYS.filter(
        (s) => (region === 'All' || s.state === region) && (filter === 'All' || s.tags.includes(filter)),
      ),
    [region, filter],
  )

  const discount = weeks >= 8 ? 0.35 : weeks >= 4 ? 0.25 : weeks >= 2 ? 0.12 : 0
  const nightly = 2000
  const total = Math.round(nightly * 7 * weeks * (1 - discount))

  if (hash === '#become-a-host') return <HostApply />

  return (
    <div className="min-h-screen font-sans">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-baseline gap-2">
            <span className="font-serif text-2xl italic">Stay</span>
            <span className="font-serif text-2xl font-semibold tracking-tight">Himalaya</span>
            <span className="ml-1 h-2 w-2 rounded-full bg-saffron" />
          </a>
          <nav className="hidden items-center gap-8 text-sm text-mist md:flex">
            <a href="#stays" className="transition hover:text-snow">Stays</a>
            <a href="#workation" className="transition hover:text-snow">Workation</a>
            <a href="#destinations" className="transition hover:text-snow">Destinations</a>
            <a href="#become-a-host" className="transition hover:text-snow">Become a host</a>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-xs text-mist sm:inline">♥ {saved.length}</span>
            <button className="rounded-full bg-snow px-5 py-2 text-sm font-semibold text-ink transition hover:bg-saffron">Sign in</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden bg-pine">
        <img src={img('1722067487813-3650fb50f028', 2000, 1300)} alt="Clouds rolling over a Himalayan ridge" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pt-40 pb-20 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs tracking-[0.25em] text-saffron uppercase">Homestays · Himachal & Uttarakhand</p>
            <h1 className="mt-6 font-serif text-6xl leading-[0.95] font-light tracking-tight md:text-8xl">
              Log in from <em className="text-saffron">2,000 metres</em> above your inbox.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-snow/80">
              Hand-verified mountain homes with tested Wi‑Fi, a proper desk and a host who'll bring chai at 4pm. Book a weekend — or move in for a month.
            </p>
          </div>
          <aside className="self-end rounded-2xl border border-white/15 bg-ink/60 p-5 backdrop-blur lg:col-span-4">
            <p className="font-mono text-[11px] tracking-widest text-mist uppercase">Live from Dharamkot</p>
            <div className="mt-3 grid grid-cols-3 gap-3 font-mono text-sm">
              <div><p className="text-2xl text-snow">14°</p><p className="text-xs text-mist">clear</p></div>
              <div><p className="text-2xl text-snow">148</p><p className="text-xs text-mist">Mbps</p></div>
              <div><p className="text-2xl text-snow">23</p><p className="text-xs text-mist">nomads</p></div>
            </div>
          </aside>

          {/* SEARCH */}
          <div className="lg:col-span-12">
            <div className="mb-3 flex gap-2">
              {(['All', 'Himachal', 'Uttarakhand'] as const).map((r) => (
                <button key={r} onClick={() => setRegion(r)} className={`rounded-full px-4 py-1.5 text-sm transition ${region === r ? 'bg-snow text-ink' : 'border border-white/20 text-snow/80 hover:border-white/50'}`}>
                  {r === 'All' ? 'All Himalaya' : r}
                </button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); document.getElementById('stays')?.scrollIntoView() }} className="grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
              {[
                ['Where', 'Manali, Munsiyari, Kasol…', 'text'],
                ['Check in', '', 'date'],
                ['Check out', '', 'date'],
                ['Guests', '1 remote worker', 'text'],
              ].map(([label, ph, type]) => (
                <label key={label} className="bg-ink/85 px-5 py-4 focus-within:bg-moss">
                  <span className="block font-mono text-[10px] tracking-widest text-mist uppercase">{label}</span>
                  <input type={type} placeholder={ph} className="mt-1 w-full bg-transparent text-snow placeholder:text-snow/40 focus:outline-none [color-scheme:dark]" />
                </label>
              ))}
              <button className="bg-saffron px-8 py-4 font-semibold text-ink transition hover:bg-snow">Search stays</button>
            </form>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 md:grid-cols-4">
          {[['1,240+', 'verified homestays'], ['50 Mbps', 'median tested Wi‑Fi'], ['4.9★', 'average guest rating'], ['30%', 'off monthly stays']].map(([n, l]) => (
            <div key={l} className="border-white/10 py-8 not-last:border-r max-md:[&:nth-child(2)]:border-r-0">
              <p className="font-serif text-4xl">{n}</p>
              <p className="mt-1 font-mono text-xs text-mist uppercase">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STAYS */}
      <section id="stays" className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-widest text-saffron uppercase">01 — Handpicked</p>
            <h2 className="mt-3 font-serif text-5xl font-light">Homes with a view <em>and</em> a signal</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-1.5 text-sm transition ${filter === f ? 'bg-saffron text-ink' : 'border border-white/15 text-mist hover:text-snow'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {stays.map((s) => (
            <article key={s.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-moss">
                <img src={img(s.photo, 800, 1000)} alt={`${s.name} in ${s.place}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <button onClick={() => setSaved((v) => (v.includes(s.id) ? v.filter((x) => x !== s.id) : [...v, s.id]))} aria-label="Save to wishlist" className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-ink/60 text-lg backdrop-blur transition hover:scale-110">
                  <span className={saved.includes(s.id) ? 'text-flag' : 'text-snow'}>{saved.includes(s.id) ? '♥' : '♡'}</span>
                </button>
                <div className="absolute bottom-4 left-4 flex gap-2 font-mono text-[11px]">
                  <span className="rounded bg-ink/70 px-2 py-1 backdrop-blur">⌁ {s.wifi} Mbps</span>
                  <span className="rounded bg-ink/70 px-2 py-1 backdrop-blur">▲ {s.alt}</span>
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl">{s.name}</h3>
                  <p className="text-sm text-mist">{s.place}, {s.state} · hosted by {s.host}</p>
                </div>
                <p className="shrink-0 font-mono text-sm">★ {s.rating} <span className="text-mist">({s.reviews})</span></p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.tags.map((t) => <span key={t} className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-mist">{t}</span>)}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <p><span className="font-serif text-2xl">₹{s.price.toLocaleString('en-IN')}</span> <span className="text-sm text-mist">/ night</span></p>
                <button onClick={() => setBooked(s)} className="rounded-full border border-snow/40 px-4 py-1.5 text-sm transition hover:bg-snow hover:text-ink">Reserve</button>
              </div>
            </article>
          ))}
          {stays.length === 0 && <p className="text-mist">No stays match — try another filter.</p>}
        </div>
      </section>

      {/* WORKATION */}
      <section id="workation" className="bg-snow text-ink">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-widest text-flag uppercase">02 — Work from the hills</p>
            <h2 className="mt-3 font-serif text-5xl leading-tight font-light">Your standup, with a <em>Dhauladhar</em> backdrop.</h2>
            <p className="mt-6 text-ink/70">Every "Workation Ready" stay is checked by our team in person before it goes live.</p>
            <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {[
                ['Speed-tested Wi‑Fi', 'Fibre or dual-SIM 4G/5G, minimum 30 Mbps, re-tested monthly.'],
                ['Power backup', 'Inverter or solar so a hill-town power cut never drops your call.'],
                ['Real workspace', 'A desk, an ergonomic chair and a window. No working from the bed.'],
                ['Quiet hours & meals', 'Home-cooked pahadi food on your schedule, 9–6 silence respected.'],
                ['Nomad circles', 'Weekend treks and bonfires with other remote workers nearby.'],
              ].map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[2.5rem_1fr] py-4">
                  <span className="font-mono text-sm text-ink/40">0{i + 1}</span>
                  <div><p className="font-semibold">{t}</p><p className="text-sm text-ink/60">{d}</p></div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl bg-ink/10">
              <img src={img('1599493703472-6a6052eca024', 1200, 900)} alt="Laptop on a wooden table by a mountain window" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="-mt-24 ml-auto w-[92%] rounded-2xl bg-ink p-8 text-snow shadow-2xl">
              <div className="flex items-baseline justify-between">
                <p className="font-serif text-2xl">Long-stay calculator</p>
                <p className="font-mono text-xs text-saffron">−{Math.round(discount * 100)}% applied</p>
              </div>
              <label className="mt-6 block">
                <span className="font-mono text-xs text-mist uppercase">Stay length · {weeks} week{weeks > 1 ? 's' : ''}</span>
                <input type="range" min={1} max={12} value={weeks} onChange={(e) => setWeeks(+e.target.value)} className="mt-3 w-full accent-saffron" />
              </label>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 font-mono text-sm">
                <div><p className="text-mist text-xs">Avg nightly</p><p className="mt-1 text-lg">₹{Math.round(nightly * (1 - discount)).toLocaleString('en-IN')}</p></div>
                <div><p className="text-mist text-xs">Nights</p><p className="mt-1 text-lg">{weeks * 7}</p></div>
                <div><p className="text-mist text-xs">Total</p><p className="mt-1 text-lg text-saffron">₹{total.toLocaleString('en-IN')}</p></div>
              </div>
              <p className="mt-4 text-xs text-mist">Less than a metro-city PG — with meals, mountains and laundry included.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" className="mx-auto max-w-7xl px-6 py-24">
        <p className="font-mono text-xs tracking-widest text-saffron uppercase">03 — Where to go</p>
        <h2 className="mt-3 font-serif text-5xl font-light">Valleys worth the drive</h2>
        <div className="mt-12 grid auto-rows-[220px] gap-4 md:grid-cols-4">
          {DESTINATIONS.map((d, i) => (
            <a key={d.name} href="#stays" className={`group relative overflow-hidden rounded-xl bg-moss ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <img src={img(d.photo, 900, 900)} alt={d.name} className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="font-mono text-[11px] text-saffron">{d.state} · {d.stays} stays</p>
                <p className={`font-serif ${i === 0 ? 'text-4xl' : 'text-2xl'}`}>{d.name}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-white/10 bg-pine">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-3">
          {[
            ['"Shipped a product launch from Munsiyari. My team thought the Panchachuli peaks were a Zoom background."', 'Aditi R.', 'Product Manager, Bengaluru · 6 weeks'],
            ['"Wi‑Fi was faster than my Gurgaon flat, and Tenzin\'s thukpa at 8pm became my daily ritual."', 'Karan M.', 'Software Engineer · 1 month in Old Manali'],
            ['"Booked for a week, stayed for three. The monthly discount made it cheaper than staying home."', 'Sneha & Rohit', 'Designers, Pune · Dharamkot'],
          ].map(([q, n, r]) => (
            <figure key={n}>
              <blockquote className="font-serif text-2xl leading-snug font-light italic">{q}</blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4"><p className="font-semibold">{n}</p><p className="font-mono text-xs text-mist">{r}</p></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* HOST CTA */}
      <section id="host" className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-moss">
          <img src={img('1722067488394-c9fbc88debed', 1000, 1100)} alt="A homestay in a meadow below the mountains" className="aspect-[10/11] w-full object-cover" />
        </div>
        <div>
          <p className="font-mono text-xs tracking-widest text-saffron uppercase">04 — For hosts</p>
          <h2 className="mt-3 font-serif text-5xl leading-tight font-light">Have a spare room in the hills? <em>Earn from it.</em></h2>
          <p className="mt-6 text-snow/70">We help village families list, photograph and price their homes — and bring year-round remote workers, not just peak-season crowds.</p>
          <div className="mt-8 grid grid-cols-3 gap-6 border-y border-white/10 py-6">
            {[['₹38k', 'avg monthly host income'], ['0%', 'fees for first 3 months'], ['24/7', 'Hindi & English support']].map(([n, l]) => (
              <div key={l}><p className="font-serif text-3xl text-saffron">{n}</p><p className="mt-1 text-xs text-mist">{l}</p></div>
            ))}
          </div>
          <a href="#become-a-host" className="mt-8 inline-block rounded-full bg-saffron px-7 py-3 font-semibold text-ink transition hover:bg-snow">List your homestay</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-serif text-3xl"><em>Stay</em> Himalaya</p>
            <p className="mt-3 max-w-sm text-sm text-mist">Homestays across Himachal Pradesh and Uttarakhand, for travellers and remote workers who'd rather wake up to the mountains.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-sm overflow-hidden rounded-full border border-white/15">
              <input type="email" placeholder="Monthly workation deals" className="flex-1 bg-transparent px-5 py-3 text-sm placeholder:text-mist focus:outline-none" />
              <button className="bg-snow px-5 text-sm font-semibold text-ink hover:bg-saffron">Join</button>
            </form>
          </div>
          {[['Explore', ['Himachal stays', 'Uttarakhand stays', 'Workation', 'Monthly stays']], ['Company', ['About', 'Become a host', 'Safety', 'Contact']]].map(([h, ls]) => (
            <div key={h as string}>
              <p className="font-mono text-xs text-mist uppercase">{h}</p>
              <ul className="mt-4 space-y-2 text-sm">{(ls as string[]).map((l) => <li key={l}><a href={l === 'Become a host' ? '#become-a-host' : '#'} className="hover:text-saffron">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <p className="border-t border-white/10 py-6 text-center font-mono text-xs text-mist">© 2026 stayhimalaya · Made in the mountains</p>
      </footer>

      {/* BOOKING MODAL */}
      {booked && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-6 backdrop-blur" onClick={() => setBooked(null)}>
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-pine" onClick={(e) => e.stopPropagation()}>
            <img src={img(booked.photo, 800, 400)} alt={booked.name} className="h-44 w-full object-cover" />
            <div className="p-6">
              <p className="font-mono text-xs text-saffron">{booked.place} · ⌁ {booked.wifi} Mbps</p>
              <h3 className="mt-1 font-serif text-3xl">{booked.name}</h3>
              <p className="mt-3 text-sm text-mist">Request sent to {booked.host}. You'll hear back within 2 hours — most hosts confirm the same day.</p>
              <button onClick={() => setBooked(null)} className="mt-6 w-full rounded-full bg-saffron py-3 font-semibold text-ink hover:bg-snow">Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
