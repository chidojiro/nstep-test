export type ClassName = {
  className?: string;
};

export type Children = {
  children?: React.ReactNode;
};

export type OpenClose = {
  open?: boolean;
  defaultOpen?: boolean;
  onClose?: () => void;
};

export type Option<TValue = string> = { label: string; value: TValue };
