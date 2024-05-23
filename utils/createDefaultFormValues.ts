/* eslint-disable @typescript-eslint/no-explicit-any */

type DefaultValue<T> = T extends Function ? never : T extends object ? { [K in keyof T]: DefaultValue<T[K]> } : T;

export const createDefaultFormValues = <T extends Record<string, any>>(data?: T): DefaultValue<T> => {
  if (!data) {
    return {} as DefaultValue<T>;
  }

  const result: any = {};

  Object.keys(data).forEach((key) => {
    if (data[key] !== null && typeof data[key] === 'object' && Object.prototype.hasOwnProperty.call(data, key)) {
      result[key] = createDefaultFormValues(data[key] as Record<string, unknown>);
    } else {
      result[key] = typeof data[key] === 'boolean' ? false : data[key] ?? '';
    }
  });

  return result as DefaultValue<T>;
};
