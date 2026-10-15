import React from "react";
import {
  Sprout,
  ArrowUpRight,
  Wallet,
  MessageSquare,
  ChartPie,
  Check,
  Coffee,
  ShoppingBasket,
  House,
} from "lucide-react";
import "./marketing.css";
import Contact from "./Contact";

export function Brand() {
  return (
    <a className="mp-brand-link" href="/" aria-label="Money Prophet home">
      <span className="mp-brand-symbol">
        <Sprout size={23} />
      </span>
      Money Prophet
    </a>
  );
}
export function Preview() {
  return (
    <div
      className="mp-preview-panel"
      aria-label="Illustrative dashboard with sample data"
    >
      <div className="mp-preview-top">
        <Brand />
        <span className="mp-sample">Sample workspace</span>
      </div>
      <div className="mp-preview-heading">
        <span>Your month, at a glance</span>
        <span>October</span>
      </div>
      <div className="mp-preview-balance">
        <span>Category budget left</span>
        <strong>
          ¥42,800<span> / ¥80,000</span>
        </strong>
        <p>A little more room for what matters.</p>
      </div>
      <div className="mp-preview-metrics">
        <div>
          <span>Spent today</span>
          <strong>¥1,240</strong>
        </div>
        <div>
          <span>Spent this week</span>
          <strong>¥9,600</strong>
        </div>
      </div>
      <div className="mp-preview-categories">
        <h3>Category budgets</h3>
        {[
          [ShoppingBasket, "Groceries", "¥18,200 / ¥30,000", 61],
          [Coffee, "Eating out", "¥12,000 / ¥15,000", 80],
          [House, "Home & everyday", "¥7,000 / ¥35,000", 20],
        ].map(([Icon, name, amount, width]) => (
          <div className="mp-preview-category" key={name}>
            <div>
              <span>
                <Icon size={15} />
                {name}
              </span>
              <span>{amount}</span>
            </div>
            <div className="mp-preview-track">
              <i
                style={{
                  width: `${width}%`,
                  background: width >= 80 ? "#b97b3c" : undefined,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mp-preview-message">
        <MessageSquare size={17} />
        <span>“Coffee 480”</span>
        <Check size={16} />
      </div>
    </div>
  );
}
export default function Landing() {
  return (
    <div className="mp-public mp-landing">
      <a className="mp-skip" href="#main">
        Skip to content
      </a>
      <header className="mp-site-header">
        <Brand />
        <nav aria-label="Main navigation">
          <a className="mp-nav-feature" href="#features">
            The essentials
          </a>
          <a className="mp-nav-feature" href="#contact">
            Contact
          </a>
          <a href="/sign_in">
            Sign in <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="mp-hero-section">
          <div className="mp-hero-copy">
            <p className="mp-eyebrow">
              <span /> A little clarity, every day
            </p>
            <h1>
              Your money.
              <br />A little more
              <br />
              <em>understood.</em>
            </h1>
            <p className="mp-lead">
              Track everyday spending. Make a plan for the month. Know what’s
              left for you.
            </p>
            <div className="mp-hero-actions">
              <a className="mp-cta" href="/sign_in">
                Start for free <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="mp-text-link" href="#features">
                Take a look <span aria-hidden="true">↘</span>
              </a>
            </div>
            <p className="mp-fine">
              No bank connection needed · Sign in with Google
            </p>
          </div>
          <div className="mp-hero-visual">
            <div className="mp-visual-caption">
              <span>THE BIG PICTURE</span>
              <span>Made simple.</span>
            </div>
            <Preview />
            <p className="mp-visual-footnote">
              Less mental math. More room to breathe.
            </p>
          </div>
        </section>
        <section
          className="mp-essentials"
          id="features"
          aria-labelledby="features-title"
        >
          <div className="mp-section-heading">
            <p className="mp-eyebrow">Just what you need</p>
            <h2 id="features-title">
              Small habits.
              <br />
              <em>A clearer month.</em>
            </h2>
          </div>
          <div className="mp-essential-grid">
            {[
              [
                Wallet,
                "01",
                "Keep track",
                "Add a purchase by category or in a few words with optional AI entry.",
              ],
              [
                ChartPie,
                "02",
                "Make room",
                "Set monthly category budgets and plan for your regular bills.",
              ],
              [
                MessageSquare,
                "03",
                "See the picture",
                "Review your spending and what’s left in your category budgets.",
              ],
            ].map(([Icon, number, title, body]) => (
              <article className="mp-essential" key={number}>
                <div className="mp-essential-top">
                  <Icon size={22} aria-hidden="true" />
                  <span>{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
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
                Expense tracking, monthly budgets, and spending reports. The
                Free plan includes 5 budget categories, 5 recurring-bill
                categories, and 5 expenses per day (up to 2 with AI). You can
                also generate one AI forecast and one spending suggestion per
                month.
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
                Yes. Manual entry, budgets, and ordinary reports work without
                it. AI features share relevant data with Google Gemini only
                after your permission. You can withdraw permission in Settings.
              </p>
              <p>
                <a href="/privacy.html">Read the privacy policy ↗</a>
              </p>
            </details>
          </div>
        </section>
        <Contact />
      </main>
      <footer className="mp-site-footer">
        <Brand />
        <span>A little clarity goes a long way.</span>
        <a href="/privacy.html">Privacy</a>
        <a href="/terms.html">Terms</a>
        <a href="/#contact">Contact</a>
      </footer>
    </div>
  );
}
