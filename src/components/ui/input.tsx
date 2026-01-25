import '@/scss/ui/input.scss';

import type { InputHTMLAttributes } from 'react';

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { className, ...rest } = props;

  return <input className={`input ${className ?? ''}`} {...rest} />;
};
