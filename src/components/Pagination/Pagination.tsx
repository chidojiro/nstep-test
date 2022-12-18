import React from 'react';
import { usePagination, UsePaginationProps, UsePaginationReturn } from '@/hooks';
import { PaginationItems } from './PaginationItems';

export type PaginationProps = UsePaginationProps & Omit<JSX.IntrinsicElements['div'], 'onChange'>;

type PaginationProviderValue = UsePaginationReturn;

export const PaginationContext = React.createContext<PaginationProviderValue>({
  items: [],
  showingRange: { from: 0, to: 0, total: 0 },
});

export const Pagination = ({
  children,
  totalCount,
  centerItemsCount = 3,
  onChange,
  page,
  perPage,
  sideItemsCount = 3,
  ...restProps
}: PaginationProps) => {
  const usePaginationReturn = usePagination({
    totalCount,
    centerItemsCount,
    onChange,
    page,
    perPage,
    sideItemsCount,
  });

  const providerValue = React.useMemo(() => usePaginationReturn, [usePaginationReturn]);

  if (totalCount <= perPage) return null;

  if (!children)
    return (
      <PaginationContext.Provider value={providerValue}>
        <PaginationItems {...restProps} />
      </PaginationContext.Provider>
    );

  return <PaginationContext.Provider value={providerValue}>{children}</PaginationContext.Provider>;
};

Pagination.Items = PaginationItems;
