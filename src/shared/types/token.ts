const TOKEN_KEY = 'access_token';

export const localStorageToken = {
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY) ?? null;
  },

  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },
};
