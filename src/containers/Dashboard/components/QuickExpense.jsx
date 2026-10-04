import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import { MessageCirclePlus, X, Sprout, CheckCircle2, Send } from "lucide-react";
import { post } from "../../../utils/api";
import useExpenseLocation from "../../../utils/useExpenseLocation";
import { PrimaryButton } from "../../../components/Button";

export default function QuickExpense({ onSaved }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);
  const location = useExpenseLocation(open);
  const pending = useRef(false);
  const log = useRef(null);
  const input = useRef(null);
  const sequence = useRef(0);
  const trigger = useRef(null);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, open]);
  const submit = async (event) => {
    event.preventDefault();
    const notes = draft.trim();
    if (!notes || pending.current) return;
    pending.current = true;
    setSaving(true);
    setError(false);
    try {
      await post("auto_expenses", { expense: { notes, ...location } });
      sequence.current += 1;
      const message = { id: sequence.current, notes };
      setMessages((previous) => [...previous.slice(-3), message]);
      setDraft("");
      onSaved();
    } catch {
      setError(true);
    } finally {
      pending.current = false;
      setSaving(false);
      requestAnimationFrame(() => input.current?.focus());
    }
  };
  return (
    <>
      <button
        type="button"
        ref={trigger}
        className="workspace-quick-trigger"
        hidden={open}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="quick-expense-dialog"
        onClick={() => setOpen(true)}
      >
        <MessageCirclePlus size={21} />
        Add by text
      </button>
      <Dialog
        open={open}
        onClose={() => {
          if (!saving) setOpen(false);
        }}
        disableEscapeKeyDown={saving}
        aria-labelledby="quick-expense-title"
        aria-describedby="quick-expense-description"
        container={() =>
          document.querySelector(".money-workspace") || document.body
        }
        slotProps={{
          paper: {
            id: "quick-expense-dialog",
            className: "workspace-quick-dialog",
          },
          backdrop: { sx: { backgroundColor: "rgba(15, 35, 24, 0.18)" } },
          transition: {
            onEntered: () => input.current?.focus(),
            onExited: () => trigger.current?.focus(),
          },
        }}
      >
        <header className="workspace-quick-header">
          <div>
            <span className="workspace-quick-mark">
              <Sprout size={20} />
            </span>
            <div>
              <h2 id="quick-expense-title">Quick expense</h2>
              <p id="quick-expense-description">
                Describe it. Save it. Stay here.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="workspace-icon-button"
            aria-label="Close quick expense"
            disabled={saving}
            onClick={() => setOpen(false)}
          >
            <X size={19} />
          </button>
        </header>
        <div className="workspace-quick-messages" ref={log}>
          <div className="workspace-quick-bubble">
            <p>What did you spend?</p>
            <span>
              Try “Coffee 650 at the corner café”. Use your account currency,
              one expense at a time.
            </span>
          </div>
          <p className="workspace-note workspace-quick-date">
            Recorded for today, even if you’re viewing another month.
          </p>
          {messages.map((message) => (
            <div key={message.id}>
              <p className="workspace-quick-bubble user">{message.notes}</p>
              <p className="workspace-quick-confirmation" role="status">
                <CheckCircle2 size={16} />
                Saved. Overview updated for this month.
              </p>
            </div>
          ))}
        </div>
        <form
          className="workspace-quick-composer"
          onSubmit={submit}
          aria-busy={saving}
        >
          {error && (
            <p className="workspace-field-error" role="alert">
              Couldn’t save this expense. Your text is still here—try again.
            </p>
          )}
          <label htmlFor="quick-expense-notes">
            Describe your expense
            <textarea
              id="quick-expense-notes"
              ref={input}
              rows={3}
              value={draft}
              disabled={saving}
              placeholder="Coffee 650 at the corner café"
              onChange={(event) => {
                setDraft(event.target.value);
                setError(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                  event.preventDefault();
                  event.currentTarget.form.requestSubmit();
                }
              }}
            />
          </label>
          <div>
            <span className="workspace-note">Ctrl / ⌘ + Enter to save</span>
            <PrimaryButton type="submit" disabled={saving || !draft.trim()}>
              <Send size={15} />
              {saving ? "Saving…" : "Save expense"}
            </PrimaryButton>
          </div>
        </form>
      </Dialog>
    </>
  );
}
QuickExpense.propTypes = { onSaved: PropTypes.func.isRequired };
