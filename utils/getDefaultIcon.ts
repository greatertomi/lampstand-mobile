import { toSvg, JdenticonConfig } from 'jdenticon';

type GetDefaultIconPrams = {
  size: number;
  id?: string;
  jdenticonConfig?: JdenticonConfig;
};

export const getDefaultIcon = ({ id, size, jdenticonConfig }: GetDefaultIconPrams): string =>
  toSvg(id, size, jdenticonConfig);
