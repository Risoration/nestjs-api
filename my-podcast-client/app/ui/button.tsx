import React, { ReactNode } from 'react';

type ButtonProps = {
  text?: string;
  children?: ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'reset' | 'button';
  isLoading?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
};

const variantClasses = {
  primary: 'bg-teal-600 hover:bg-teal-500 text-white',
  secondary: 'bg-violet-600 hover:bg-violet-500 text-white',
};

export default function Button({
  text,
  children,
  onClick,
  type = 'button',
  isLoading = false,
  className = '',
  variant = 'primary',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${variantClasses[variant]} rounded-md py-2 px-4 transition-colors duration-300 hover:cursor-pointer ${className}`}
    >
      {isLoading ? 'Loading...' : (text ?? children)}
    </button>
  );
}
