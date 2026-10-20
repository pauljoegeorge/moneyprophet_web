import React from "react";

export default function Questions() {
  return (
    <section className="mp-questions" id="faq" aria-labelledby="faq-title">
      <div className="mp-section-heading">
        <p className="mp-eyebrow">Good to know</p>
        <h2 id="faq-title">
          Simple from
          <br />
          the start.
        </h2>
        <p>
          Available on the web.
          <br />
          iOS is coming soon.
        </p>
      </div>
      <div className="mp-faq-list">
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
