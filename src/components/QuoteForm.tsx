import { site, services } from '@/config/site';

export function QuoteForm({ defaultService }: { defaultService?: string }) {
  const action = `https://formspree.io/f/${site.formspreeId}`;
  return (
    <form
      action={action}
      method="POST"
      className="card grid gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
      </div>
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field label="Address / area in Calgary" name="address" autoComplete="street-address" />
      <div>
        <label htmlFor="service" className="mb-1 block text-sm font-medium text-slate-700">Service needed</label>
        <select
          id="service"
          name="service"
          defaultValue={defaultService || ''}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
        >
          <option value="" disabled>Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>{s.name}</option>
          ))}
          <option value="Multiple / Other">Multiple / Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">Project details</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your yard, timing, or any specific requests…"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
        />
      </div>
      {/* Honeypot */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input type="hidden" name="_subject" value={`New quote request — ${site.name}`} />
      <button type="submit" className="btn-primary justify-center">Request Free Quote</button>
      <p className="text-xs text-slate-500">By submitting, you agree to be contacted about your request. We respect your privacy.</p>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700">
        {label}{required && <span className="text-red-600"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
      />
    </div>
  );
}
