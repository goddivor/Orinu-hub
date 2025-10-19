/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeSlash, Sms, Google, Facebook, TickCircle } from 'iconsax-react';
import { registerWithEmail, loginWithGoogle } from '../../services/authService';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Le surnom est requis';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Le surnom doit contenir au moins 3 caractères';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    // Terms validation
    if (!acceptTerms) {
      newErrors.terms = 'Vous devez accepter les conditions d\'utilisation';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      emailRegex.test(formData.email) &&
      formData.username.length >= 3 &&
      formData.password.length >= 8 &&
      formData.password === formData.confirmPassword &&
      acceptTerms
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const result = await registerWithEmail(
        formData.email,
        formData.password,
        formData.username
      );

      setSuccessMessage(result.message);

      // Rediriger vers la page d'accueil après 2 secondes pour que l'utilisateur voie le message
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error: any) {
      setErrors({ email: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setErrors({});

    try {
      await loginWithGoogle();
      // Rediriger vers la page d'accueil immédiatement
      // L'utilisateur est automatiquement connecté avec Google
      navigate('/');
    } catch (error: any) {
      setErrors({ email: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    if (provider === 'Google') {
      handleGoogleSignup();
    } else {
      // TODO: Implémenter Facebook et X/Twitter plus tard
      setErrors({ email: `Connexion avec ${provider} sera bientôt disponible` });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base via-[#1a0525] to-base flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src="/logo_light.png"
              alt="Orinu Logo"
              className="h-12 w-12 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <h1 className="text-3xl font-bold text-light">Orinu</h1>
          </div>
          <h2 className="text-2xl font-bold text-light mb-2">Créer un compte</h2>
          <p className="text-gray">Rejoignez la communauté des Origuns</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="glass rounded-2xl p-4 border border-light/30 bg-light/10 mb-6">
            <p className="text-light text-center text-sm">{successMessage}</p>
          </div>
        )}

        {/* Main Form */}
        <div className="glass rounded-2xl p-8 border border-white/10 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-light mb-2">
                Email <span className="text-fire">*</span>
              </label>
              <div className="relative">
                <Sms size={20} color="#BDB4C7" className="absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${
                    errors.email ? 'border-fire' : 'border-white/10'
                  } rounded-lg text-text placeholder-gray focus:outline-none focus:border-light/50 transition`}
                />
              </div>
              {errors.email && <p className="text-fire text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-light mb-2">
                Surnom <span className="text-fire">*</span>
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="votre_surnom"
                className={`w-full px-4 py-3 bg-white/5 border ${
                  errors.username ? 'border-fire' : 'border-white/10'
                } rounded-lg text-text placeholder-gray focus:outline-none focus:border-light/50 transition`}
              />
              {errors.username && <p className="text-fire text-xs mt-1">{errors.username}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-light mb-2">
                Mot de passe <span className="text-fire">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 bg-white/5 border ${
                    errors.password ? 'border-fire' : 'border-white/10'
                  } rounded-lg text-text placeholder-gray focus:outline-none focus:border-light/50 transition`}
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
              {errors.password && <p className="text-fire text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-light mb-2">
                Confirmer le mot de passe <span className="text-fire">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 bg-white/5 border ${
                    errors.confirmPassword ? 'border-fire' : 'border-white/10'
                  } rounded-lg text-text placeholder-gray focus:outline-none focus:border-light/50 transition`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition"
                >
                  {showConfirmPassword ? (
                    <EyeSlash size={20} color="#BDB4C7" />
                  ) : (
                    <Eye size={20} color="#BDB4C7" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-fire text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => {
                      setAcceptTerms(e.target.checked);
                      if (errors.terms) {
                        setErrors(prev => ({ ...prev, terms: '' }));
                      }
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                      acceptTerms
                        ? 'bg-gradient-to-r from-fire to-light border-transparent'
                        : errors.terms
                        ? 'border-fire'
                        : 'border-white/20 group-hover:border-light/50'
                    }`}
                  >
                    {acceptTerms && <TickCircle size={16} color="#000000" variant="Bold" />}
                  </div>
                </div>
                <span className="text-sm text-gray">
                  J'accepte les{' '}
                  <a href="/terms" className="text-light hover:text-fire transition">
                    conditions d'utilisation
                  </a>{' '}
                  <span className="text-fire">*</span>
                </span>
              </label>
              {errors.terms && <p className="text-fire text-xs mt-1 ml-8">{errors.terms}</p>}
            </div>

            {/* Newsletter Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={acceptNewsletter}
                    onChange={(e) => setAcceptNewsletter(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                      acceptNewsletter
                        ? 'bg-gradient-to-r from-fire to-light border-transparent'
                        : 'border-white/20 group-hover:border-light/50'
                    }`}
                  >
                    {acceptNewsletter && <TickCircle size={16} color="#000000" variant="Bold" />}
                  </div>
                </div>
                <span className="text-sm text-gray">
                  Je souhaite recevoir des emails sur les nouvelles Orinus et actualités
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid() || loading}
              className={`w-full px-6 py-3 font-semibold rounded-lg transition ${
                !isFormValid() || loading
                  ? 'bg-gray/30 text-gray/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-fire to-light text-black hover:shadow-lg'
              }`}
            >
              {loading ? 'Création en cours...' : 'Créer mon compte'}
            </button>
          </form>
        </div>

        {/* Social Sign Up */}
        <div className="glass rounded-2xl p-6 border border-white/10 mb-6">
          <p className="text-center text-sm text-gray mb-4">Ou connectez-vous avec</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleSocialSignup('Google')}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition"
              title="S'inscrire avec Google"
            >
              <Google size={24} color="#DB4437" variant="Bold" />
            </button>
            <button
              onClick={() => handleSocialSignup('Facebook')}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition"
              title="S'inscrire avec Facebook"
            >
              <Facebook size={24} color="#1877F2" variant="Bold" />
            </button>
            <button
              onClick={() => handleSocialSignup('X')}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition"
              title="S'inscrire avec X"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  fill="#E9D8FF"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray">
            Vous avez déjà un compte ?{' '}
            <button
              onClick={() => navigate('/')}
              className="text-fire hover:text-light font-medium transition"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
