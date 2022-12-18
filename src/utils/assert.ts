import React from 'react';

export { isEqual, isFunction } from 'lodash-es';

export const isRef = <T = Element>(target: unknown): target is React.RefObject<T> =>
  Object.prototype.hasOwnProperty.call(target, 'current');

export const isHTMLElement = (data: any): data is HTMLElement => !!data?.tagName;
