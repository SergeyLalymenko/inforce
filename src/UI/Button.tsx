import type { ReactNode } from 'react';
import mergeClasses from '@/utils/mergeClasses';

type PropsType = {
    children: ReactNode;
    variant?: 'primary' | 'success' | 'delete';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
};

const sizeStyles = {
    sm: 'text-sm p-2',
    md: 'text-base p-2',
    lg: 'text-lg p-3',
};

const variantStyles = {
    primary: {
        default: 'bg-blue-600 text-white',
        hover: 'hover:bg-blue-700',
        disabled: 'opacity-50',
        active: 'bg-blue-700',
    },
    success: {
        default: 'bg-green-700 text-white',
        hover: 'hover:bg-green-600',
        disabled: 'opacity-50',
        active: 'bg-green-600',
    },
    delete: {
        default: 'bg-red-700 text-white',
        hover: 'hover:bg-red-600',
        disabled: 'opacity-50',
        active: 'bg-red-600',
    },
};

function Button({
    children,
    variant = 'primary',
    size = 'md',
    onClick = () => {},
    type = 'button',
    disabled = false,
    className = '',
}: PropsType) {
    function getVariantStyles() {
        const stylesConfig = variantStyles[variant];
        return mergeClasses(stylesConfig.default, stylesConfig.hover, disabled && stylesConfig.disabled);
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={mergeClasses(
                'flex items-center rounded font-medium transition-colors duration-200 outline-none cursor-pointer',
                sizeStyles[size],
                getVariantStyles(),
                disabled && 'cursor-not-allowed',
                className
            )}
        >
            {children}
        </button>
    );
}

export default Button;
