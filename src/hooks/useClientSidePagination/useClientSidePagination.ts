import React from 'react';

export type UseClientSidePaginationProps<T> = {
  page: number;
  perPage: number;
  data: T[];
};

export const useClientSidePagination = <T>({
  data,
  page,
  perPage,
}: UseClientSidePaginationProps<T>) => {
  if (perPage < 1) throw new Error(`Invalid perPage prop! (${perPage})`);

  const totalCount = data.length;

  const maxPage = Math.ceil(data.length / perPage);

  if (page < 1) throw new Error(`Invalid page prop! (${page})`);

  return React.useMemo(
    () => ({
      data: data.slice((page - 1) * perPage, page * perPage),
      page,
      maxPage,
      totalCount,
    }),
    [data, maxPage, page, perPage, totalCount],
  );
};
