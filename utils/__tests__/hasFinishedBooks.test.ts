import { hasFinishedBook } from '../hasFinishedBook';

describe('hasFinishedBook', () => {
  test('returns true if percentage is >= 0.99, regardless of progress', () => {
    expect(hasFinishedBook(0.99, 0)).toBeTruthy();
    expect(hasFinishedBook(1, 0)).toBeTruthy();
    expect(hasFinishedBook(0.99, 1)).toBeTruthy();
  });

  test('returns true if progress is 1, regardless of percentage', () => {
    expect(hasFinishedBook(undefined, 1)).toBeTruthy();
    expect(hasFinishedBook(0, 1)).toBeTruthy();
    expect(hasFinishedBook(0.5, 1)).toBeTruthy();
  });

  test('returns false if percentage is < 0.99 and progress is not 1', () => {
    expect(hasFinishedBook(0.98, 0)).toBeFalsy();
    expect(hasFinishedBook(0.5, 0)).toBeFalsy();
    expect(hasFinishedBook(0, 0)).toBeFalsy();
    expect(hasFinishedBook(undefined, 0)).toBeFalsy();
  });

  test('returns false if progress is invalid (negative or > 1)', () => {
    expect(hasFinishedBook(undefined, -1)).toBeFalsy();
    expect(hasFinishedBook(0.99, -1)).toBeFalsy();
    expect(hasFinishedBook(undefined, 1.1)).toBeFalsy();
    expect(hasFinishedBook(undefined, 2)).toBeFalsy();
  });

  test('handles undefined percentage and progress correctly (defaults to 0)', () => {
    expect(hasFinishedBook(undefined, 0)).toBeFalsy();
    expect(hasFinishedBook(undefined, 1)).toBeTruthy();
    expect(hasFinishedBook()).toBeFalsy();
  });
});
