import { toString } from 'lodash';

export const uniqueId = (seed: Array<unknown>) => {
  return toString(seed.length + Math.random());
};
