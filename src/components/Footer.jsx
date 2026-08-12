import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[var(--bg-surface-highest)] py-16 w-full flex flex-col items-center justify-center px-[5vw] text-center border-t border-[var(--border-outline-variant)]/30">
      
      {/* Brand Title */}
      <div className="font-accent-italic text-accent-italic text-3xl text-[var(--color-tertiary)] mb-4">
        Aetheria
      </div>

      {/* Owl Post Newsletter Box */}
      <div className="max-w-md w-full bg-[var(--bg-surface)] p-6 rounded-lg shadow-sm torn-edge-all mb-10 border border-[var(--border-outline-variant)]/30">
        <span className="material-symbols-outlined text-2xl text-[var(--color-primary)] mb-1">
          mail
        </span>
        <h4 className="font-display text-lg font-bold text-[var(--text-on-surface)] mb-1">
          Subscribe to the Owl Post
        </h4>
        <p className="font-body-md text-xs text-[var(--text-on-surface-variant)] mb-4">
          Receive newly illuminated chapters directly delivered by royal owl.
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Enter scroll address (email)..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded border border-[var(--border-outline-variant)] bg-[var(--bg-surface-low)] text-xs font-body-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[var(--color-primary)] text-white px-4 py-1.5 rounded font-label-sm text-xs hover:opacity-90 transition-opacity"
            >
              Send
            </button>
          </form>
        ) : (
          <p className="font-accent-italic text-sm text-[var(--color-secondary)]">
            Your scroll address has been recorded by the Royal Owls!
          </p>
        )}
      </div>

      {/* Footer Navigation Links (Retrieved from Attached Zip) */}
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <a className="text-[var(--text-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-label-sm text-xs hover:opacity-80" href="#about">
          The Glade
        </a>
        <a className="text-[var(--text-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-label-sm text-xs hover:opacity-80" href="#realm-map">
          Old Maps
        </a>
        <a className="text-[var(--text-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-label-sm text-xs hover:opacity-80" href="#wishcraft">
          Owl Post
        </a>
        <a className="text-[var(--text-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-label-sm text-xs hover:opacity-80" href="#">
          Privacy Policy
        </a>
      </div>

      {/* Copyright Line */}
      <p className="text-[var(--text-on-surface-variant)] font-body-md text-xs mt-2">
        © 1892 Aetheria Ephemera. All rights reserved by the forest.
      </p>

    </footer>
  );
}
