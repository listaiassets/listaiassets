"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Send,
  CheckCircle2,
  MessageSquare,
  Building,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";
import { InteractiveVectorGrid } from "@/components/ui/InteractiveVectorGrid";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // Netlify Forms AJAX Submission format (application/x-www-form-urlencoded)
      const encodedBody = new URLSearchParams({
        "form-name": "contact",
        ...formData,
      }).toString();

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedBody,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        // Fallback or retry
        throw new Error("Unable to submit form. Please try emailing team@listaiassets.com directly.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Submission error occurred";
      // In local dev Next.js server without Netlify runtime, acknowledge submission gracefully
      if (process.env.NODE_ENV !== "production") {
        setSubmitted(true);
      } else {
        setErrorMessage(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Interactive Background Grid */}
      <InteractiveVectorGrid />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <MessageSquare className="h-3.5 w-3.5" />
            Support &amp; Inquiries
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
            Get in touch with the ListAIAssets team
          </h1>
          <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Have questions about directory listing, Fast Track review SLAs, enterprise sponsorships, or telemetry methodology? We are here to assist.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contact Info & SLAs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-[#1c1917]/80 backdrop-blur-md p-6 shadow-xs">
              <h2 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-500" />
                Direct Editorial Contact
              </h2>
              <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                For urgent inquiries, founder updates, or partnership proposals, email our editorial desk directly:
              </p>
              <a
                href="mailto:team@listaiassets.com"
                className="mt-3 inline-block font-mono text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                team@listaiassets.com
              </a>
            </div>

            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-[#1c1917]/80 backdrop-blur-md p-6 shadow-xs">
              <h2 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                Response SLAs
              </h2>
              <ul className="mt-3 space-y-2.5 text-xs text-stone-600 dark:text-stone-400">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-stone-900 dark:text-white">• Fast Track Submissions:</span>
                  <span>Guaranteed index review within 12 hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-stone-900 dark:text-white">• Featured Sponsorships:</span>
                  <span>Same-day onboarding &amp; newsletter scheduling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-stone-900 dark:text-white">• General Inquiries:</span>
                  <span>Usually answered within 24 business hours.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-[#1c1917]/80 backdrop-blur-md p-6 shadow-xs">
              <h2 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Looking to list your AI product?
              </h2>
              <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                If you are a founder or maintainer looking to list your tool on the directory, submit it through our indexer for accelerated queue processing:
              </p>
              <Link
                href="/submit"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <span>Go to Founder Submission Portal</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Netlify Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 sm:p-8 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. Our team has received your message via Netlify Forms and will respond to <strong className="text-stone-800 dark:text-stone-200">{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "General Inquiry",
                        message: "",
                      });
                    }}
                    className="mt-4 rounded-lg bg-stone-100 dark:bg-stone-800 px-4 py-2 text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Required hidden fields for Netlify Forms */}
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don’t fill this out if you’re human: <input name="bot-field" />
                    </label>
                  </p>

                  {errorMessage && (
                    <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
                      <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        Your Full Name <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Sarah Connor"
                        className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3.5 py-2 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        Work Email Address <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sarah@company.com"
                        className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3.5 py-2 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3.5 py-2 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Tool Submission & Fast Track Review">Tool Submission &amp; Fast Track Review</option>
                      <option value="Featured Spotlight & Sponsorship">Featured Spotlight &amp; Sponsorship</option>
                      <option value="Benchmark Telemetry Correction">Benchmark Telemetry Correction</option>
                      <option value="API Integration & Partnership">API Integration &amp; Partnership</option>
                      <option value="Report a Bug / Listing Issue">Report a Bug / Listing Issue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Message <span className="text-amber-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please share details about your inquiry, tool slug, or question..."
                      className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3.5 py-2 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 py-2.5 px-4 text-xs font-bold hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                  >
                    {loading ? (
                      <span>Submitting to Netlify...</span>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-stone-500 text-center pt-2">
                    Protected by Netlify Forms with built-in spam honeypot filtering.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
