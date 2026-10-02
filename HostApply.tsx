import { useState } from 'react'

type Field = {
  key: string
  label: string
  type: 'text' | 'number' | 'tel' | 'email' | 'textarea' | 'select' | 'chips' | 'yesno'
  options?: string[]
  hint?: string
  required?: boolean
}

// Each step of the host questionnaire. Add, remove or reword questions here.
const STEPS: { title: string; intro: string; fields: Field[] }[] = [
  {
    title: 'About you',
    intro: 'Tell us who will be welcoming guests.',
    fields: [
      { key: 'name', label: 'Full name (as on Aadhaar)', type: 'text', required: true },
      { key: 'phone', label: 'Mobile / WhatsApp number', type: 'tel', required: true },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'ownership', label: 'Your relation to the property', type: 'select', options: ['I own it', 'Family property', 'I lease and operate it', 'Manager on behalf of owner'], required: true },
      { key: 'languages', label: 'Languages you speak', type: 'chips', options: ['Hindi', 'English', 'Pahadi / Garhwali / Kumaoni', 'Punjabi', 'Other'] },
    ],
  },
  {
    title: 'The property',
    intro: 'Where is it, and what kind of home is it?',
    fields: [
      { key: 'propName', label: 'Name of homestay', type: 'text', required: true },
      { key: 'state', label: 'State', type: 'select', options: ['Himachal Pradesh', 'Uttarakhand'], required: true },
      { key: 'village', label: 'Village / town and district', type: 'text', required: true, hint: 'e.g. Jogini Road, Vashisht, Kullu' },
      { key: 'maps', label: 'Google Maps link', type: 'text' },
      { key: 'kind', label: 'Type of property', type: 'select', options: ['Traditional kath-kuni / slate house', 'Modern cottage', 'Farmhouse / orchard', 'Rooms in family home', 'Entire villa'] },
      { key: 'rooms', label: 'Number of guest rooms', type: 'number', required: true },
      { key: 'road', label: 'Is it reachable by car till the door?', type: 'yesno', hint: 'If no, mention walking distance in notes' },
    ],
  },
  {
    title: 'Work-from-home readiness',
    intro: 'Remote workers are our biggest guests. Be honest — we test everything on visit.',
    fields: [
      { key: 'wifi', label: 'Internet type', type: 'select', options: ['Fibre broadband', 'Airfiber / 5G router', '4G hotspot only', 'No internet'], required: true },
      { key: 'speed', label: 'Speed test result (Mbps)', type: 'number', hint: 'Open fast.com on your phone on the Wi‑Fi and type the number' },
      { key: 'backup', label: 'Power backup', type: 'select', options: ['Inverter', 'Solar + battery', 'Generator', 'None'] },
      { key: 'desk', label: 'Is there a desk and chair in the room?', type: 'yesno' },
      { key: 'network', label: 'Mobile networks that work', type: 'chips', options: ['Jio', 'Airtel', 'Vi', 'BSNL'] },
      { key: 'longstay', label: 'Open to monthly stays with discount?', type: 'yesno' },
    ],
  },
  {
    title: 'Amenities & rules',
    intro: 'What will guests get?',
    fields: [
      { key: 'amenities', label: 'Amenities', type: 'chips', options: ['Geyser / hot water', 'Room heater', 'Home-cooked meals', 'Parking', 'Mountain view', 'Snow view', 'Garden / orchard', 'Bonfire', 'Laundry', 'Pet friendly', 'Kitchen access'] },
      { key: 'price', label: 'Expected price per night (₹)', type: 'number', required: true },
      { key: 'rules', label: 'House rules', type: 'chips', options: ['No smoking indoors', 'No alcohol', 'Couples welcome', 'Families only', 'Quiet after 10pm'] },
    ],
  },
  {
    title: 'Safety & documents',
    intro: 'This keeps guests and you protected. Documents are collected on our verification visit.',
    fields: [
      { key: 'registered', label: 'Registered under state homestay scheme?', type: 'select', options: ['Yes — HP Homestay Scheme', 'Yes — Uttarakhand Deen Dayal Homestay', 'Applied / in process', 'Not yet'], required: true },
      { key: 'firstaid', label: 'First-aid kit & fire extinguisher available?', type: 'yesno' },
      { key: 'hospital', label: 'Nearest hospital / PHC and distance', type: 'text' },
      { key: 'notes', label: 'Anything else guests should know?', type: 'textarea', hint: 'Road conditions in winter, landslide-prone stretch, best months…' },
    ],
  },
]

type Answers = Record<string, string | string[]>

