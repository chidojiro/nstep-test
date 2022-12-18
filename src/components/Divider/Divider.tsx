import { ClassName } from '@/types';
import clsx from 'clsx';

export type DividerProps = ClassName & {
  direction?: 'horizontal' | 'vertical';
};

export const Divider = ({ direction = 'horizontal', className }: DividerProps) => {
  return (
    <div
      className={clsx(
        'w-full',
        'border-gray-300',
        { 'border-b': direction === 'horizontal', 'border-l': direction === 'vertical' },
        className,
      )}
    ></div>
  );
};
