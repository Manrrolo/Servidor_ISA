router.post('files.created', '/', async (ctx) => {
  try {
    console.log('Uploading file...');
    await upload.single('file')(ctx, async function () {
      // Extract token and file from the request
      const token = ctx.request.header;
      const file = ctx.request.file;

      if (!file) {
        console.log('No file uploaded!');
        ctx.throw(400, 'No file uploaded!');
        return;
      }
      console.log('File name:', file.originalname);
      console.log(file);
      let dataBuffer = file.buffer;
      let data = await pdfParse(dataBuffer);
      let text = data.text;

      let chunkSize = 1000;
      let chunkOverlap = 200;

      let chunks = [];
      for (let i = 0; i < text.length; i += chunkSize) {
        let end = Math.min(i + chunkSize, text.length);
        let chunk = text.slice(i, end);
        chunks.push(chunk);
        i -= chunkOverlap; // Overlap chunks
      }

      let storeName = file.originalname.split('.')[0];
      let pathToFile = path.join(__dirname, storeName + '.json');
      let vectorStore;

      if (fs.existsSync(pathToFile)) {
        let data = fs.readFileSync(pathToFile, 'utf8');
        vectorStore = await FaissStore.fromJSON(JSON.parse(data));
      } else {
        let docs = chunks.map((text, id) => {
          return { id: id, text: text };
        });
        vectorStore = await FaissStore.fromDocuments(
          docs,
          new OpenAIEmbeddings(),
        );
        let jsonData = vectorStore.toJSON();
        let stringData = JSON.stringify(jsonData);
        fs.writeFileSync(pathToFile, stringData);
      }

      if (token.admin) {
        await ctx.orm.File.create({
          name: file.originalname,
          userId: null,
          // other necessary fields
        });
      } else {
        await ctx.orm.File.create({
          name: file.originalname,
          userId: token.id,
          // other necessary fields
        });
      }

      ctx.status = 200;
      ctx.body = 'PDF uploaded and processed successfully.';
    });
  } catch (error) {
    ctx.throw(error);
  }
});
