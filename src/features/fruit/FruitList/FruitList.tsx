import { Pagination } from '@/components';
import { useClientSidePagination } from '@/hooks';
import { useFruits } from '@/query/fruit';
import { ClassName } from '@/types';
import clsx from 'clsx';
import React from 'react';
import { FruitCard } from './FruitCard';

const FRUITS_PER_PAGE = 9;

export type FruitListProps = ClassName & {
  //
};

export const FruitList = ({ className }: FruitListProps) => {
  const [page, setPage] = React.useState(1);

  const fruitsQuery = useFruits();

  const { data: fruits, totalCount } = useClientSidePagination({
    data: fruitsQuery.data ?? [],
    page,
    perPage: FRUITS_PER_PAGE,
  });

  return (
    <div className={clsx('grid grid-cols-3 gap-4', className)}>
      {fruits.map((fruit) => (
        <FruitCard key={fruit.id} fruit={fruit} />
      ))}
      <Pagination
        onChange={setPage}
        page={page}
        totalCount={totalCount}
        perPage={FRUITS_PER_PAGE}
      />
    </div>
  );
};
