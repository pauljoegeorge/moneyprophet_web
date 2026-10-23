import React from "react";
import { ArrowUpRight, Wallet, MessageSquare, ChartPie } from "lucide-react";
import "./marketing.css";
import Contact from "./Contact";
import Questions from "./Questions";
import Brand from "./Brand";
import Preview from "./Preview";
import StructuredData from "./StructuredData";

export { default as Brand } from "./Brand";
export { default as Preview } from "./Preview";

export default function Landing() {
  return (
    <div className="mp-public mp-landing">
      <StructuredData />
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
              Track expenses.
              <br />
              Plan budgets.
              <br />
              <em>Find clarity.</em>
            </h1>
            <p className="mp-lead">
              Money Prophet is an expense tracker and budget tracking app for
              everyday spending, monthly category budgets, and regular bills.
              See what’s left to spend without connecting your bank.
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
                "Track daily expenses",
                "Add a purchase by category or in a few words with optional AI entry.",
              ],
              [
                ChartPie,
                "02",
                "Plan monthly budgets",
                "Set monthly category budgets and plan for your regular bills.",
              ],
              [
                MessageSquare,
                "03",
                "Review spending",
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
        <Questions />
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
