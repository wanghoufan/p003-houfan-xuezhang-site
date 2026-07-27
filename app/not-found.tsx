import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p>404 · PAGE NOT FOUND</p>
      <h1>这一页还没有写进故事里。</h1>
      <Link href="/">返回首页 →</Link>
    </main>
  );
}
