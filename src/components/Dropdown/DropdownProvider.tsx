import { createContext } from '@/utils';

export type NstDropdownProviderValue = {
  onClose?: () => void;
};

const [DropdownProvider, useDropdownContext] = createContext<NstDropdownProviderValue>();

export { DropdownProvider, useDropdownContext };
