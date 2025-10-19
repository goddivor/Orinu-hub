import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Category, Book, Profile, SearchNormal1, Global } from 'iconsax-react';
import { useAuth } from '../../context/auth-context';
import ProfileDropdown from '../ProfileDropdown';

interface HeaderProps {
  onOpenLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenLogin }) => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="sticky top-0 z-50 bg-base/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo_light.png"
              alt="Orinu Logo"
              className="h-10 w-10 object-contain"
              onError={(e) => {
                // Fallback si l'image n'existe pas
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div>
              <h1 className="text-xl font-bold text-light">Orinu</h1>
              <p className="text-xs text-gray -mt-1">BD Africaine</p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="flex items-center gap-2 text-sm text-gray hover:text-light transition">
              <Home size={18} color="#E9D8FF" />
              <span>{t('nav.home')}</span>
            </a>
            <a href="/categories" className="flex items-center gap-2 text-sm text-gray hover:text-light transition">
              <Category size={18} color="#E9D8FF" />
              <span>{t('nav.categories')}</span>
            </a>
            <a href="/weekly" className="flex items-center gap-2 text-sm text-gray hover:text-light transition">
              <Book size={18} color="#E9D8FF" />
              <span>{t('nav.weeklyChapters')}</span>
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <SearchNormal1
                size={20}
                color="#BDB4C7"
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
              <input
                type="text"
                placeholder={t('nav.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-mid/30 border border-white/10 rounded-full text-sm text-text placeholder-gray focus:outline-none focus:border-light/50 transition"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="relative p-2 hover:bg-mid/30 rounded-full transition group"
              title={i18n.language === 'fr' ? 'Switch to English' : 'Passer en Français'}
            >
              <Global size={22} color="#E9D8FF" />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold bg-fire text-black rounded-full">
                {i18n.language.toUpperCase()}
              </span>
            </button>

            {/* Profile/Login */}
            {user ? (
              <ProfileDropdown />
            ) : (
              <button
                onClick={onOpenLogin}
                className="p-2 hover:bg-mid/30 rounded-full transition"
                title="Se connecter"
              >
                <Profile size={22} color="#FF6B35" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-3">
          <div className="relative">
            <SearchNormal1
              size={18}
              color="#BDB4C7"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              placeholder={t('nav.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-mid/30 border border-white/10 rounded-full text-sm text-text placeholder-gray focus:outline-none focus:border-light/50 transition"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
