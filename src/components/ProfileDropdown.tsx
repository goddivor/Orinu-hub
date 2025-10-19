import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Profile2User, Setting2, Message, Clock, LogoutCurve } from 'iconsax-react';
import { useAuth } from '../context/auth-context';
import { useToast } from '../context/toast-context';
import ConfirmationModal from './modals/confirmation-modal';
import type { ModalRef } from '../types/modal-ref';

const ProfileDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const { success } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const confirmModalRef = useRef<ModalRef>(null);
  const navigate = useNavigate();

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogoutClick = () => {
    setIsOpen(false);
    confirmModalRef.current?.open();
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
      success('Déconnexion réussie', 'À bientôt sur Orinu !');
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const menuItems = [
    {
      icon: Profile2User,
      label: 'Mon profil',
      onClick: () => {
        setIsOpen(false);
        navigate('/profile');
      }
    },
    {
      icon: Setting2,
      label: 'Paramètres',
      onClick: () => {
        setIsOpen(false);
        navigate('/settings');
      }
    },
    {
      icon: Message,
      label: 'Messages',
      onClick: () => {
        setIsOpen(false);
        navigate('/messages');
      }
    },
    {
      icon: Clock,
      label: 'Historique',
      onClick: () => {
        setIsOpen(false);
        navigate('/history');
      }
    }
  ];

  if (!user) return null;

  // Utiliser l'avatar Google si disponible, sinon avatar par défaut
  const avatarUrl = user.photoURL || undefined;
  const displayName = user.displayName || user.email?.split('@')[0] || 'Utilisateur';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 hover:border-light/50 transition focus:outline-none focus:ring-2 focus:ring-light/50"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback si l'image ne charge pas
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-fire to-light flex items-center justify-center"><span class="text-black font-bold text-lg">${displayName[0].toUpperCase()}</span></div>`;
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-fire to-light flex items-center justify-center">
            <span className="text-black font-bold text-lg">{displayName[0].toUpperCase()}</span>
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gradient-to-b from-mid/95 to-base/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-sm font-medium text-light truncate">{displayName}</p>
            <p className="text-xs text-gray truncate">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-text hover:bg-white/10 transition"
              >
                <item.icon size={20} color="#E9D8FF" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-white/10">
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-fire hover:bg-fire/10 transition"
            >
              <LogoutCurve size={20} color="#FF6B35" />
              <span className="text-sm font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        ref={confirmModalRef}
        type="danger"
        title="Déconnexion"
        message="Êtes-vous sûr de vouloir vous déconnecter ?"
        description="Vous devrez vous reconnecter pour accéder à votre compte."
        confirmText="Oui, déconnecter"
        cancelText="Annuler"
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default ProfileDropdown;
