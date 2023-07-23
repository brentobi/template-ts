import path from "path";

const NAME = "MyApp";
const VERSION = "0.0.1";

export class AppInfo {
    static getName() {
        return NAME;
    }
    static getVersion() {
        return VERSION;
    }
    static getNameAndVersion() {
        return `${AppInfo.getName()} ${AppInfo.getVersion()}`;
    }
    static getRootDirectory() {
        return __dirname;
    }
    static getBinPath() {
        return path.join(__dirname, "bin.js");
    }
}