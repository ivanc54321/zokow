import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  User, 
  MapPin, 
  Coffee, 
  Ticket, 
  Waves,
  ShieldCheck,
  Flame,
  Award
} from 'lucide-react';
import { TOWNS } from '../data/eventsData';
import './SignUpModal.css';

// Google Colorful G Icon SVG
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" className="google-icon-svg">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
    />
  </svg>
);

export default function SignUpModal({ isOpen, onClose, onSuccess }) {
  const [mode, setMode] = useState('signup'); // 'signup' | 'signin'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [town, setTown] = useState('Margate');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [memberPass, setMemberPass] = useState(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      const passNumber = `ZK-${Math.floor(1000 + Math.random() * 9000)}`;
      const member = {
        name: 'Thanet Explorer',
        email: 'explorer@gmail.com',
        town: town || 'Margate',
        passNumber,
        memberSince: new Date().getFullYear(),
        tier: 'Coastal Resident Pass',
        provider: 'Google'
      };
      setMemberPass(member);
      setIsLoading(false);
      setIsSuccess(true);
      if (onSuccess) onSuccess(member);
    }, 700);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      const passNumber = `ZK-${Math.floor(1000 + Math.random() * 9000)}`;
      const member = {
        name: name.trim() || email.split('@')[0],
        email: email.trim(),
        town,
        passNumber,
        memberSince: new Date().getFullYear(),
        tier: 'Coastal Resident Pass',
        provider: 'Email'
      };
      setMemberPass(member);
      setIsLoading(false);
      setIsSuccess(true);
      if (onSuccess) onSuccess(member);
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setMemberPass(null);
    setName('');
    setEmail('');
    onClose();
  };

  return (
    <div className="modal-backdrop sign-up-backdrop" onClick={handleResetAndClose}>
      <div 
        className="modal-dialog sign-up-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-modal-title"
      >
        {/* Close Button */}
        <button 
          className="modal-close-btn sign-up-close-btn" 
          onClick={handleResetAndClose} 
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {isSuccess && memberPass ? (
          /* SUCCESS STATE: Digital Holographic Member Card */
          <div className="sign-up-success-view">
            <div className="success-badge-pulse">
              <CheckCircle2 size={32} className="success-check-icon" />
            </div>

            <div className="success-header">
              <span className="success-pill">MEMBERSHIP ACTIVATED</span>
              <h2 className="success-title">Welcome to VERGE, {memberPass.name}!</h2>
              <p className="success-desc">
                Your coastal membership pass is now live. Enjoy curated line-ups, free partner coffee, and early gig tickets across Thanet.
              </p>
            </div>

            {/* Holographic Member Card */}
            <div className="digital-member-pass">
              <div className="member-pass-glow"></div>
              <div className="member-pass-header">
                <div className="pass-brand">
                  <span className="pass-logo">VERGE</span>
                  <span className="pass-tag">MEMBER PASS</span>
                </div>
                <div className="pass-status">
                  <span className="status-dot"></span>
                  <span>ACTIVE</span>
                </div>
              </div>

              <div className="member-pass-body">
                <div className="pass-avatar">
                  <User size={24} />
                </div>
                <div className="pass-info">
                  <div className="pass-name">{memberPass.name}</div>
                  <div className="pass-meta">
                    <span className="pass-town">
                      <MapPin size={12} /> {memberPass.town}
                    </span>
                    <span className="pass-tier">{memberPass.tier}</span>
                  </div>
                </div>
              </div>

              <div className="member-pass-footer">
                <div className="pass-id-col">
                  <span className="pass-id-label">MEMBER ID</span>
                  <span className="pass-id-number">{memberPass.passNumber}</span>
                </div>
                <div className="pass-perks-chip">
                  <Coffee size={13} />
                  <span>Free Lounge Coffee Included</span>
                </div>
              </div>
            </div>

            {/* Quick Next Actions */}
            <div className="success-actions">
              <button 
                className="sign-up-submit-btn success-btn"
                onClick={handleResetAndClose}
              >
                <span>Explore Events & Perks</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ) : (
          /* DEFAULT FORM VIEW */
          <div className="sign-up-content">
            {/* Header */}
            <div className="sign-up-header">
              <div className="sign-up-tag-row">
                <span className="sign-up-pill">
                  <Sparkles size={13} />
                  VERGE PASSHOLDER
                </span>
                <span className="sign-up-free-badge">100% FREE</span>
              </div>
              <h2 id="signup-modal-title" className="sign-up-heading">
                {mode === 'signup' ? 'Become a Member' : 'Welcome Back'}
              </h2>
              <p className="sign-up-subheading">
                {mode === 'signup' 
                  ? 'Join Thanet’s insider social circle. Unlock complimentary partner coffee, secret gig drops, and weekly curated line-ups.'
                  : 'Access your saved bookmarks, weekend itineraries, and member perks.'}
              </p>
            </div>

            {/* Member Perks Checklist */}
            <div className="sign-up-perks-grid">
              <div className="perk-item">
                <div className="perk-icon-wrap icon-coffee">
                  <Coffee size={16} />
                </div>
                <div className="perk-text">
                  <strong>Complimentary Coffee</strong>
                  <span>Free drink at REWD Lounge & partner hubs</span>
                </div>
              </div>

              <div className="perk-item">
                <div className="perk-icon-wrap icon-ticket">
                  <Ticket size={16} />
                </div>
                <div className="perk-text">
                  <strong>Early Gig Drops</strong>
                  <span>Priority access to Dreamland & Music Hall</span>
                </div>
              </div>

              <div className="perk-item">
                <div className="perk-icon-wrap icon-waves">
                  <Waves size={16} />
                </div>
                <div className="perk-text">
                  <strong>Community Sessions</strong>
                  <span>Walpole tidal pool swims & 5-a-side matches</span>
                </div>
              </div>
            </div>

            {/* Google One-Click Button */}
            <div className="social-auth-section">
              <button 
                type="button" 
                className="google-signup-btn"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
              >
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="auth-divider">
              <span className="divider-line"></span>
              <span className="divider-text">OR CONTINUE WITH EMAIL</span>
              <span className="divider-line"></span>
            </div>

            {/* Email Form */}
            <form className="sign-up-form" onSubmit={handleEmailSubmit}>
              {mode === 'signup' && (
                <div className="sign-up-input-group">
                  <label htmlFor="member-name">Full Name</label>
                  <div className="input-with-icon">
                    <User size={16} className="input-icon" />
                    <input 
                      id="member-name"
                      type="text" 
                      placeholder="e.g. Maya Carter" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="sign-up-input-group">
                <label htmlFor="member-email">Email Address *</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input 
                    id="member-email"
                    type="email" 
                    required 
                    placeholder="you@domain.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div className="sign-up-input-group">
                  <label htmlFor="member-town">Home Town / Favorite Base</label>
                  <div className="input-with-icon">
                    <MapPin size={16} className="input-icon" />
                    <select 
                      id="member-town"
                      value={town} 
                      onChange={(e) => setTown(e.target.value)}
                    >
                      {TOWNS.filter(t => t.id !== 'all').map(t => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className="sign-up-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="btn-loading-dots">Activating pass...</span>
                ) : (
                  <>
                    <span>{mode === 'signup' ? 'Claim Your Free Member Pass' : 'Sign In'}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Footer switcher & assurance */}
            <div className="sign-up-footer">
              <p className="privacy-pledge">
                <ShieldCheck size={14} />
                <span>Zero spam. Coastal culture only. Unsubscribe with 1-click anytime.</span>
              </p>

              <div className="mode-toggle-row">
                {mode === 'signup' ? (
                  <span>
                    Already have a pass?{' '}
                    <button 
                      type="button" 
                      className="inline-mode-btn"
                      onClick={() => setMode('signin')}
                    >
                      Sign in here
                    </button>
                  </span>
                ) : (
                  <span>
                    New to Thanet?{' '}
                    <button 
                      type="button" 
                      className="inline-mode-btn"
                      onClick={() => setMode('signup')}
                    >
                      Become a member for free
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
