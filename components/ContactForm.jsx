"use client";

import { useState } from "react";
import ArrowIcon from "@/components/ArrowIcon";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: ""
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setErrors({});
    setStatus({ type: "idle", message: "" });

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const result = await response.json();

    if (response.ok) {
      setForm(initialState);
      setStatus({ type: "success", message: result.message });
    } else {
      setErrors(result.errors || {});
      setStatus({ type: "error", message: result.message || "Message failed." });
    }
    setPending(false);
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={updateField}
          autoComplete="name"
          minLength="2"
          maxLength="80"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          required
        />
        <FieldError id="name-error" message={errors.name} />
      </div>
      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={updateField}
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          required
        />
        <FieldError id="email-error" message={errors.email} />
      </div>
      <div className="form-row">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          name="subject"
          value={form.subject}
          onChange={updateField}
          minLength="3"
          maxLength="120"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          required
        />
        <FieldError id="subject-error" message={errors.subject} />
      </div>
      <div className="form-row honey" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          value={form.website}
          onChange={updateField}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>
      <div className="form-row">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="8"
          value={form.message}
          onChange={updateField}
          minLength="20"
          maxLength="3000"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          required
        />
        <FieldError id="message-error" message={errors.message} />
      </div>
      <button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send message"} <ArrowIcon className="link-arrow" />
      </button>
      <p className={`form-status ${status.type}`} role="status">
        {status.message}
      </p>
    </form>
  );
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p className="field-error" id={id}>
      {message}
    </p>
  );
}
