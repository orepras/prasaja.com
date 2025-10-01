"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [siteKey, setSiteKey] = useState<string>("");
  const [showCaptcha, setShowCaptcha] = useState(false);

  useEffect(() => {
    // Get the reCAPTCHA site key
    const key = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";
    setSiteKey(key);

    // If no key is found in production, log a warning
    if (!key && import.meta.env.PROD) {
      console.warn(
        "reCAPTCHA site key is missing. Please check your environment variables."
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If we're showing the captcha but don't have a token yet, just validate the email
    if (showCaptcha && !captchaToken) {
      setError("Please complete the captcha");
      return;
    }

    // If we're not showing the captcha yet, show it and don't submit
    if (!showCaptcha && siteKey) {
      setShowCaptcha(true);
      return;
    }

    // If site key is not available, bypass captcha check in dev
    if (!siteKey && import.meta.env.DEV) {
      // Skip captcha verification in development if no key is provided
      console.warn("Bypassing reCAPTCHA verification in development mode");
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          captchaToken: captchaToken || "dev-mode-bypass",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Something went wrong");
      }

      setIsSuccess(true);
      setEmail("");
      setCaptchaToken(null);
      setShowCaptcha(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to subscribe");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (token) {
      setError("");
    }
  };

  return (
    <div className="w-full max-w-md space-y-2">
      {isSuccess ? (
        <div className="text-green-500 font-mono" role="status" aria-live="polite">
          Thanks for subscribing! I'll definitely send you some emails.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex w-full font-mono tracking-tighter max-w-sm flex-col gap-2"
          aria-label="Newsletter subscription form"
        >
          <Input
            type="email"
            placeholder="Your email address"
            className="flex-1"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address for newsletter subscription"
            aria-describedby="email-error"
          />

          {showCaptcha && siteKey && (
            <div className="my-2">
              <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaChange} />
            </div>
          )}

          <Button
            type="submit"
            disabled={
              isSubmitting || (showCaptcha && !captchaToken && !!siteKey)
            }
          >
            {isSubmitting
              ? "Subscribing..."
              : showCaptcha
              ? "Complete Subscription"
              : "Subscribe"}
          </Button>

          {error && (
            <div id="email-error" className="text-red-500 text-sm mt-2" role="alert" aria-live="polite">
              {error}
            </div>
          )}
        </form>
      )}
      <p className="text-xs font-mono tracking-tighter text-muted-foreground">
        I respect your privacy. You can unsubscribe at any time.
      </p>
    </div>
  );
}
