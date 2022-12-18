import React from 'react';

/** This is kinda ugly, isn't it, maybe make it absolute import? */

/** RESOLUTION: configure tsconfig.json for IDE recognition and vite.config.js for compilation */
import { NstButton } from '@/components';
import { useLocalStorageState } from '@/hooks';
import { CountdownMenu } from '../countdownMenu';

/**
 * Counter is an example of a simple business logic of a click-up counter.
 * ```
 * Click > increments counter.
 * ```
 *
 * Requirements:
 * - Make the counter countdown from 30s by default.
 * - The countdown starts/pauses on click.
 * - Persist the current count in local so that it stays after refreshes.
 * - Redesign it in a user-friendly way so that it can reset when paused/finished.
 *
 * **BONUS POINT 🎁**: Make this default countdown customisable.
 *
 * **BONUS BONUS POINT 🏎**: Add a little animation for the count down, to your liking.
 */

const DEFAULT_COUNT = 30;

export const Countdown = () => {
  const [count, setCount] = useLocalStorageState('countdown', DEFAULT_COUNT);
  const intervalRef = React.useRef<number>();

  const startCountingDown = () => {
    if (count < 1) {
      setCount(DEFAULT_COUNT);
    }

    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        const newCount = prev - 1;

        if (newCount < 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = undefined;
        }

        return newCount;
      });
    }, 1000);
  };

  const stopCountingDown = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  };

  const toggleCountingDown = () => {
    if (!intervalRef.current) {
      startCountingDown();
    } else {
      stopCountingDown();
    }
  };

  /** How to make this button accept all <button />-related props. */
  return (
    <div className="flex items-center gap-4">
      <NstButton onClick={toggleCountingDown}>count is {count}</NstButton>
      <CountdownMenu
        onStart={() => {
          if (!intervalRef.current) {
            startCountingDown();
          }
        }}
        onPause={stopCountingDown}
        onDouble={() => setCount((prev) => prev * 2)}
      />
    </div>
  );
};
