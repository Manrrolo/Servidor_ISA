const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
  if (!ctx.request.header.authorization) {
    ctx.throw(403, 'No token.');
  }
  const token = ctx.request.header.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.request.header = decoded;
    if (!decoded.admin) {
      ctx.throw('No cuenta con permiso de admin', 403);
    }
  } catch (err) {
    ctx.throw(err.status || 403, 'Error autorización');
  }
  await next();
};
