import React from 'react';
import useKeydown from '../../hooks/use-keydown';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([
    {
      message: 'Something went wrong!',
      variant: 'error',
      id: crypto.randomUUID(),
    },
    {
      message: '17 photos uploaded',
      variant: 'success',
      id: crypto.randomUUID(),
    },
  ]);

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown('Escape', handleEscape);

  function createToast(message, variant) {
    const newToast = {
      message,
      variant,
      id: crypto.randomUUID(),
    };

    const nextToasts = [...toasts, newToast];
    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
