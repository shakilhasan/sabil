import fs from "fs";

const init = async (app:any) => {
  const rootPath = __dirname;
  const moduleNames = await fs.promises.readdir(rootPath);
  await Promise.all(
    moduleNames.map(async (moduleName) => {
      const stat = await fs.promises.lstat(`${rootPath}/${moduleName}`);
      if (stat.isDirectory()) {
        // eslint-disable-next-line global-require
        const module = require(`./${moduleName}`);
        if (module.init) {
          await module.init(app);
          // console.log(`Module ${moduleName} loaded`);
        }
      }
    })
  );
  return app;
};

module.exports = { init };
