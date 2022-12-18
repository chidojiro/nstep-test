import React from 'react';
import clsx from 'clsx';
import { useDropdownContext } from './DropdownProvider';

export type NstDropdownItemProps = JSX.IntrinsicElements['button'];

export const NstDropdownItem = React.forwardRef(
  (
    { className, value: valueProp, onClick, onMouseMove, ...restProps }: NstDropdownItemProps,
    ref: any,
  ) => {
    const { onClose } = useDropdownContext();

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      onClick?.(e);
      onClose?.();
    };

    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          'dropdown-item',
          'block',
          'w-full p-2',
          'flex items-center justify-center',
          'border-b border-gray-100 outline-none',
          'focus:bg-gray-50',
          className,
        )}
        onClick={handleClick}
        onMouseMove={(e) => {
          onMouseMove?.(e);
          (e.target as HTMLButtonElement).focus();
        }}
        data-value={valueProp}
        {...restProps}
      ></button>
    );
  },
);

NstDropdownItem.displayName = 'NstDropdownItem';
