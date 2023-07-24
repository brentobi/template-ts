import fsPromises from "fs/promises";
import path from "path";

export class AppInfo {
    public static async getName() {
        const packageJson = await AppInfo.readPackageJson();
        return "name" in packageJson ? packageJson.name : "";
    }
    public static async getDescription() {
        const packageJson = await AppInfo.readPackageJson();
        return "description" in packageJson ? packageJson.description : "";
    }
    public static async getVersion() {
        const packageJson = await AppInfo.readPackageJson(); 
        return "version" in packageJson ? packageJson.version : "";
    }
    public static async getNameAndVersion() {
        return `${await AppInfo.getName()} ${await AppInfo.getVersion()}`;
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
    protected static async readPackageJson() {
        const packageJson = JSON.parse(
            (
                await fsPromises.readFile(path.join(AppInfo.getRootDirectory(), "package.json"))
            ).toString()
        );
        if (typeof packageJson === "object" && packageJson !== null) {
            return packageJson;
        }
        return {};
    }
}