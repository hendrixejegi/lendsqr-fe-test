import '@/scss/ui/button.scss';

import { useMemo } from 'react';

export const Button = ({
  children,
  variant,
  ...props
}: {
  children: React.ReactNode;
  variant: 'primary' | 'outlined' | 'ghost';
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, ...rest } = props;
  const variantClass = useMemo(() => {
    switch (variant) {
      case 'outlined':
        return 'button--outlined';
      case 'ghost':
        return 'button--ghost';
      default:
        return 'button--primary';
    }
  }, [variant]);

  return (
    <button
      className={`button ${variantClass} ${className ?? ''}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
};
