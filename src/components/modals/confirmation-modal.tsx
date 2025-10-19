// src/components/modals/confirmation-modal.tsx
import { forwardRef, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
import { Trash, Warning2, CloseCircle } from "iconsax-react";
import Button from "../actions/button";
import type { ModalRef } from "../../types/modal-ref";

interface ConfirmationModalProps {
  title?: string;
  message?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmationModal = forwardRef<ModalRef, ConfirmationModalProps>(
  (
    {
      title = "Êtes-vous sûr ?",
      message = "Cette action ne peut pas être annulée.",
      description,
      confirmText = "Confirmer",
      cancelText = "Annuler",
      type = "danger",
      onConfirm,
      onCancel,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    const handleConfirm = () => {
      onConfirm?.();
      setIsOpen(false);
    };

    const handleCancel = () => {
      onCancel?.();
      setIsOpen(false);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleCancel();
      }
    };

    if (!isOpen) return null;

    const getTypeConfig = () => {
      switch (type) {
        case 'danger':
          return {
            icon: <Trash size={28} color="#FF6B35" variant="Bold" />,
            iconBg: 'bg-fire/20',
            confirmBg: 'bg-gradient-to-r from-fire to-fire/80 hover:shadow-lg hover:shadow-fire/30',
            borderColor: 'border-fire/30',
          };
        case 'warning':
          return {
            icon: <Warning2 size={28} color="#FFB800" variant="Bold" />,
            iconBg: 'bg-yellow-500/20',
            confirmBg: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:shadow-lg hover:shadow-yellow-500/30',
            borderColor: 'border-yellow-500/30',
          };
        case 'info':
          return {
            icon: <CloseCircle size={28} color="#E9D8FF" variant="Bold" />,
            iconBg: 'bg-light/20',
            confirmBg: 'bg-gradient-to-r from-light to-light/80 hover:shadow-lg hover:shadow-light/30',
            borderColor: 'border-light/30',
          };
        default:
          return {
            icon: <Warning2 size={28} color="#BDB4C7" variant="Bold" />,
            iconBg: 'bg-gray/20',
            confirmBg: 'bg-gradient-to-r from-gray to-gray/80 hover:shadow-lg hover:shadow-gray/30',
            borderColor: 'border-gray/30',
          };
      }
    };

    const typeConfig = getTypeConfig();

    const modalContent = (
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-gradient-to-b from-mid/95 to-base/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden border border-white/10 animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className={`p-6 border-b ${typeConfig.borderColor}`}>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${typeConfig.iconBg} border border-white/10`}>
                {typeConfig.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-light">
                  {title}
                </h3>
                <p className="text-sm text-gray mt-1">
                  {message}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          {description && (
            <div className="p-6">
              <p className="text-sm text-text leading-relaxed">
                {description}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="p-6 bg-base/30 flex items-center justify-end space-x-3">
            <Button
              onClick={handleCancel}
              className="px-5 py-2.5 border border-white/20 text-light hover:bg-white/10 rounded-lg transition-all"
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleConfirm}
              className={`px-5 py-2.5 text-black font-semibold rounded-lg transition-all ${typeConfig.confirmBg}`}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  }
);

ConfirmationModal.displayName = 'ConfirmationModal';

export default ConfirmationModal;