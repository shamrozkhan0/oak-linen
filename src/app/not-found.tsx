import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-head">
      <div className="container">
        <h1>Page not found</h1>
        <p className="lead">The page you are looking for has moved or does not exist.</p>
        <Link className="btn btn-primary" href="/">Back to home</Link>
      </div>
    </section>
  );
}
