"use client";

import { useState } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { contact } from "@/data/site";

/**
 * Static-site enquiry form.
 *
 * Submission:
 *  - If NEXT_PUBLIC_FORM_ENDPOINT is set (e.g. a Formspree / Getform / Basin endpoint),
 *    the form POSTs to it as JSON.
 *  - Otherwise it opens the visitor's email app with the enquiry pre-filled,
 *    addressed to the business email. No fake API is involved.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", required: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: false },
];

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Please enter a valid email.";
  if (values.phone && !/^[+\d][\d\s-]{6,15}$/.test(values.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (!values.message.trim()) errors.message = "Please tell us a little about your needs.";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    if (!ENDPOINT) {
      const subject = `Website enquiry from ${values.name}`;
      const body = `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone || "-"}\n\n${values.message}`;
      window.open(`${contact.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_self");
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("sent");
      setValues({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (name) =>
    `peer w-full rounded-2xl border bg-white px-5 pb-3 pt-7 text-base text-ink outline-none transition-colors placeholder:text-transparent focus:border-navy-800 focus:ring-4 focus:ring-navy-800/10 ${
      errors[name] ? "border-crimson-600" : "border-navy-950/15"
    }`;

  const labelClass =
    "pointer-events-none absolute left-5 top-2.5 text-xs font-medium text-muted transition-all peer-placeholder-shown:top-[1.15rem] peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-navy-800";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2" aria-describedby="form-status">
      {fields.map((f) => (
        <div key={f.name} className={`relative ${f.name === "phone" ? "sm:col-span-2" : ""}`}>
          <input
            id={`cf-${f.name}`}
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            placeholder={f.label}
            value={values[f.name]}
            onChange={onChange}
            aria-invalid={!!errors[f.name]}
            aria-describedby={errors[f.name] ? `cf-${f.name}-error` : undefined}
            aria-required={f.required}
            className={inputClass(f.name)}
          />
          <label htmlFor={`cf-${f.name}`} className={labelClass}>
            {f.label}
            {f.required ? "" : " (optional)"}
          </label>
          {errors[f.name] && (
            <p id={`cf-${f.name}-error`} className="mt-1.5 pl-2 text-sm text-crimson-600">
              {errors[f.name]}
            </p>
          )}
        </div>
      ))}

      <div className="relative sm:col-span-2">
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          placeholder="Message"
          value={values.message}
          onChange={onChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          aria-required
          className={`${inputClass("message")} resize-y`}
        />
        <label htmlFor="cf-message" className={labelClass}>
          Message
        </label>
        {errors.message && (
          <p id="cf-message-error" className="mt-1.5 pl-2 text-sm text-crimson-600">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-70">
          {status === "sending" ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {status === "sending" ? "Sending…" : "Send Enquiry"}
        </button>

        <p id="form-status" role="status" className="text-sm">
          {status === "sent" && (
            <span className="inline-flex items-center gap-2 text-navy-800">
              <CircleCheck className="size-4 text-[#1FA855]" aria-hidden="true" />
              {ENDPOINT ? "Thank you — we'll be in touch soon." : "Your email app has opened with your enquiry."}
            </span>
          )}
          {status === "error" && (
            <span className="inline-flex items-center gap-2 text-crimson-600">
              <CircleAlert className="size-4" aria-hidden="true" />
              Something went wrong. Please call or WhatsApp us instead.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
