/**
 * Popover is a component display a *popper*, a small piece of info, when a user clicks or taps on what usually is a button.
 *
 * Let's make one that uses the Extendable as an atom ⚛️.
 *
 * Requirements:
 * - It must have all the functionalities of an Extendable
 * - It must be positioned **NEXT** to the triggering element, and the positioning could be customised.
 * - It must be mounted/unmounted from DOM completely instead of being visually hidden.
 * - Clicking/tapping on the trigger displays the popover.
 * - Clicking anywhere *outside* the popover closes it.
 * - It could be used standalone or controlled (*with/without external useState()*).
 * - The default trigger is a NstButton.
 *
 * **BONUS POINT 🎨**: Add a little transition where it fades in & out, and expand & shrink on mount/unmount (both from 90% -> 100%).
 *
 * **BONUS BONUS POINT 🦮**: Make it WCAG compliant.
 * > Good place to start: https://yale-a11y.gitlab.io/ui-component-library/tooltips-popovers
 *
 * Hint if you are not a11y-familiar: focus management is important to accessible users.
 */

import { Children, Merge } from '@/types';
import clsx from 'clsx';
import { NstExtendable, NstExtendableProps } from '../Extendable';

type NstPopoverOwnProps = Children;

export type NstPopoverProps = Merge<NstExtendableProps, NstPopoverOwnProps>;

export const NstPopover = ({
  children,
  placement = 'right-start',
  ...restProps
}: NstPopoverProps) => {
  return (
    <NstExtendable placement={placement} {...restProps}>
      <div
        className={clsx(
          'nst-popover__content',
          'p-3',
          'rounded',
          'bg-white',
          'shadow',
          'animate-fade-in animate-expand',
        )}
      >
        {children}
      </div>
    </NstExtendable>
  );
};
