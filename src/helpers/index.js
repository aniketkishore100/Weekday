export const isNonEmptyString = (str) =>
  str && str != null && typeof str === 'string' && str.length > 0;

export const isNonEmptyArray = (arr) => {
  if (typeof arr === 'object' && arr instanceof Array && arr?.length > 0) return true;

  return false;
};