import { Fruit } from '@/types';
import clsx from 'clsx';
import React from 'react';

export type FruitCardProps = {
  fruit: Fruit;
};

export const FruitCard = React.memo(({ fruit: { family, name, nutritions } }: FruitCardProps) => {
  const dataPieces = { family, ...nutritions };

  return (
    <div
      className={clsx('bg-white', 'h-[220px]', 'p-4', 'rounded border border-gray-300', 'shadow')}
    >
      <h3 className="mb-2 text-center">{name}</h3>
      {Object.entries(dataPieces).map(([label, value]) => (
        <p key={label}>
          <strong>{label}</strong>: {value}
        </p>
      ))}
    </div>
  );
});

FruitCard.displayName = 'FruitCard';
