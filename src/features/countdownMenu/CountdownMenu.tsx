/**
 * This dropdown menu should opens up a dropdown with 3 options:
 * - Start/pause the countdown.
 * - Reset the countdown to the default number.
 * - Double the current countdown.
 *
 * It should have all the features of a basic dropdown & allow user to interact meaningfully with the countdown counter.
 *
 * **BONUS POINT 🙌**: Add an input in the dropdown that allows user to set the counter to whatever number they want.
 */

import { NstDropdown } from '@/components';
import { FaEllipsisV } from 'react-icons/fa';

export type CountdownMenuProps = {
  onStart: () => void;
  onPause: () => void;
  onDouble: () => void;
};

export const CountdownMenu = ({ onStart, onDouble, onPause }: CountdownMenuProps) => {
  return (
    <NstDropdown
      className="w-32"
      trigger={
        <button>
          <FaEllipsisV />
        </button>
      }
    >
      <NstDropdown.Item onClick={onStart}>Start</NstDropdown.Item>
      <NstDropdown.Item onClick={onPause}>Pause</NstDropdown.Item>
      <NstDropdown.Item onClick={onDouble}>Double</NstDropdown.Item>
    </NstDropdown>
  );
};
