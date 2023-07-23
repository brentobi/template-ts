import { AppInfo } from "src/AppInfo";
import { Worker } from "worker_threads";
import WorkCommand from "./WorkCommand";

export default class WorkParallelCommand extends WorkCommand {
    constructor() {
        super("work-parallel");
    }
    protected override createTasks(amount: number, workers: number) {
        const promises = [];
        for (let i = 0; i < workers; i += 1) {
            promises.push(new Promise<void>(res => {
                new Worker(AppInfo.getBinPath(), {
                    argv: ["count", Math.floor(amount / workers).toString()]
                }).on("exit", res)
            }));
        }
        return promises;
    }
}