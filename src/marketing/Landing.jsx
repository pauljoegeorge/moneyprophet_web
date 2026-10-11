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
  Pencil,
  ShieldCheck,
  Monitor,
  Smartphone,
  Download,
} from "lucide-react";
import "./marketing.css";

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
    <div className="mp-public">
      <a className="mp-skip" href="#main">
        Skip to content
      </a>
      <header className="mp-site-header">
        <Brand />
        <nav aria-label="Main navigation">
          <a className="mp-nav-feature" href="#features">
            Features
          </a>
          <a className="mp-nav-feature" href="#how-it-works">
            How it works
          </a>
          <a className="mp-nav-feature" href="#free-plan">
            Free plan
          </a>
          <a className="mp-nav-feature" href="#faq">
            FAQ
          </a>
          <a href="/sign_in">Sign in</a>
          <a className="mp-cta small" href="/sign_in">
            Get started <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="mp-hero-section">
          <div className="mp-hero-copy">
            <p className="mp-eyebrow">
              <span /> A quieter way to manage money
            </p>
            <h1>
              Less guessing.
              <br />
              More <em>living.</em>
            </h1>
            <p className="mp-lead">
              Know where your money goes, what’s left to spend, and how your
              month is taking shape. Your personal finances, in one calm
              workspace.
            </p>
            <div className="mp-hero-actions">
              <a className="mp-cta" href="/sign_in">
                Start your free workspace <ArrowUpRight size={18} />
              </a>
              <a className="mp-text-link" href="#features">
                Take a closer look <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="mp-fine">Free to get started · Sign in with Google</p>
          </div>
          <div className="mp-hero-visual">
            <div className="mp-visual-caption">
              A clear view. A calmer month.
            </div>
            <Preview />
          </div>
        </section>
        <section className="mp-value-strip" aria-label="At a glance">
          <span>
            <Check size={17} /> Everyday spending, clearly tracked
          </span>
          <span>
            <Check size={17} /> Monthly budgets and fixed bills
          </span>
          <span>
            <Check size={17} /> Your preferred currency
          </span>
        </section>
        <section className="mp-features-section" id="features">
          <div className="mp-section-heading">
            <p className="mp-eyebrow">Built for everyday life</p>
            <h2>
              The details you need.
              <br />
              The clarity you want.
            </h2>
            <p>
              Make room for your plans with a better picture of your daily
              spending.
            </p>
          </div>
          <div className="mp-feature-grid">
            {[
              [
                Wallet,
                "01",
                "See where you stand",
                "Today, this week, this month. See your spending and remaining category budget without piecing together the numbers.",
              ],
              [
                ChartPie,
                "02",
                "Give your money a plan",
                "Set budgets for everyday categories and plan fixed bills separately. See when a category is getting close to its limit.",
              ],
              [
                MessageSquare,
                "03",
                "Make tracking feel lighter",
                "Choose a category or describe an expense in plain text. Record it in the way that fits your day.",
              ],
            ].map(([Icon, num, title, body]) => (
              <article className="mp-feature" key={num}>
                <div className="mp-feature-top">
                  <Icon size={24} />
                  <span>{num}</span>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          className="mp-info-section"
          id="how-it-works"
          aria-labelledby="how-title"
        >
          <div className="mp-section-heading">
            <p className="mp-eyebrow">Start with your own numbers</p>
            <h2 id="how-title">A workspace that fits your month.</h2>
          </div>
          <div className="mp-info-grid three">
            {[
              [
                "01",
                "Choose your currency",
                "Sign in with Google and choose the currency you use. No bank connection is required.",
              ],
              [
                "02",
                "Make a spending plan",
                "Review the starter categories and edit their budgets. Add recurring bills if you want, or skip them for now.",
              ],
              [
                "03",
                "Record, then review",
                "Add your first real expense. Overview brings your spending and remaining category budget together. No sample transactions are added to your account.",
              ],
            ].map(([number, title, body]) => (
              <article className="mp-info-card" key={number}>
                <span className="mp-step-number">{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          className="mp-info-section"
          id="workspace-preview"
          aria-labelledby="screens-title"
        >
          <div className="mp-section-heading">
            <p className="mp-eyebrow">Inside the workspace</p>
            <h2 id="screens-title">See what you’ll be using.</h2>
            <p>
              Actual web app screens with fictional sample data. Your workspace
              starts with your own choices and no expense transactions.
            </p>
          </div>
          <div className="mp-screenshot-grid">
            {[
              [
                "overview",
                "Your month at a glance",
                "Review spending, category budgets, and recent expenses.",
              ],
              [
                "expense-entry",
                "A place for everyday purchases",
                "Choose a category, amount, date, and an optional note.",
              ],
              [
                "spending-plan",
                "Budgets you can make your own",
                "Set category limits and plan recurring bills separately.",
              ],
            ].map(([file, title, body]) => (
              <figure
                className={`mp-app-shot ${file === "overview" ? "wide" : ""}`}
                key={file}
              >
                <img
                  src={`/images/landing-${file}.jpg`}
                  width="1200"
                  height="900"
                  loading="lazy"
                  decoding="async"
                  alt={`${title}: Money Prophet web app with fictional sample data`}
                />
                <figcaption>
                  <span className="mp-sample">Sample data</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="mp-info-section" aria-labelledby="numbers-title">
          <div className="mp-section-heading">
            <p className="mp-eyebrow">Understand the numbers</p>
            <h2 id="numbers-title">
              A budget is a plan. An expense is a purchase.
            </h2>
          </div>
          <div className="mp-info-grid two">
            <dl className="mp-info-card mp-definitions">
              <dt>Category budgets</dt>
              <dd>
                Monthly limits for everyday spending, such as groceries or
                dining out.
              </dd>
              <dt>Recurring bills</dt>
              <dd>
                Monthly commitments, such as rent, internet, or your phone bill.
                Their amounts are included in monthly spending.
              </dd>
              <dt>Remaining category budget</dt>
              <dd>
                Your category budgets minus spending in those categories.
                Recurring bills are kept separate from this figure.
              </dd>
              <dt>Total monthly spending</dt>
              <dd>
                Your recorded expenses plus the recurring bills for that month.
              </dd>
            </dl>
            <article className="mp-info-card mp-number-example">
              <span className="mp-sample">Illustrative example · JPY</span>
              <h3>One month, clearly explained</h3>
              <dl>
                <div>
                  <dt>Category budgets</dt>
                  <dd>¥80,000</dd>
                </div>
                <div>
                  <dt>Category spending</dt>
                  <dd>¥37,200</dd>
                </div>
                <div className="mp-example-result">
                  <dt>Category budget left</dt>
                  <dd>¥42,800</dd>
                </div>
                <div>
                  <dt>Recurring bills</dt>
                  <dd>¥12,000</dd>
                </div>
                <div className="mp-example-result">
                  <dt>Total monthly spending</dt>
                  <dd>¥49,200</dd>
                </div>
              </dl>
              <p>
                Budgets don’t create transactions. Bills you choose to add are
                included even before you record an everyday purchase.
              </p>
            </article>
          </div>
        </section>
        <section className="mp-info-section" aria-labelledby="entry-title">
          <div className="mp-section-heading">
            <p className="mp-eyebrow">Two ways to keep the habit</p>
            <h2 id="entry-title">Add an expense in the way that suits you.</h2>
          </div>
          <div className="mp-info-grid two">
            <article className="mp-info-card">
              <Pencil size={24} aria-hidden="true" />
              <h3>Fill in the details</h3>
              <p>
                Choose a category and enter the amount and date. Add a note if
                it helps you remember. Manual entry works without AI consent.
              </p>
            </article>
            <article className="mp-info-card">
              <MessageSquare size={24} aria-hidden="true" />
              <h3>Write it in plain text</h3>
              <p>
                Optional AI quick entry turns a short description and one amount
                into an expense.
              </p>
              <p className="mp-entry-example">
                Coffee 480 <span>Example in a JPY workspace</span>
              </p>
              <p>
                Enter one expense at a time. AI entry requires permission to
                share your text and category names with Google Gemini.
              </p>
            </article>
          </div>
        </section>
        <section
          className="mp-info-section mp-plan-section"
          id="free-plan"
          aria-labelledby="plan-title"
        >
          <div className="mp-section-heading">
            <p className="mp-eyebrow">Know what’s included</p>
            <h2 id="plan-title">A free workspace, with clear limits.</h2>
            <p>
              Start with everyday tracking, monthly planning, and ordinary
              spending reports.
            </p>
          </div>
          <ul className="mp-limit-grid">
            <li>
              <strong>5</strong>
              <span>Budget categories</span>
              <p>The three starter categories count toward this limit.</p>
            </li>
            <li>
              <strong>5</strong>
              <span>Recurring-bill categories</span>
              <p>A separate allowance for your monthly commitments.</p>
            </li>
            <li>
              <strong>5</strong>
              <span>Expenses per day</span>
              <p>
                Up to two can be created through AI text entry, within the total
                of five.
              </p>
            </li>
            <li>
              <strong>1 each</strong>
              <span>AI forecast and spending suggestion per month</span>
              <p>
                Generate one forecast and one spending-reduction suggestion each
                calendar month.
              </p>
            </li>
          </ul>
          <p className="mp-plan-note">
            Daily limits reset at midnight in Tokyo (Japan Standard Time).
            Editing or deleting an expense doesn’t restore daily creation
            allowance. The app shows the server’s limit notice and available
            next steps.
          </p>
          <a className="mp-cta" href="/sign_in">
            Start for free <ArrowUpRight size={17} />
          </a>
        </section>
        <section className="mp-info-section" aria-labelledby="controls-title">
          <div className="mp-section-heading">
            <p className="mp-eyebrow">Room for real life</p>
            <h2 id="controls-title">Keep your records useful.</h2>
          </div>
          <div className="mp-info-grid three">
            <article className="mp-info-card">
              <Pencil size={24} aria-hidden="true" />
              <h3>Correct the details</h3>
              <p>
                Edit recorded amounts, dates, categories, and notes—including an
                amount of zero. Expense dates must be in your signup month or
                later.
              </p>
            </article>
            <article className="mp-info-card">
              <Wallet size={24} aria-hidden="true" />
              <h3>Find your spending</h3>
              <p>
                Browse previous months, search your web expense history, and
                sort by date, amount, category, or notes. Hide amounts when you
                want more privacy on screen.
              </p>
            </article>
            <article className="mp-info-card">
              <Download size={24} aria-hidden="true" />
              <h3>Export a month</h3>
              <p>
                Download monthly expense history as CSV for your own spreadsheet
                or records. The upcoming iOS app also includes expense deletion
                with confirmation.
              </p>
            </article>
          </div>
        </section>
        <section className="mp-info-section" aria-labelledby="privacy-title">
          <div className="mp-info-card mp-privacy-panel">
            <ShieldCheck size={28} aria-hidden="true" />
            <div>
              <p className="mp-eyebrow">Your choices matter</p>
              <h2 id="privacy-title">
                AI is optional. Your records still work without it.
              </h2>
              <p>
                Manual entry, budgets, and ordinary spending reports work
                without AI data sharing. Quick entry sends your text and
                category names to Google Gemini; AI reports can also send
                expense history and budgets. You’re asked for permission before
                using these features, and you can withdraw it in Settings.
              </p>
              <p>
                Account deletion is available in Settings. Data already sent to
                providers, and backup or operational records, follow their
                retention practices and applicable requirements.
              </p>
              <div className="mp-info-links">
                <a href="/privacy.html">
                  Read the privacy policy <ArrowUpRight size={15} />
                </a>
                <a href="/terms.html">
                  Terms of Use <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section
          className="mp-info-section"
          id="faq"
          aria-labelledby="faq-title"
        >
          <div className="mp-section-heading">
            <p className="mp-eyebrow">Before you get started</p>
            <h2 id="faq-title">A few practical answers.</h2>
          </div>
          <div className="mp-faq-list">
            {[
              [
                "Do I need to connect a bank?",
                "No. You can record expenses manually or use optional AI text entry. A bank connection is not required to set up your workspace.",
              ],
              [
                "Can I use Money Prophet without AI?",
                "Yes. Manual entry, budget planning, and ordinary spending reports work without AI consent. AI quick entry and AI-generated reports are optional.",
              ],
              [
                "Which currencies can I choose during setup?",
                "JPY, USD, EUR, GBP, AUD, CAD, SGD, INR, KRW, and CNY. Amounts use your account currency; this is an expense tracker, not a currency-conversion service.",
              ],
              [
                "Does signup add sample expenses?",
                "No. Setup offers starter budget categories for you to review, and recurring bills are optional. No sample expense transactions are added.",
              ],
              [
                "Can I correct an expense or use a past date?",
                "Yes. You can edit recorded details and use dates in your signup month or later. Dates in months before signup are not accepted.",
              ],
              [
                "Are recurring bills separate from my expenses?",
                "They are entered separately, but their amounts are included in monthly spending. Remaining category budget uses category budgets and category spending only.",
              ],
              [
                "What happens when I reach a Free limit?",
                "The app shows the limit notice and valid next steps. Daily allowances reset at midnight in Tokyo. Category limits do not reset each month.",
              ],
              [
                "Can I delete my account?",
                "Yes. Use account deletion in Settings. Read the privacy policy for what is removed and how provider, backup, and operational retention is handled.",
              ],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="mp-info-section" aria-labelledby="platforms-title">
          <div className="mp-section-heading">
            <p className="mp-eyebrow">Where you can use it</p>
            <h2 id="platforms-title">Web today. iOS coming soon.</h2>
          </div>
          <div className="mp-info-grid two">
            <article className="mp-info-card mp-platform-card">
              <Monitor size={28} aria-hidden="true" />
              <h3>In your browser</h3>
              <p>
                Open your workspace on desktop or mobile. Sign in with Google to
                get started.
              </p>
              <a className="mp-cta small" href="/sign_in">
                Open the web app <ArrowUpRight size={16} />
              </a>
            </article>
            <article className="mp-info-card mp-platform-card">
              <Smartphone size={28} aria-hidden="true" />
              <h3>On your iPhone</h3>
              <span className="mp-coming-soon">Coming soon</span>
              <p>
                The iOS app is being prepared for release. An App Store link
                will appear here when it’s available.
              </p>
            </article>
          </div>
        </section>
        <section className="mp-closing">
          <Sprout size={32} />
          <p className="mp-eyebrow">A small habit. A clearer picture.</p>
          <h2>
            Your next month starts
            <br />
            with a little clarity.
          </h2>
          <a className="mp-cta" href="/sign_in">
            Get started for free <ArrowUpRight size={18} />
          </a>
        </section>
      </main>
      <footer className="mp-site-footer">
        <Brand />
        <span>Personal finance, thoughtfully.</span>
        <a href="/privacy.html">Privacy policy</a>
        <a href="/terms.html">Terms</a>
        <a href="https://www.paulworks.online">Contact</a>
      </footer>
    </div>
  );
}
