import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import clsx from 'clsx';
import { Children, ClassName } from '@/types';
import React from 'react';
import { PaginationContext } from './Pagination';

type PaginationItemProps = ClassName & Children & { as?: any } & Record<string, any>;

const PaginationItem = ({ className, as: As = 'button', ...restProps }: PaginationItemProps) => {
  return (
    <As
      {...restProps}
      className={clsx(
        'relative inline-flex items-center px-4 py-2 text-sm font-medium bg-white',
        className,
      )}
    ></As>
  );
};

type PaginationItemsProps = JSX.IntrinsicElements['div'];

export const PaginationItems = ({ className, ...restProps }: PaginationItemsProps) => {
  const { items } = React.useContext(PaginationContext);

  return (
    <nav
      className={clsx('relative z-0 inline-flex -space-x-px rounded', className)}
      aria-label="Pagination"
      {...restProps}
    >
      {items.map(({ page, selected, type, onClick, disabled }, idx) => {
        if (type === 'previous')
          return (
            <PaginationItem
              disabled={disabled}
              className="flex items-center justify-center w-9 !p-0"
              key={type}
              onClick={onClick}
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft className="w-5 h-5" aria-hidden="true" />
            </PaginationItem>
          );

        if (type === 'next')
          return (
            <PaginationItem
              disabled={disabled}
              className="flex items-center justify-center w-9 !p-0"
              key={type}
              onClick={onClick}
            >
              <span className="sr-only">Next</span>
              <FaChevronRight className="w-5 h-5" aria-hidden="true" />
            </PaginationItem>
          );

        if (type === 'ellipsis')
          return (
            <PaginationItem as="span" key={idx}>
              ...
            </PaginationItem>
          );

        return (
          <PaginationItem
            key={page}
            aria-current={selected && 'page'}
            onClick={onClick}
            className={clsx('rounded-md', {
              'text-white !bg-rose-500': selected,
            })}
          >
            {page}
          </PaginationItem>
        );
      })}
    </nav>
  );
};
