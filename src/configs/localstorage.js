class LocalStorage {
  tokenKey = "token"
  setToken(token = "") {
    localStorage.setItem(this.tokenKey,token)
  }
  getToken() {
    return localStorage.getItem(this.tokenKey)
  }
  resetAll() {
    localStorage.clear()
  }
}

export {
  LocalStorage
}