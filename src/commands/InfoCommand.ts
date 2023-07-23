import fsPromises from "fs/promises";
import path from "path";
import { AppInfo } from "src/AppInfo";
import { Log } from "src/base/Log";
import Command from "src/cli/Command";

async function printDir(dirPath: string) {
    // recursive: true not yet supported for our build target nodejs 18.5
    const files = await fsPromises.readdir(dirPath, {recursive: false});
    Log.info(`stat ${dirPath}`);
    Log.info(files.map(file => `- ${path.join(dirPath, file)}`).join("\n"));
}

export default class InfoCommand extends Command {
    constructor() {
        super("info");
    }
    public override async run(): Promise<void> {
        Log.info(AppInfo.getNameAndVersion());
        Log.info(`  root: ${AppInfo.getRootDirectory()}`);
        Log.info(`public: ${AppInfo.getPublicDirectory()}`);
        Log.info(`  dist: ${AppInfo.getDistDirectory()}`);
        Log.info(`   bin: ${AppInfo.getBinPath()}`);
        Log.info(JSON.stringify(process.versions, undefined, 2));
        printDir(AppInfo.getRootDirectory());
        printDir(AppInfo.getPublicDirectory());
        printDir(AppInfo.getDistDirectory());
    }
}