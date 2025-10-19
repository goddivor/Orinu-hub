/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CloseCircle,
  Sms,
  Google,
  Facebook,
  ArrowLeft,
  Eye,
  EyeSlash
} from 'iconsax-react';
import { loginWithEmail, loginWithGoogle } from '../../services/authService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type LoginView = 'methods' | 'email';

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  useTranslation();
  const [view, setView] = useState<LoginView>('methods');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setView('methods');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setError('');
    setLoading(false);
    onClose();
  };

  const handleBack = () => {
    setView('methods');
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      await loginWithEmail(email, password);
      // Fermer le modal après connexion réussie
      handleClose();
      // Le contexte AuthContext détectera automatiquement la connexion
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await loginWithGoogle();
      handleClose();
      // Le contexte AuthContext détectera automatiquement la connexion
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === 'Google') {
      handleGoogleLogin();
    } else {
      setError(`Connexion avec ${provider} sera bientôt disponible`);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md my-8 bg-gradient-to-b from-mid/40 to-base/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition"
        >
          <CloseCircle size={24} color="#E9D8FF" />
        </button>

        {/* Methods View */}
        {view === 'methods' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-light mb-2 text-center">
              Connexion
            </h2>
            <p className="text-sm text-gray mb-8 text-center">
              Choisissez votre méthode de connexion
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-fire/10 border border-fire/30 rounded-lg">
                <p className="text-fire text-sm text-center">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              {/* Email */}
              <button
                onClick={() => setView('email')}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition"
              >
                <Sms size={24} color="#E9D8FF" variant="Bold" />
                <span className="text-light font-medium">Continuer avec Email</span>
              </button>

              {/* Google */}
              <button
                onClick={() => handleSocialLogin('Google')}
                disabled={loading}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Google size={24} color="#DB4437" variant="Bold" />
                <span className="text-light font-medium">Continuer avec Google</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleSocialLogin('Facebook')}
                disabled={loading}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Facebook size={24} color="#1877F2" variant="Bold" />
                <span className="text-light font-medium">Continuer avec Facebook</span>
              </button>

              {/* X (Twitter) */}
              <button
                onClick={() => handleSocialLogin('X')}
                disabled={loading}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    fill="#E9D8FF"
                  />
                </svg>
                <span className="text-light font-medium">Continuer avec X</span>
              </button>
            </div>
          </div>
        )}

        {/* Email Form View */}
        {view === 'email' && (
          <div className="p-8">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray hover:text-light transition mb-6"
            >
              <ArrowLeft size={20} color="#BDB4C7" />
              <span className="text-sm">Retour</span>
            </button>

            <h2 className="text-2xl font-bold text-light mb-2">
              Connexion par Email
            </h2>
            <p className="text-sm text-gray mb-6">
              Entrez vos identifiants pour vous connecter
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-fire/10 border border-fire/30 rounded-lg">
                <p className="text-fire text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-light mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text placeholder-gray focus:outline-none focus:border-light/50 transition"
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-light mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg text-text placeholder-gray focus:outline-none focus:border-light/50 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition"
                  >
                    {showPassword ? (
                      <EyeSlash size={20} color="#BDB4C7" />
                    ) : (
                      <Eye size={20} color="#BDB4C7" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-sm text-fire hover:text-light transition"
                >
                  Mot de passe oublié ?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-6 py-3 font-semibold rounded-lg transition ${
                  loading
                    ? 'bg-gray/30 text-gray/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-fire to-light text-black hover:shadow-lg'
                }`}
              >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray">
                Vous n'avez pas de compte ?{' '}
                <a
                  href="/register"
                  className="text-fire hover:text-light font-medium transition"
                >
                  S'inscrire &gt;
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
