export type FAQItem = { q: string; a: string };

export function FAQ({ items, title = 'Frequently asked questions' }: { items: FAQItem[]; title?: string }) {
  return (
    <section className="section">
      <div className="container-tight">
        <h2 className="h2">{title}</h2>
        <div className="mt-8 divide-y divide-slate-200 rounded-2xl bg-white ring-1 ring-slate-200">
          {items.map((it, i) => (
            <details key={i} className="group p-5 open:bg-brand-50/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-base font-semibold text-slate-900">{it.q}</span>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-slate-600">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
