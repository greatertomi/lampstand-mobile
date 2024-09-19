import { create, Mutate, StoreApi, UseBoundStore } from 'zustand';
import { act } from '@testing-library/react-hooks';
import { AuthState, createAuthSlice } from '../createAuthSlice';
import { User } from '../../../types';

const mockUser: User = {
  id: '9d3ef89e28dj0wk21',
  fullName: 'John Doe',
  emailAddress: 'johndoe@example.com'
};

const createStoreWithAuthSlice = () =>
  create<AuthState>((set, get, store) => ({
    ...createAuthSlice(set, get, store)
  }));

describe('Auth State', () => {
  let useAuthStore: UseBoundStore<Mutate<StoreApi<AuthState>, []>>;

  beforeEach(() => {
    useAuthStore = createStoreWithAuthSlice();
  });

  it('should initialize with null user and token and isAuthenticated false', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should set the user correctly', () => {
    act(() => {
      useAuthStore.getState().setUser(mockUser);
    });
    expect(useAuthStore.getState().user).toEqual(mockUser);
  });

  it('should set the token correctly', () => {
    const token = 'mock-token';
    act(() => {
      useAuthStore.getState().setToken(token);
    });
    expect(useAuthStore.getState().token).toBe(token);
  });

  it('should set isAuthenticated correctly', () => {
    act(() => {
      useAuthStore.getState().setIsAuthenticated(true);
    });
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it('should allow resetting user and token to null', () => {
    act(() => {
      useAuthStore.getState().setUser(null);
      useAuthStore.getState().setToken(null);
    });
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });
});
