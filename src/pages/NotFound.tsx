import React from 'react';
import { useNavigate } from 'react-router';
import { Home2, ArrowLeft } from 'iconsax-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-base via-[#1a0525] to-base flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-fire via-light to-mid leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-mid/20 to-fire/20 blur-3xl"></div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-light mb-4">
          Page introuvable
        </h2>
        <p className="text-gray text-lg mb-8 max-w-md mx-auto">
          Oups ! La page que vous recherchez semble s'être perdue dans les étoiles mystiques d'Orinu.
        </p>

        {/* Illustration */}
        <div className="mb-8">
          <svg
            className="w-48 h-48 mx-auto opacity-50"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" stroke="#5C3B8A" strokeWidth="2" strokeDasharray="5,5" />
            <circle cx="100" cy="100" r="60" stroke="#E9D8FF" strokeWidth="2" opacity="0.5" />
            <circle cx="100" cy="100" r="40" stroke="#FF6B35" strokeWidth="2" opacity="0.3" />
            <path
              d="M100 40L105 55L120 60L105 65L100 80L95 65L80 60L95 55L100 40Z"
              fill="#E9D8FF"
            />
            <path
              d="M140 100L143 108L151 111L143 114L140 122L137 114L129 111L137 108L140 100Z"
              fill="#FF6B35"
            />
            <path
              d="M60 100L63 108L71 111L63 114L60 122L57 114L49 111L57 108L60 100Z"
              fill="#E9D8FF"
            />
          </svg>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition"
          >
            <ArrowLeft size={20} color="#E9D8FF" />
            <span className="text-light">Retour</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fire to-light text-black font-semibold rounded-full hover:shadow-lg transition"
          >
            <Home2 size={20} color="#000000" variant="Bold" />
            <span>Accueil</span>
          </button>
        </div>

        {/* Fun fact */}
        <div className="mt-12 glass rounded-xl p-6 max-w-md mx-auto">
          <p className="text-sm text-gray italic">
            💡 Saviez-vous que "404" signifie "Not Found" dans le protocole HTTP ?
            Mais ici, c'est juste un Orinu qui s'est égaré !
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
