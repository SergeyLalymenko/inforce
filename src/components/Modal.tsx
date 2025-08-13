import { useEffect } from 'react';
import type { ReactNode } from 'react';

type PropsType = {
    children: ReactNode;
    title: string;
    isOpen: boolean;
    onClose: () => void;
};

function Modal({ children, title, isOpen, onClose }: PropsType) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-800/50 px-4" onMouseDown={onClose}>
            <div
                className="relative w-full max-w-xl max-h-[90vh] overflow-auto rounded bg-zinc-700 p-4 shadow transition-all"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="flex gap-4 items-center justify-between">
                    <div className="text-xl font-semibold">{title}</div>
                    <p className="cursor-pointer" onClick={onClose}>
                        ✕
                    </p>
                </div>
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
