import { stripHtmlTags } from '../strip-html-tags';

type stripHtmlTagsTestCaseType = {
  testCase: string;
  input: string | { text: string } | undefined;
  expected: string;
};

const stripHtmlTagsTestCases: stripHtmlTagsTestCaseType[] = [
  {
    testCase: 'should return an empty string when input is undefined',
    input: undefined,
    expected: ''
  },
  {
    testCase: 'should return an empty string when input is null',
    input: undefined,
    expected: ''
  },
  {
    testCase: 'should return the input string without HTML tags',
    input: '<p>Hello, World!</p>',
    expected: 'Hello, World!'
  },
  {
    testCase: 'should handle nested HTML tags',
    input: '<div><p>Hello, <strong>World</strong>!</p></div>',
    expected: 'Hello, World!'
  },
  {
    testCase: 'should return the input without modification if there are no HTML tags',
    input: 'Just plain text.',
    expected: 'Just plain text.'
  },
  {
    testCase: 'should strip HTML tags when input is an object with text',
    input: { text: '<h1>Title</h1>' },
    expected: 'Title'
  },
  {
    testCase: 'should handle input with multiple HTML tags and spaces',
    input: '<p>   <a href="#">Link</a> and <span>more text</span>   </p>',
    expected: '   Link and more text   '
  }
];

describe('stripHtmlTags', () => {
  it.each(stripHtmlTagsTestCases)('$testCase', ({ input, expected }: stripHtmlTagsTestCaseType) => {
    expect(stripHtmlTags(input)).toBe(expected);
  });
});
