/**
  * This is the app Model it is decoupled from
  * the Entities used for the databse
*/
class Token {
  constructor({
    accessToken,
    expiresIn,
    tokenType,
  } = {}) {
    if (accessToken == null || typeof accessToken !== 'string') {
      throw new Error('accessToken should be a string');
    }
    if (tokenType == null || typeof tokenType !== 'string') {
      throw new Error('tokenType should be a string');
    }
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
    this.tokenType = tokenType;
  }
}

module.exports = Token;
