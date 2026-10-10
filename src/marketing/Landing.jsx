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
        <span>“Coffee 480, groceries 2,300”</span>
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
      </footer>
    </div>
  );
}
