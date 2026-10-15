import React, { useRef, useState } from "react";
import { post } from "../utils/api";

export default function Contact() {
  const pending = useRef(false);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState(null);
  const [retryAt, setRetryAt] = useState(0);

  const submit = async (event) => {
    event.preventDefault();
    if (pending.current) return;
    if (Date.now() < retryAt) return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    pending.current = true;
    setSending(true);
    setNotice(null);
    try {
      const data = await post("contacts", fields);
      setNotice({ error: false, text: data.message });
      form.reset();
    } catch (error) {
      const data = error.response?.data;
      if (data?.retry_after) setRetryAt(Date.now() + data.retry_after * 1000);
      setNotice({
        error: true,
        text:
          data?.error ||
          "We could not confirm delivery. Your message is still here; please try again when your connection is restored.",
      });
    } finally {
      pending.current = false;
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="mp-info-section"
      aria-labelledby="contact-title"
    >
      <div className="mp-section-heading">
        <p className="mp-eyebrow">We’re listening</p>
        <h2 id="contact-title">Contact & support</h2>
        <p>Share an idea, report a bug, or get in touch. No sign-in needed.</p>
      </div>
      <form className="mp-contact-form mp-info-card" onSubmit={submit}>
        <fieldset disabled={sending}>
          <legend className="mp-contact-hidden">Your message</legend>
          <label htmlFor="contact-name">
            Name
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
            />
          </label>
          <label htmlFor="contact-email">
            Email
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
          <label htmlFor="contact-category">
            Topic
            <select
              id="contact-category"
              name="category"
              defaultValue="contact"
              required
            >
              <option value="contact">General contact</option>
              <option value="suggestion">Suggestion for improvement</option>
              <option value="bug_report">Bug report</option>
            </select>
          </label>
          <label htmlFor="contact-message">
            Message
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              maxLength={2000}
              aria-describedby="contact-privacy"
            />
          </label>
          <div className="mp-contact-hidden" aria-hidden="true">
            <label htmlFor="contact-website">
              Website
              <input
                id="contact-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>
          <p id="contact-privacy">
            Your details are sent to our team through Slack so we can respond by
            email. Please don’t include passwords or financial account details.{" "}
            <a href="/privacy.html">Privacy policy</a>
          </p>
          <button className="mp-cta" type="submit">
            {sending ? "Sending…" : "Send message"}
          </button>
        </fieldset>
        {notice && (
          <p role={notice.error ? "alert" : "status"}>{notice.text}</p>
        )}
      </form>
    </section>
  );
}
