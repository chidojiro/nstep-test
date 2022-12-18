import { Merge } from '@/types';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export type NstButtonProps = Merge<
  JSX.IntrinsicElements['button'],
  {
    /**
     * Children is required on a button, at least either an icon or text.
     */
    children: ReactNode;
  }
>;

/**
 * This is a simple example of a button 🖱. Let's try to make it satisfy all the requirements we stated in the design system.
 *
 * You likely will run into a classic Tailwind problem here 😑.
 * >Feel free to use 3rd party library like [tailwind-merge](https://github.com/dcastil/tailwind-merge) if you want.
 */
export const NstButton = ({ className, type = 'button', ...restProps }: NstButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        'focusable',
        'px-4 py-2',
        'text-white',
        'bg-rose-500',
        'border-rose-500 rounded-lg',
        'shadow-sm',
        className,
      )}
      {...restProps}
    />
  );
};
