import { join } from "path";
import Command from "src/cli/Command";
import CommandCall from "src/cli/CommandCall";
import { parentPort } from "worker_threads";
import { File } from "src/fs/File";

const isPkg = "pkg" in process ? process.pkg : false;
const cwd = isPkg ? process.cwd() : __dirname;
const filepath = join(cwd, "data.json");

export default class ServeDBCommand extends Command {
    protected file?:File;

    constructor() {
        super("serve-db", []);
    }
    
    protected async getFile() {
        return this.file || (this.file = new File(filepath));
    }

    async loadData() {
        const file = await this.getFile();
        await file.lock();
        if (!await file.exists()) {
            return new Map();    
        }
        const filecontents = await file.read();
        const entries: Map<string, string> = JSON.parse(filecontents);
        return new Map(entries);
    }

    async saveData(data: Map<string, string>) {
        const file = await this.getFile();
        await file.write(JSON.stringify(Array.from(data.entries())));
    }

    public override async run(call: CommandCall): Promise<void> {
        let data = await this.loadData();
        let stopped = false;
        parentPort?.on("message", (msg) => {
            setTimeout(async () => {
                if (stopped) {
                    console.log("[DB] already stopped");
                    return;
                }
                console.log("[DB] msg", msg);
                const {cmdId, cmd} = msg;
                const args = cmd.split(" ");
                const respond = (data?: any) => {
                    parentPort?.postMessage({cmdId, data});
                };
                switch (args[0]) {
                    case "set":
                        data.set(args[1], args[2]);
                        respond();
                        break;
                    case "get":
                        respond(data.get(args[1]));
                        break;
                    case "stop":
                        stopped = true;
                        await this.saveData(data);
                        await this.file?.release();
                        respond();
                        process.exit(0);
                        break;
                    default: throw new Error(`Invalid command "${cmd}".`);
                }
            }, 10);
        });
        parentPort?.on("error", (e) => {
            console.log("[DB] MAIN error", e);
        });
        parentPort?.on("exit", (c) => {
            console.log("[DB] MAIN exit", c);
        });
    }
}