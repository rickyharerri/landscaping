import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-tight text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 h1">We couldn’t find that page</h1>
        <p className="mt-4 lead max-w-xl mx-auto">
          The page you’re looking for may have moved. Try our services or get in touch for a free quote.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">Back to home</Link>
          <Link href="/services/" className="btn-secondary">See services</Link>
        </div>
      </div>
    </section>
  );
}
