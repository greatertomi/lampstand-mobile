import { formatTime } from '../formatTime';

type FormatTimeTestTypes = {
  testCase: string;
  value: number;
  expected: string;
};

const successTestCases: FormatTimeTestTypes[] = [
  { testCase: 'it should format 60 seconds as 00:01', value: 60, expected: '00:01' },
  { testCase: 'it should format 10 seconds as 00:00', value: 10, expected: '00:00' },
  { testCase: 'it should format 0 seconds as 00:00', value: 0, expected: '00:00' },
  { testCase: 'it should format 125 seconds as 00:02', value: 125, expected: '00:02' },
  { testCase: 'it should format 59 seconds as 00:00', value: 59, expected: '00:01' },
  { testCase: 'it should format 74_040 seconds as 20:34', value: 74_040, expected: '20:34' },
  { testCase: 'it should format 86_400 seconds as 24:00', value: 86_400, expected: '24:00' },
  { testCase: 'it should return 00:00 for negative values', value: -10, expected: '00:00' },
  { testCase: 'it should return 00:00 for negative values', value: -60, expected: '00:00' }
];

const errorTestCase = {
  testCase: 'it should throw an error for 90_000 seconds (more than 24h)',
  value: 90_000,
  expected: 'Invalid time: hours must be 24 or less'
};

describe('formatTime', () => {
  it.each(successTestCases)('$testCase', ({ value, expected }: FormatTimeTestTypes) => {
    expect(formatTime(value)).toBe(expected);
  });

  it(errorTestCase.testCase, () => {
    expect(() => formatTime(errorTestCase.value)).toThrow(errorTestCase.expected);
  });
});
