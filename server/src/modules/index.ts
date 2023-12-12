import fs from "fs";

const init = async (app: any) => {
    try {
        const rootPath = __dirname;
        const moduleNames = await fs.promises.readdir(rootPath);
        await Promise.all(
            moduleNames.map(async (moduleName) => {
                const stat = await fs.promises.lstat(`${rootPath}/${moduleName}`);
                if (stat.isDirectory()) {
                    // const module = require(`./${moduleName}`);
                    // @ts-ignore
                    const module = await import(`./${moduleName}`);

                    if (module.init) {
                        await module.init(app);
                        console.log(`Module:> ${module.init}`);
                        console.log(`Module ${moduleName} loaded`);
                    }
                }
            })
        );
        return app;
    } catch (e) {
        console.log("INIT error:>", e);
    }

};

export {init};