export default function HostApply() {
  const [step, setStep] = useState(0)
  const [a, setA] = useState<Answers>({})
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const s = STEPS[step]
  const set = (k: string, v: string | string[]) => setA((p) => ({ ...p, [k]: v }))

  const next = () => {
    const missing = s.fields.find((f) => f.required && !a[f.key])
    if (missing) return setError(`Please answer: ${missing.label}`)
    setError('')
    if (step < STEPS.length - 1) return setStep(step + 1)
    const all = JSON.parse(localStorage.getItem('hostApplications') || '[]')
    localStorage.setItem('hostApplications', JSON.stringify([...all, { ...a, submittedAt: new Date().toISOString() }]))
    setDone(true)
  }

  const input = 'mt-2 w-full rounded-lg border border-white/15 bg-ink px-4 py-3 text-snow placeholder:text-mist/60 focus:border-saffron focus:outline-none [color-scheme:dark]'

  return (
    <div className="min-h-screen font-sans">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="font-serif text-2xl"><em>Stay</em> <span className="font-semibold">Himalaya</span></a>
          <a href="#" className="text-sm text-mist hover:text-snow">← Back to stays</a>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <p className="font-mono text-xs tracking-widest text-saffron uppercase">Host application</p>
          <h1 className="mt-3 font-serif text-5xl leading-tight font-light">List your <em>pahadi</em> home.</h1>
          <p className="mt-4 text-snow/70">Takes about 8 minutes. Our team reviews every application, calls you within 48 hours and visits before your listing goes live.</p>
          <ol className="mt-10 space-y-1 border-l border-white/10">
            {STEPS.map((st, i) => (
              <li key={st.title}>
                <button onClick={() => !done && i < step && setStep(i)} className={`-ml-px block border-l-2 py-2 pl-4 text-left text-sm transition ${i === step && !done ? 'border-saffron text-snow' : i < step || done ? 'border-snow/40 text-snow/70' : 'border-transparent text-mist'}`}>
                  <span className="font-mono text-xs">0{i + 1}</span> {st.title} {(i < step || done) && '✓'}
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-10 rounded-xl border border-white/10 bg-pine p-5 text-sm text-mist">
            <p className="font-semibold text-snow">What happens next?</p>
            <p className="mt-2">1. Review call · 2. Verification visit & Wi‑Fi test · 3. Free photoshoot · 4. Go live</p>
          </div>
        </aside>

        <main className="rounded-2xl border border-white/10 bg-pine p-8 lg:col-span-8 md:p-10">
          {done ? (
            <div className="py-10 text-center">
              <p className="text-5xl">🏔️</p>
              <h2 className="mt-6 font-serif text-4xl">Dhanyavaad, {String(a.name || '').split(' ')[0]}!</h2>
              <p className="mx-auto mt-4 max-w-md text-snow/70">Your application for <strong>{String(a.propName)}</strong> is received. We'll call you on {String(a.phone)} within 48 hours.</p>
              <a href="#" className="mt-8 inline-block rounded-full bg-saffron px-7 py-3 font-semibold text-ink hover:bg-snow">Back to home</a>
            </div>
          ) : (
            <>
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full bg-saffron transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
              </div>
              <p className="mt-6 font-mono text-xs text-mist">Step {step + 1} of {STEPS.length}</p>
              <h2 className="mt-1 font-serif text-3xl">{s.title}</h2>
              <p className="mt-1 text-sm text-mist">{s.intro}</p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {s.fields.map((f) => {
                  const wide = f.type === 'chips' || f.type === 'textarea'
                  const v = a[f.key]
                  return (
                    <label key={f.key} className={wide ? 'md:col-span-2' : ''}>
                      <span className="text-sm font-medium">{f.label}{f.required && <span className="text-saffron"> *</span>}</span>
                      {f.type === 'select' ? (
                        <select value={(v as string) || ''} onChange={(e) => set(f.key, e.target.value)} className={input}>
                          <option value="">Choose…</option>
                          {f.options!.map((o) => <option key={o}>{o}</option>)}
                        </select>
                      ) : f.type === 'textarea' ? (
                        <textarea rows={4} value={(v as string) || ''} onChange={(e) => set(f.key, e.target.value)} className={input} />
                      ) : f.type === 'chips' ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {f.options!.map((o) => {
                            const arr = (v as string[]) || []
                            const on = arr.includes(o)
                            return (
                              <button type="button" key={o} onClick={() => set(f.key, on ? arr.filter((x) => x !== o) : [...arr, o])} className={`rounded-full px-3.5 py-1.5 text-sm transition ${on ? 'bg-saffron text-ink' : 'border border-white/15 text-mist hover:text-snow'}`}>
                                {on && '✓ '}{o}
                              </button>
                            )
                          })}
                        </div>
                      ) : f.type === 'yesno' ? (
                        <div className="mt-2 flex gap-2">
                          {['Yes', 'No'].map((o) => (
                            <button type="button" key={o} onClick={() => set(f.key, o)} className={`flex-1 rounded-lg py-3 text-sm transition ${v === o ? 'bg-snow text-ink' : 'border border-white/15 text-mist hover:text-snow'}`}>{o}</button>
                          ))}
                        </div>
                      ) : (
                        <input type={f.type} value={(v as string) || ''} onChange={(e) => set(f.key, e.target.value)} className={input} />
                      )}
                      {f.hint && <span className="mt-1.5 block text-xs text-mist">{f.hint}</span>}
                    </label>
                  )
                })}
              </div>

              {error && <p className="mt-6 text-sm text-flag">{error}</p>}
              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="text-sm text-mist hover:text-snow disabled:opacity-30">← Back</button>
                <button onClick={next} className="rounded-full bg-saffron px-7 py-3 font-semibold text-ink transition hover:bg-snow">
                  {step === STEPS.length - 1 ? 'Submit application' : 'Continue →'}
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
