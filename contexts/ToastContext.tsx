'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: ToastType = 'info') => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, type }]);

        // Auto-remover después de 4 segundos
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 4000);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Contenedor de toasts */}
            <div style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}>
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        onClick={() => removeToast(toast.id)}
                        style={{
                            background: toast.type === 'success' ? 'hsl(120, 70%, 40%)' :
                                toast.type === 'error' ? 'hsl(0, 70%, 50%)' :
                                    toast.type === 'warning' ? 'hsl(40, 90%, 50%)' :
                                        'hsl(210, 70%, 50%)',
                            color: 'white',
                            padding: '16px 24px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            cursor: 'pointer',
                            minWidth: '300px',
                            maxWidth: '500px',
                            animation: 'slideIn 0.3s ease-out',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '15px',
                            fontWeight: '500',
                        }}
                    >
                        <span style={{ fontSize: '20px' }}>
                            {toast.type === 'success' && '✓'}
                            {toast.type === 'error' && '✕'}
                            {toast.type === 'warning' && '⚠'}
                            {toast.type === 'info' && 'ℹ'}
                        </span>
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>

            <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}
