'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type InputOTPProps = {
  value: string;
  onChange: (val: string) => void;
  length?: number;
  className?: string;
};

export function InputOTP({
  value,
  onChange,
  length = 6,
  className,
}: InputOTPProps) {
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/[^0-9]/g, ''); // Only numbers
    if (val.length <= 1) {
      const newValue =
        value.substring(0, idx) + val + value.substring(idx + 1, length);
      onChange(newValue);

      // Move to next input if value entered
      if (val && idx < length - 1) {
        inputsRef.current[idx + 1]?.focus();
      }
    }
  };

  // Handle key navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {[...Array(length)].map((_, i) => (
        <input
          key={i}
          ref={el => { inputsRef.current[i] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]*"
          maxLength={1}
          className="w-10 h-10 border rounded text-center text-lg outline-none focus:ring-2 focus:ring-gold-500 transition"
          value={value[i] || ''}
          onChange={e => handleChange(e, i)}
          onKeyDown={e => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
}
