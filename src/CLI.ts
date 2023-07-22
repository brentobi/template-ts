import { AppInfo } from "./AppInfo";
import { Log } from "./Log";

export class CLI {
    static async exec(argv: NodeJS.Process["argv"]) {
        Log.info(`${AppInfo.getNameAndVersion()} CLI executed with argv: ${argv.join(" ")}`);
    }
}