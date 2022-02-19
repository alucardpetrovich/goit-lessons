const { Unauthorized, Forbidden } = require("http-errors");
const jwt = require("jsonwebtoken");
const { getConfig } = require("../config");

exports.authorize = (...permissions) => {
  return (req, res, next) => {
    // 1. get token from request +
    // 2. verify JWT token +
    // 3. throw 401 if verification failed +
    // 4. check permissions +
    // 5. if user does not have one of permissions - throw 403 error +
    // 6. set req.userId with info from JWT-token +
    // 7. call next +

    const authHeader = req.headers["authorization"] || "";
    const token = authHeader.replace("Bearer ", "");

    let payload;
    const config = getConfig();
    try {
      payload = jwt.verify(token, config.jwt.secret);
    } catch (err) {
      throw new Unauthorized();
    }

    const hasPermission = checkPermissions(payload.permissions, permissions);
    if (!hasPermission) {
      throw new Forbidden();
    }

    req.userId = payload.uid;
    next();
  };
};

function checkPermissions(tokenPermissions, requiredPermissions) {
  let hasPermission = false;
  if (!requiredPermissions.length) {
    return true;
  }

  requiredPermissions.forEach((perm) => {
    if (tokenPermissions.includes(perm)) {
      hasPermission = true;
    }
  });

  return hasPermission;
}
