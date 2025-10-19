// src/components/Toast.tsx
import React, { useEffect, useState } from "react";
import { useToast, type Toast as ToastType } from "../context/toast-context";
import { X } from "@phosphor-icons/react";
import { TickCircle, InfoCircle, Warning2, CloseCircle } from "iconsax-react";

interface ToastItemProps {
  toast: ToastType;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      removeToast(toast.id);
    }, 300); // Match animation duration
  };

  const getToastStyles = () => {
    const baseStyles =
      "flex items-start space-x-3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl";

    switch (toast.type) {
      case "success":
        return `${baseStyles} bg-gradient-to-r from-light/20 to-light/10 border-light/30 text-light`;
      case "error":
        return `${baseStyles} bg-gradient-to-r from-fire/20 to-fire/10 border-fire/30 text-light`;
      case "warning":
        return `${baseStyles} bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 border-yellow-500/30 text-light`;
      case "info":
        return `${baseStyles} bg-gradient-to-r from-mid/80 to-base/80 border-white/20 text-light`;
      default:
        return `${baseStyles} bg-gradient-to-r from-gray/20 to-gray/10 border-gray/30 text-light`;
    }
  };

  const getIcon = () => {
    const iconProps = { size: 22, variant: "Bold" as const };

    switch (toast.type) {
      case "success":
        return (
          <TickCircle
            color="#E9D8FF"
            {...iconProps}
            className="mt-0.5 flex-shrink-0"
          />
        );
      case "error":
        return (
          <CloseCircle
            color="#FF6B35"
            {...iconProps}
            className="mt-0.5 flex-shrink-0"
          />
        );
      case "warning":
        return (
          <Warning2
            color="#FFB800"
            {...iconProps}
            className="mt-0.5 flex-shrink-0"
          />
        );
      case "info":
        return (
          <InfoCircle
            color="#E9D8FF"
            {...iconProps}
            className="mt-0.5 flex-shrink-0"
          />
        );
      default:
        return (
          <InfoCircle
            color="#BDB4C7"
            {...iconProps}
            className="mt-0.5 flex-shrink-0"
          />
        );
    }
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-out
        ${
          isVisible && !isLeaving
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-full opacity-0 scale-95"
        }
        ${getToastStyles()}
        max-w-sm w-full
      `}
    >
      {getIcon()}

      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm leading-5">{toast.title}</h4>
        {toast.message && (
          <p className="text-sm text-gray mt-1 leading-relaxed">
            {toast.message}
          </p>
        )}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="text-sm font-medium text-fire underline mt-2 hover:text-light hover:no-underline transition-all"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        onClick={handleClose}
        className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Close notification"
      >
        <X size={18} className="text-light" weight="bold" />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} />
        </div>
      ))}
    </div>
  );
};
