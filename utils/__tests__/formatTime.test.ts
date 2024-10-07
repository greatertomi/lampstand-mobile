import { formatTime } from '../formatTime';

type FormatTimeTestTypes = {
  testCase: string;
  value: number;
  expected: string;
};

const formatTimeTestCases: FormatTimeTestTypes[] = [
  { testCase: 'it should format 60 minutes as 1hr ', value: 60, expected: '01:00' },
  { testCase: 'it should format 10 minutes as 10mins ', value: 10, expected: '00:10' },
  { testCase: 'it should format 0 minutes as 00:00', value: 0, expected: '00:00' },
  { testCase: 'it should format 125 minutes as 02:05', value: 125, expected: '02:05' },
  { testCase: 'it should format 59 minutes as 00:59', value: 59, expected: '00:59' },
  { testCase: 'it should format 360 minutes as 06:00', value: 360, expected: '06:00' },
  { testCase: 'it should format 1234 minutes as 20:34', value: 1234, expected: '20:34' },
  {
    testCase: 'it should throw an error for 1500 minutes',
    value: 1500,
    expected: 'Invalid time: hours must be 24 or less'
  },
  { testCase: 'it should format 1440 minutes as 24:00', value: 1440, expected: '24:00' },
  { testCase: 'it should return 00:00 for negative values', value: -10, expected: '00:00' },
  { testCase: 'it should return 00:00 for negative values', value: -60, expected: '00:00' }
];

describe('formatTime', () => {
  it.each(formatTimeTestCases)('$testCase', ({ value, expected }: FormatTimeTestTypes) => {
    if (expected.startsWith('Invalid')) {
      expect(() => formatTime(value)).toThrowError(expected);
    } else {
      expect(formatTime(value)).toBe(expected);
    }
  });
});
