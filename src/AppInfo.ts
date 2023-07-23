import path from "path";

const NAME = "MyApp";
const VERSION = "0.0.1";

export class AppInfo {
    public static getName() {
        return NAME;
    }
    public static getVersion() {
        return VERSION;
    }
    public static getNameAndVersion() {
        return `${AppInfo.getName()} ${AppInfo.getVersion()}`;
    }
    public static getDistDirectory() {
        return __dirname;
    }
    public static getRootDirectory() {
        return path.dirname(this.getDistDirectory());
    }
    public static getBinPath() {
        return path.join(this.getDistDirectory(), "bin.js");
    }
    public static getPublicDirectory() {
        return path.join(this.getRootDirectory(), "public");
    }
}