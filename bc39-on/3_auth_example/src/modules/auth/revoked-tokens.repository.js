const { getClient } = require("../../shared/redis-client");

class RevokedTokensRepository {
  #isRevokedValue = "1";
  #oneWeekInSecs = 7 * 24 * 60 * 60;

  get #client() {
    return getClient();
  }

  async setAsRevoked(pairId) {
    const key = this.#getKey(pairId);

    await this.#client.set(key, this.#isRevokedValue);
    await this.#client.expire(key, this.#oneWeekInSecs);
  }

  async isRevoked(pairId) {
    const key = this.#getKey(pairId);
    const res = await this.#client.get(key);

    return res === this.#isRevokedValue;
  }

  #getKey(pairId) {
    return `revoked-tokens:${pairId}`;
  }
}

exports.revokedTokensRepository = new RevokedTokensRepository();
