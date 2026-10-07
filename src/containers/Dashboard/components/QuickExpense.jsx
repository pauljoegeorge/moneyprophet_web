import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import { Link } from "react-router-dom";
import {
  MessageCirclePlus,
  X,
  Sprout,
  CheckCircle2,
  Send,
  CircleHelp,
} from "lucide-react";
import { apiErrorMessage } from "../../../utils/apiError";
import { post } from "../../../utils/api";
import useExpenseLocation from "../../../utils/useExpenseLocation";
import { PrimaryButton } from "../../../components/Button";

export default function QuickExpense({ onSaved }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);
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
    setFeedback(null);
    try {
      const response = await post("auto_expenses", {
        expense: { notes, ...location },
      });
      if (response.notice) setFeedback({ ...response.notice, failed: false });
      sequence.current += 1;
      const message = { id: sequence.current, notes };
      setMessages((previous) => [...previous.slice(-3), message]);
      setDraft("");
      onSaved();
    } catch (requestError) {
      setFeedback({
        message: apiErrorMessage(
          requestError,
          "Couldn’t save. Please try again."
        ),
        actions: requestError.response?.data?.actions || [],
        failed: true,
      });
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
            <h2 id="quick-expense-title">Quick expense</h2>
          </div>
          <details className="workspace-quick-help">
            <summary
              className="workspace-icon-button"
              aria-label="Quick expense help"
            >
              <CircleHelp size={19} aria-hidden="true" />
            </summary>
            <p>
              Include an amount, like “Coffee 650”. Uses your account currency
              and today’s date. Ctrl / ⌘ + Enter to save.
            </p>
          </details>
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
        {messages.length > 0 && (
          <div className="workspace-quick-messages" ref={log}>
            {messages.map((message) => (
              <div key={message.id}>
                <p className="workspace-quick-bubble user">{message.notes}</p>
                <p className="workspace-quick-confirmation" role="status">
                  <CheckCircle2 size={16} />
                  Saved.
                </p>
              </div>
            ))}
          </div>
        )}
        <form
          className="workspace-quick-composer"
          onSubmit={submit}
          aria-busy={saving}
        >
          {feedback && (
            <div
              className="workspace-quick-feedback"
              role={feedback.failed ? "alert" : "status"}
            >
              <p>{feedback.message}</p>
              {(feedback.actions || []).map((action) => (
                <Link
                  key={action.href}
                  className="workspace-button"
                  to={action.href}
                  onClick={() => setOpen(false)}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          )}
          <label htmlFor="quick-expense-notes">
            <span id="quick-expense-label">Expense</span>
            <textarea
              id="quick-expense-notes"
              aria-labelledby="quick-expense-label"
              ref={input}
              rows={3}
              value={draft}
              disabled={saving}
              placeholder="Coffee 650"
              onChange={(event) => {
                setDraft(event.target.value);
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
            <PrimaryButton type="submit" disabled={saving || !draft.trim()}>
              <Send size={15} />
              {saving ? "Saving…" : "Save"}
            </PrimaryButton>
          </div>
        </form>
      </Dialog>
    </>
  );
}
QuickExpense.propTypes = { onSaved: PropTypes.func.isRequired };
