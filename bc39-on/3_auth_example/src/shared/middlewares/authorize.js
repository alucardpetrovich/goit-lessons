const { Unauthorized, Forbidden, Gone } = require("http-errors");
const { TOKEN_TYPES } = require("../constants");
const { asyncWrapper } = require("./async-wrapper");
const { verifyJwt } = require("../jwt-verify");
const {
  revokedTokensRepository,
} = require("../../modules/auth/revoked-tokens.repository");

exports.authorize = (...permissions) => {
  return asyncWrapper(async (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");

    let payload = verifyJwt(token);
    if (payload.type !== TOKEN_TYPES.ACCESS) {
      throw new Unauthorized();
    }
    const isRevoked = await revokedTokensRepository.isRevoked(payload.pairId);
    if (isRevoked) {
      throw new Gone("Token is revoked");
    }

    const hasUserPermission = checkPermissions(payload, permissions);
    if (!hasUserPermission) {
      throw new Forbidden("Action is not allowed");
    }

    req.userId = payload.userId;
    next();
  });
};

function checkPermissions(payload, permissions) {
  if (permissions.length === 0) {
    return true;
  }

  const userPermissions = payload.permissions || [];

  return permissions.some((perm) => userPermissions.includes(perm));
}
