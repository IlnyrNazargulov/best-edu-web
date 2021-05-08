const ID_ACCESS_TOKEN_KEY = "access_token";
const ID_REFRESH_TOKEN_KEY = "refresh_token";
const ID_EMAIL_TOKEN_KEY = "email_token";

export const JwtService = {
  getAccessToken() {
    return window.localStorage.getItem(ID_ACCESS_TOKEN_KEY);
  },
  saveAccessToken(token) {
    window.localStorage.setItem(ID_ACCESS_TOKEN_KEY, token);
  },
  getRefreshToken() {
    return window.localStorage.getItem(ID_REFRESH_TOKEN_KEY);
  },
  saveRefreshToken(token) {
    window.localStorage.setItem(ID_REFRESH_TOKEN_KEY, token);
  },
  getEmailToken() {
    return window.localStorage.getItem(ID_EMAIL_TOKEN_KEY);
  },
  saveEmailToken(token) {
    window.localStorage.setItem(ID_EMAIL_TOKEN_KEY, token);
  },
  destroyRefreshToken() {
    window.localStorage.removeItem(ID_REFRESH_TOKEN_KEY);
  },
  destroyAccessToken() {
    window.localStorage.removeItem(ID_ACCESS_TOKEN_KEY);
  },
  destroyEmailToken() {
    window.localStorage.removeItem(ID_EMAIL_TOKEN_KEY);
  },
  destroyAllTokens() {
    this.destroyAccessToken();
    this.destroyRefreshToken();
    this.destroyEmailToken();
  },
};
