const { getClient } = require("../../shared/redis-client");

class TwoFaCodesRepository {
  #codeExists = "1";
  #fiveMinutesInSecs = 5 * 60;

  get #client() {
    return getClient();
  }

  async setCode(userId, code) {
    const key = this.#getKey(userId, code);

    await this.#client.set(key, this.#codeExists);
    await this.#client.expire(key, this.#fiveMinutesInSecs);
  }

  async isCodeCorrect(userId, code) {
    const key = this.#getKey(userId, code);
    const res = await this.#client.get(key);

    return res === this.#codeExists;
  }

  async deleteCode(userId, code) {
    const key = this.#getKey(userId, code);
    await this.#client.del(key);
  }

  #getKey(userId, code) {
    return `2fa-codes:${userId}:${code}`;
  }
}

exports.twoFaCodesRepository = new TwoFaCodesRepository();
