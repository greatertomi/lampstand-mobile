import { toSvg, JdenticonConfig } from 'jdenticon';

export const getDefaultIcon = (size: number, id?: string, jdenticonConfig?: JdenticonConfig): string =>
  toSvg(id, size, jdenticonConfig);
