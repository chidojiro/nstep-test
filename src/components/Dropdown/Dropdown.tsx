/**
 * Dropdown presents a list of items that users can choose to trigger a specific action with.
 * It is an organism that should be built on top of Popover as a molecule 🧱.
 *
 * Requirements:
 * - It must have all the functionalities of a Popover
 * - It must display a list of similarly-designed items, with each item individually capable of triggering
 * at least its own `onClick` independently
 * - Clicking/tapping on the item closes the dropdown automatically, but make this feature turn-off-able.
 *
 * **BONUS POINT 🍓**: Add a way to make multi-level dropdown, where a dropdown item also shows a dropdown on hover.
 *
 * **BONUS BONUS POINT 🥑**: Make it WCAG compliant.
 * > Good place to start: https://a11y-guidelines.orange.com/en/web/components-examples/dropdown-menu/
 */

import { useDisclosure } from '@/hooks';
import { Children, ClassName, Merge } from '@/types';
import clsx from 'clsx';
import React, { Ref } from 'react';
import { NstExtendable, NstExtendableProps } from '../Extendable';
import { NstDropdownItem } from './DropdownItem';
import { DropdownProvider, NstDropdownProviderValue } from './DropdownProvider';

type NstDropdownOwnProps = Children &
  ClassName & {
    ref?: Ref<HTMLDivElement>;
  };

export type NstDropdownProps = Merge<NstExtendableProps, NstDropdownOwnProps>;

export const NstDropdown = ({
  children,
  placement = 'bottom-start',
  open: openProp,
  onClose,
  className,
  ...restProps
}: NstDropdownProps) => {
  const isControlled = openProp !== undefined;

  const isOpenDisclosure = useDisclosure();

  const isOpen = openProp ?? isOpenDisclosure.isOpen;

  const handleClose = React.useCallback(() => {
    if (isControlled) {
      onClose?.();
    } else {
      isOpenDisclosure.close();
    }
  }, [isControlled, isOpenDisclosure, onClose]);

  React.useEffect(() => {
    const navigateWithKeyboard = (e: KeyboardEvent) => {
      if (!isOpen) {
        return;
      }

      const element = e.target as HTMLButtonElement;

      switch (e.code) {
        case 'ArrowUp': {
          const previousSibling = element?.previousElementSibling as HTMLButtonElement;

          if (!previousSibling) return;

          previousSibling.focus();
          previousSibling.scrollIntoView({ block: 'nearest' });

          return;
        }
        case 'ArrowDown': {
          const nextSibling = element?.nextElementSibling as HTMLButtonElement;

          if (!nextSibling) return;

          nextSibling.focus();
          nextSibling.scrollIntoView({ block: 'nearest' });

          return;
        }
        case 'Tab':
        case 'Enter':
          e.preventDefault();
          e.stopPropagation();

          element.click();

          onClose?.();
          return;
        default:
          return;
      }
    };

    document.addEventListener('keyup', navigateWithKeyboard);

    return () => document.removeEventListener('keyup', navigateWithKeyboard);
  }, [onClose, isOpen]);

  const providerValue = React.useMemo<NstDropdownProviderValue>(
    () => ({
      onClose: handleClose,
    }),
    [handleClose],
  );

  return (
    <NstExtendable
      placement={placement}
      open={isOpen}
      onClose={handleClose}
      onToggle={isOpenDisclosure.toggle}
      {...restProps}
    >
      {({ triggerElement }) => (
        <DropdownProvider value={providerValue}>
          <div
            className={clsx(
              'dropdown__content',
              'rounded',
              'bg-white',
              'shadow',
              'animate-fade-in animate-expand',
              className,
            )}
            style={{ minWidth: triggerElement?.clientWidth }}
          >
            {children}
          </div>
        </DropdownProvider>
      )}
    </NstExtendable>
  );
};

NstDropdown.Item = NstDropdownItem;
