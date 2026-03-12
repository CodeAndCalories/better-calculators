import Link from "next/link";

export default function GuidesPage() {
  return (
    <div className="container">
      <h1>Calculator Guides</h1>
      <p>Learn how to calculate common financial, health, and everyday metrics.</p>

      <ul>
        <li>
          <Link href="/guides/how-to-calculate-bmi">
            How to Calculate BMI
          </Link>
        </li>
        <li>
          <Link href="/guides/how-to-calculate-compound-interest">
            How to Calculate Compound Interest
          </Link>
        </li>
      </ul>
    </div>
  );
}