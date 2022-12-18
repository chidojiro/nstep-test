import { FruitApis } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

/**
 * The FruityVice API is a free API service that gives you all kinds of data on fruits: https://www.fruityvice.com/#1
 *
 * Let's implement a query that:
 * - Retrieve all fruits.
 *
 * Display this list in the main page in whatever design that you deem user-friendly.
 *
 * ***BONUS POINT 🎗***: make this list paginatable on the front-end by pages of 5.
 */
export const useFruits = () => {
  FruitApis.getList();
  const query = useQuery(['fruits'], () => FruitApis.getList(), { placeholderData: [] });

  return React.useMemo(() => query, [query]);
};
