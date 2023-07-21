const Router = require('koa-router');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { FaissStore } = require('langchain/vectorstores/faiss');
const multer = require('koa-multer');
const upload = multer({ dest: 'uploads/' });
const router = new Router();

router.get('files.list', '/', async (ctx) => {
  try {
    const token = ctx.request.header;
    if (token.admin) {
      const matches = await ctx.orm.File.findAll();
      ctx.body = {
        matches,
      };
    } else {
      const matches = await ctx.orm.File.findAll({
        where: {
          user: token.id,
        },
      });
      ctx.body = {
        matches,
      };
    }
  } catch (error) {
    ctx.throw(error);
  }
});

router.post('files.created', '/', upload.single('file'), async (ctx) => {
  try {
    console.log('Uploading file...');
    console.log(ctx.request);
    // Extract token and file from the request
    const token = ctx.request.header;
    const file = ctx.request.file;

    if (!file) {
      console.log('No file uploaded!');
      ctx.throw(400, 'No file uploaded!');
      return;
    }
    // ... tu código existente
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;
