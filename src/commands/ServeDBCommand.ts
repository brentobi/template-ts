import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import Command from "src/cli/Command";
import CommandCall from "src/cli/CommandCall";
import { parentPort } from "worker_threads";

const isPkg = "pkg" in process ? process.pkg : false;
const cwd = isPkg ? process.cwd() : __dirname;

export default class ServeDBCommand extends Command {
    constructor() {
        super("serve-db", []);
    }
    public override async run(call: CommandCall): Promise<void> {
        let data = new Map();
        parentPort?.on("message", (msg) => {
            setTimeout(async () => {
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
                    case "load":
                        const entries = JSON.parse((await readFile(join(cwd, 'dbdata.json'))).toString());
                        data = new Map(entries);
                        respond(cwd);
                        break;
                    case "save":
                        await writeFile(join(cwd, 'dbdata.json'), JSON.stringify(Array.from(data.entries())));
                        respond(cwd);
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