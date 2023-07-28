import { AppInfo } from "src/AppInfo";
import Command from "src/cli/Command";
import CommandCall from "src/cli/CommandCall";
import { Worker } from "worker_threads";

export default class TestDBCommand extends Command {
    constructor() {
        super("test-db", []);
    }
    public override async run(call: CommandCall): Promise<void> {
        const worker = new Worker(AppInfo.getBinPath(), {
            argv: ["serve-db"]
        })
        
        worker.on("message", (msg) => {
            setTimeout(() => {
                console.log("[MAIN] msg", msg);
                const {cmdId, data} = msg;
                const cmdCB = cmdCBs.get(cmdId);
                cmdCBs.delete(cmdId);
                cmdCB && cmdCB(data);
            }, 10);
        });
        worker.on("error", (e) => {console.log("[MAIN] DB error", e);});
        worker.on("exit", (c) => {console.log("[MAIN] DB exit", c);});
        const cmdCBs = new Map();
        let cmdId = 0;
        const post = (cmd: string) => {
            cmdId++;
            return new Promise((res) => {
                cmdCBs.set(cmdId, res);
                worker.postMessage({cmdId, cmd});
            });
        };
        await post("set aaa a1");
        console.log(await Promise.all([
            post("get aaa"),
            post("get xxx"),
            post("get yyy"),
            post("get ddd"),
        ]));
        await post("save");
        await post("set ddd d1");
        console.log(await Promise.all([
            post("get aaa"),
            post("get bbb"),
            post("get xxx"),
            post("get ddd"),
        ]));
        await post("load");
        console.log(await Promise.all([
            post("get aaa"),
            post("get bbb"),
            post("get xxx"),
            post("get ddd"),
        ]));
    }
}