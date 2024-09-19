import { findClosestPath } from '../index';

type pathCasesTypes = {
  testCase: string;
  path: string;
  possiblePaths: string[];
  expected: string | null;
};

const pathCases: pathCasesTypes[] = [
  {
    testCase: 'returns exact match for a book chapter',
    path: 'chapter2',
    possiblePaths: ['chapter1', 'chapter2', 'chapter3'],
    expected: 'chapter2'
  },
  {
    testCase: 'returns the closest match when a chapter is mistyped',
    path: 'chpater2',
    possiblePaths: ['chapter1', 'chapter2', 'chapter3'],
    expected: 'chapter2'
  },
  {
    testCase: 'returns closest match when searching for book section',
    path: 'summ',
    possiblePaths: ['introduction', 'contents', 'summary'],
    expected: 'summary'
  },
  {
    testCase: 'returns null when no chapters or sections is available',
    path: 'chapter1',
    possiblePaths: [],
    expected: null
  },
  {
    testCase: 'returns the closest match for paths with different lengths',
    path: 'harrypottr',
    possiblePaths: ['harrypotter', 'lordoftherings', 'thehobbit'],
    expected: 'harrypotter'
  },
  {
    testCase: 'handle case sensitivity',
    path: 'harrypotter',
    possiblePaths: ['HarryPotter', 'TheHobbit', 'LordOfTheRings'],
    expected: 'HarryPotter'
  },
  {
    testCase: 'returns the closest match for chapter numbers',
    path: 'chapter9',
    possiblePaths: ['chapter10', 'chapter11', 'chapter12'],
    expected: 'chapter10'
  },
  {
    testCase: 'handles extra characters',
    path: 'prologues',
    possiblePaths: ['prologue', 'epilogue', 'foreword'],
    expected: 'prologue'
  },
  {
    testCase: 'returns closest match with similar names',
    path: 'introdctn',
    possiblePaths: ['introduction', 'intro', 'conclusion'],
    expected: 'introduction'
  }
];

describe('find-closest-path', () => {
  it.each(pathCases)('$testCase', ({ path, possiblePaths, expected }: pathCasesTypes) => {
    expect(findClosestPath(path, possiblePaths)).toBe(expected);
  });
});
