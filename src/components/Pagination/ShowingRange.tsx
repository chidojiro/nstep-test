import React from 'react';
import { PaginationContext } from './Pagination';

type PaginationShowingRangeProps = JSX.IntrinsicElements['div'];

export const ShowingRange = ({ ...restProps }: PaginationShowingRangeProps) => {
  const { showingRange } = React.useContext(PaginationContext);

  return (
    <div {...restProps}>
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{showingRange.from}</span> to{' '}
        <span>{showingRange.to}</span> of <span>{showingRange.total}</span> results
      </p>
    </div>
  );
};
