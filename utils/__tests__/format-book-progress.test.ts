import { formatBookProgress } from '../index';

type progressCasesTypes = {
  testCase: string;
  value: number;
  expected: string | null;
};

const progressCases: progressCasesTypes[] = [
  { testCase: 'Should format progress as 10%', value: 0.1, expected: '10%' },
  { testCase: 'Should format progress as 25%', value: 0.25, expected: '25%' },
  { testCase: 'Should round progress to 100% (edge case)', value: 0.999, expected: '100%' },
  { testCase: 'Should format progress as 0%', value: 0, expected: '0%' },
  { testCase: 'Should format progress as 100% (full progress)', value: 1, expected: '100%' },
  { testCase: 'Should format negative progress as -10%', value: -0.1, expected: null },
  { testCase: 'Should format progress as 150%', value: 1.5, expected: null }
];

describe('formatBookProgress', () => {
  it.each(progressCases)('$testCase', ({ value, expected }: progressCasesTypes) => {
    expect(formatBookProgress(value)).toBe(expected);
  });
});
