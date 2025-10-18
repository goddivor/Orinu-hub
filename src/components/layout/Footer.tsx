import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-base/50 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/ousagi.png"
                alt="Orinu"
                className="h-8 w-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <h3 className="text-lg font-bold text-light">Orinu</h3>
            </div>
            <p className="text-sm text-gray max-w-md">
              {t('about.description')}
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-sm font-semibold text-light mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-gray hover:text-light transition">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="/categories" className="text-sm text-gray hover:text-light transition">
                  {t('nav.categories')}
                </a>
              </li>
              <li>
                <a href="/weekly" className="text-sm text-gray hover:text-light transition">
                  {t('nav.weeklyChapters')}
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-sm font-semibold text-light mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="text-sm text-gray hover:text-light transition">
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <a href="/help" className="text-sm text-gray hover:text-light transition">
                  {t('footer.help')}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-gray hover:text-light transition">
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-center text-sm text-gray">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
