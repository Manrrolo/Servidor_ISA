const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
  if (!ctx.request.header.authorization) {
    ctx.throw(403, 'No token.');
  }
  const token = ctx.request.header.authorization.split(' ')[1];
  try {
    const multer = require('koa-multer');
    const upload = multer({ dest: 'uploads/' });
    await upload.single('file');
    console.log(ctx.request.file);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.request.header = decoded;
  } catch (err) {
    ctx.throw(err.status || 403, err.text);
  }
  await next();
};
