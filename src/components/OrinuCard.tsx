import React from 'react';
import { Eye, Heart } from 'iconsax-react';
import type { Orinu } from '../data/mockOrinus';

interface OrinuCardProps {
  orinu: Orinu;
}

const OrinuCard: React.FC<OrinuCardProps> = ({ orinu }) => {
  return (
    <div className="group relative bg-mid/20 rounded-xl overflow-hidden border border-white/10 hover:border-light/30 transition-all duration-300 hover:scale-[1.02]">
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={orinu.coverImage}
          alt={orinu.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs text-gray line-clamp-2">{orinu.description}</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-light mb-1 line-clamp-1">
          {orinu.title}
        </h3>
        <p className="text-xs text-gray mb-3">{orinu.author}</p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye size={14} color="#BDB4C7" />
              {orinu.views >= 1000 ? `${(orinu.views / 1000).toFixed(1)}k` : orinu.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={14} color="#FF6B35" />
              {orinu.likes >= 1000 ? `${(orinu.likes / 1000).toFixed(1)}k` : orinu.likes}
            </span>
          </div>
          <span className="text-light font-medium">{orinu.chapters} ch.</span>
        </div>
      </div>
    </div>
  );
};

export default OrinuCard;
