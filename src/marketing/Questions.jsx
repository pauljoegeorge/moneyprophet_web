import React from "react";

export default function Questions() {
  return (
    <section className="mp-questions" id="faq" aria-labelledby="faq-title">
      <div className="mp-section-heading">
        <p className="mp-eyebrow">Good to know</p>
        <h2 id="faq-title">
          Expense tracking
          <br />
          questions.
        </h2>
        <p>
          Available on the web.
          <br />
          iOS is coming soon.
        </p>
      </div>
      <div className="mp-faq-list">
        <details>
          <summary>What is Money Prophet?</summary>
          <p>
            Money Prophet is a web app for tracking personal expenses and
            monthly budgets. Record purchases, organize spending by category,
            plan regular bills, and review spending reports. It suits people who
            want to enter their own expenses without connecting a bank account.
          </p>
        </details>
        <details>
          <summary>How do I track expenses against a monthly budget?</summary>
          <p>
            Sign in with Google, choose your currency, and set monthly category
            budgets. Add purchases with an amount and category, then review your
            spending and remaining category budgets. Plan recurring bills
            alongside everyday spending to see more of your monthly commitments.
          </p>
        </details>
        <details id="free-plan">
          <summary>What’s included for free?</summary>
          <p>
            Expense tracking, monthly budgets, and spending reports. The Free
            plan includes 5 budget categories, 5 recurring-bill categories, and
            5 expenses per day (up to 2 with AI). You can also generate one AI
            forecast and one spending suggestion per month.
          </p>
          <p>
            Daily allowances reset at midnight in Tokyo. The app shows your
            remaining allowance and next steps.
          </p>
        </details>
        <details>
          <summary>Do I need to connect my bank?</summary>
          <p>
            No. Choose your currency, set your budgets, and record your
            purchases. You decide what goes into your workspace.
          </p>
        </details>
        <details>
          <summary>Is AI optional?</summary>
          <p>
            Yes. Manual entry, budgets, and ordinary reports work without it. AI
            features share relevant data with Google Gemini only after your
            permission. You can withdraw permission in Settings.
          </p>
          <p>
            <a href="/privacy.html">Read the privacy policy ↗</a>
          </p>
        </details>
      </div>
    </section>
  );
}
