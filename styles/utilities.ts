const spaceUnit = 8;

const sizeUnit = (value: number) => value * spaceUnit;

export const utilities = {
  mt0: {
    marginTop: sizeUnit(0)
  },
  mt1: {
    marginTop: sizeUnit(1)
  },
  mt2: {
    marginTop: sizeUnit(2)
  },
  mt3: {
    marginTop: sizeUnit(3)
  },
  mt4: {
    marginTop: sizeUnit(4)
  },
  mt5: {
    marginTop: sizeUnit(5)
  }
} as const;
