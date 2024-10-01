/* eslint-disable @typescript-eslint/no-explicit-any */

import { createDefaultFormValues } from '../createDefaultFormValues';

type TestCasesTypes = {
  value: any;
  expected: object;
  testCase: string;
};

type ExpectedType = Omit<TestCasesTypes, 'testCase'>;

const testCases: TestCasesTypes[] = [
  {
    value: '',
    expected: {},
    testCase: 'should return an empty object {} when no input is provided'
  },
  {
    value: {
      name: 'Isaac',
      age: 18,
      isActive: true,
      email: null
    },
    expected: {
      name: 'Isaac',
      age: 18,
      isActive: false,
      email: ''
    },
    testCase: 'should return default values for mixed types'
  }
];

describe('createDefaultFormValues', () => {
  it.each(testCases)('$testCase', ({ value, expected }: ExpectedType) => {
    const response = createDefaultFormValues(value);
    expect(response).toEqual(expected);
  });
});
