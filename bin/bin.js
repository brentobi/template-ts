#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");

const PATH_INDEX = path.join(__dirname, "..", "dist", "index.js");

/**
 * @param {string} path 
 * @returns {Promise<boolean>}
 */
async function fileExists(path) {
    try {
        await fs.stat(path);
        return true;
    } catch (e) {
        if (e.errno === -2 && e.code === "ENOENT") {
            return false;
        }
        throw e;
    }
}

(async () => {
    if (!await fileExists(PATH_INDEX)) {
        throw new Error(`${PATH_INDEX} does not exist. Did you forget to build via npm run build?`);
    }
    const index = require(PATH_INDEX);
    await index.CLI.exec(process.argv);
})();
