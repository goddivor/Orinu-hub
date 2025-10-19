import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import LoginModal from '../../components/modals/LoginModal';
import OrinuCard from '../../components/OrinuCard';
import { mockOrinus, categories, weekDays } from '../../data/mockOrinus';
import { ArrowRight2, Book1, People, MessageText, Global } from 'iconsax-react';

const Landing: React.FC = () => {
  const { t } = useTranslation();
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Filtrer les Orinus par catégorie et jour
  const trendingOrinus = mockOrinus.slice(0, 6);
  const weeklyOrinus = mockOrinus.filter(o => o.publishDay === selectedDay);
  const categoryOrinus = selectedCategory === 'all'
    ? mockOrinus.slice(0, 8)
    : mockOrinus.filter(o => o.category === selectedCategory).slice(0, 8);
  const newOriginalOrinus = mockOrinus.slice(6, 10);

  return (
    <div className="min-h-screen bg-gradient-to-b from-base via-[#1a0525] to-base">
      <Header onOpenLogin={() => setIsLoginModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section: Orinu Tendances & Populaires */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-light">{t('sections.trending')}</h2>
            <a
              href="/trending"
              className="flex items-center gap-2 text-sm text-fire hover:text-light transition"
            >
              {t('sections.seeAll')}
              <ArrowRight2 size={16} color="#FF6B35" />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trendingOrinus.map(orinu => (
              <OrinuCard key={orinu.id} orinu={orinu} />
            ))}
          </div>
        </section>

        {/* Section: Orinu Hebdo */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-light">{t('sections.weekly')}</h2>
          </div>

          {/* Day Tags */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {weekDays.map(day => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  selectedDay === day.id
                    ? 'bg-gradient-to-r from-fire to-light text-black'
                    : 'bg-mid/30 text-gray hover:bg-mid/50'
                }`}
              >
                {t(`days.${day.id}`)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {weeklyOrinus.length > 0 ? (
              weeklyOrinus.map(orinu => (
                <OrinuCard key={orinu.id} orinu={orinu} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray">
                Aucun Orinu pour ce jour
              </div>
            )}
          </div>
        </section>

        {/* Section: Orinu Populaires par Catégorie */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-light">{t('sections.popularByCategory')}</h2>
            <a
              href="/categories"
              className="flex items-center gap-2 text-sm text-fire hover:text-light transition"
            >
              {t('sections.seeAll')}
              <ArrowRight2 size={16} color="#FF6B35" />
            </a>
          </div>

          {/* Category Tags */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-fire to-light text-black'
                  : 'bg-mid/30 text-gray hover:bg-mid/50'
              }`}
            >
              Tous
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-fire to-light text-black'
                    : 'bg-mid/30 text-gray hover:bg-mid/50'
                }`}
              >
                {t(`categories.${cat.id}`)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categoryOrinus.map(orinu => (
              <OrinuCard key={orinu.id} orinu={orinu} />
            ))}
          </div>
        </section>

        {/* Section: Nouvelles Orinu d'ORIGINAL */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-light">{t('sections.newOriginal')}</h2>
            <a
              href="/new"
              className="flex items-center gap-2 text-sm text-fire hover:text-light transition"
            >
              {t('sections.seeAll')}
              <ArrowRight2 size={16} color="#FF6B35" />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {newOriginalOrinus.map(orinu => (
              <OrinuCard key={orinu.id} orinu={orinu} />
            ))}
          </div>
        </section>

        {/* Section: Fonctionnalités */}
        <section className="mb-16" id="features">
          <h2 className="text-2xl font-bold text-light mb-8 text-center">{t('features.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass rounded-xl p-6 text-center hover:bg-mid/30 transition">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fire to-light/50 flex items-center justify-center mx-auto mb-4">
                <Book1 size={24} color="#000" variant="Bold" />
              </div>
              <h3 className="text-lg font-semibold text-light mb-2">{t('features.publish.title')}</h3>
              <p className="text-sm text-gray">{t('features.publish.desc')}</p>
            </div>

            <div className="glass rounded-xl p-6 text-center hover:bg-mid/30 transition">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fire to-light/50 flex items-center justify-center mx-auto mb-4">
                <Book1 size={24} color="#000" variant="Bold" />
              </div>
              <h3 className="text-lg font-semibold text-light mb-2">{t('features.read.title')}</h3>
              <p className="text-sm text-gray">{t('features.read.desc')}</p>
            </div>

            <div className="glass rounded-xl p-6 text-center hover:bg-mid/30 transition">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fire to-light/50 flex items-center justify-center mx-auto mb-4">
                <Global size={24} color="#000" variant="Bold" />
              </div>
              <h3 className="text-lg font-semibold text-light mb-2">{t('features.discover.title')}</h3>
              <p className="text-sm text-gray">{t('features.discover.desc')}</p>
            </div>

            <div className="glass rounded-xl p-6 text-center hover:bg-mid/30 transition">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fire to-light/50 flex items-center justify-center mx-auto mb-4">
                <People size={24} color="#000" variant="Bold" />
              </div>
              <h3 className="text-lg font-semibold text-light mb-2">{t('features.community.title')}</h3>
              <p className="text-sm text-gray">{t('features.community.desc')}</p>
            </div>
          </div>
        </section>

        {/* Section: À propos */}
        <section className="mb-16" id="about">
          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-light mb-4 text-center">{t('about.title')}</h2>
            <p className="text-gray text-center max-w-3xl mx-auto">
              {t('about.description')}
            </p>
          </div>
        </section>

        {/* Section: Contact */}
        <section className="mb-16" id="contact">
          <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fire to-light/50 flex items-center justify-center mx-auto mb-4">
              <MessageText size={32} color="#000" variant="Bold" />
            </div>
            <h2 className="text-2xl font-bold text-light mb-4">{t('sections.contact')}</h2>
            <p className="text-gray mb-6 max-w-2xl mx-auto">
              Vous avez des questions ou souhaitez en savoir plus ? N'hésitez pas à nous contacter.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-fire to-light text-black font-semibold hover:shadow-lg transition"
            >
              Nous contacter
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default Landing;
