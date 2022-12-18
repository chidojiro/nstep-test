/**
 * Popovers & Dropdowns are in a family of dynamic components whose position depends on the elements that *trigger* them,
 * since they are usually absolutely/fixed positioned *right next* to where the user just interacts 🎆.
 *
 * Positioning these dynamic elements is not trivial. Luckily, [popperJS](https://popper.js.org) takes care of that for you
 * quite easily 👍.
 *
 * Let's make a reusable component called Extendable that will takes care of popper-js integrations that will be the
 * atom for both Popover & Dropdown to build on top of 🎩.
 *
 * Requirements:
 * - It could be attached to any element.
 * - It stays on top of all other elements on the page to ensure that its content is visible.
 *
 * **BONUS POINT 💤**: Don't use z-index, z-index war is no fun for anyone.
 *
 * **BONUS BONUS POINT 💗**: Popper-js already takes care of 90% of a11y & responsiveness for you, except for one case:
 * - If the size of the trigger changes, what happens?
 */

import { useDisclosure, useOnEventOutside } from '@/hooks';
import { OpenClose } from '@/types';
import { isHTMLElement } from '@/utils';
import React, { useCallback, useState } from 'react';
import { PopperProps, usePopper } from 'react-popper';
import { Portal } from '../Portal';
import useResizeObserver from '@react-hook/resize-observer';

export type NstExtendablePlacement = PopperProps<any>['placement'];

export type NstExtendableProps = Omit<OpenClose, 'defaultOpen'> & {
  placement?: NstExtendablePlacement;
  trigger: React.ReactElement;
  offset?: [number, number];
  children?:
    | React.ReactNode
    | ((props: { triggerElement: Element | undefined }) => React.ReactNode);
  usePortal?: boolean;
  closeOnClickOutside?: boolean;
};

export const NstExtendable = ({
  children,
  /**
   * trigger if is a react component must forward ref to an html node
   */
  trigger,
  placement = 'bottom-start',
  offset = [0, 8],
  open: openProp,
  onClose,
  usePortal = true,
  closeOnClickOutside = true,
}: NstExtendableProps) => {
  const isControlled = openProp !== undefined;

  const [triggerElement, setTriggerElement] = useState<HTMLElement>();
  const [mainContentElement, setMainContentElement] = useState<HTMLDivElement | null>(null);

  const isOpenDisclosure = useDisclosure();

  const isOpen = openProp ?? isOpenDisclosure.isOpen;

  const handleClose = useCallback(() => {
    if (isControlled) {
      onClose?.();
    } else {
      isOpenDisclosure.close();
    }
  }, [isControlled, isOpenDisclosure, onClose]);

  const { styles, attributes, forceUpdate } = usePopper(
    isHTMLElement(trigger) ? (trigger as any) : triggerElement,
    mainContentElement,
    {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset,
          },
        },
      ],
    },
  );

  console.error = (e) => {
    if (e.toString().includes('flushSync')) return '';

    return e;
  };

  React.useLayoutEffect(() => {
    const handleClick = () => {
      if (!isControlled) {
        isOpenDisclosure.toggle();
      }
    };

    triggerElement?.addEventListener('click', handleClick);

    return () => triggerElement?.removeEventListener('click', handleClick);
  }, [isControlled, isOpenDisclosure, triggerElement]);

  const clonedTrigger = React.useMemo(() => {
    return React.Children.map(trigger, (child) =>
      React.cloneElement(child, {
        ref: (node: HTMLElement) => {
          if (!node)
            throw new Error(
              'Cannot find the element for the trigger, you probably forgot to forward ref in your trigger component!',
            );

          setTriggerElement(node);

          // Call the original ref, if any
          const { ref } = child as any;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref !== null) {
            ref.current = node;
          }
        },
      }),
    );
  }, [trigger]);

  useOnEventOutside(
    'click',
    closeOnClickOutside && isOpen && [mainContentElement, triggerElement as any],
    handleClose,
  );

  React.useLayoutEffect(() => {
    const handleCloseOnEsc = (e: KeyboardEvent) => {
      console.log(e.code);
      if (e.code === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keyup', handleCloseOnEsc);

    return () => window.removeEventListener('keyup', handleCloseOnEsc);
  }, [handleClose, isOpen]);

  const renderChildren = () => {
    if (!isOpen) return null;

    return typeof children === 'function' ? children({ triggerElement }) : children;
  };

  const mainContent = (
    <div
      ref={(element) => setMainContentElement(element)}
      style={{
        ...styles.popper,
      }}
      {...attributes.popper}
    >
      {renderChildren()}
    </div>
  );

  useResizeObserver(triggerElement!, () => forceUpdate?.());

  return (
    <>
      {clonedTrigger}
      {usePortal ? <Portal>{mainContent}</Portal> : mainContent}
    </>
  );
};
