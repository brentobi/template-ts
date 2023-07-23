import { Worker } from "worker_threads";
import { AppInfo } from "./AppInfo";
import { Log } from "./Log";

export class CLI {
    static async exec(argv: NodeJS.Process["argv"]) {
        Log.info(`${AppInfo.getNameAndVersion()} CLI executed with argv: ${argv.join(" ")}`);
        const command = argv[2];
        const workers = 6;
        const target = 3600_000_000;
        switch (command) {
            case "count":
                const countTarget = parseInt(argv[3], 10) || 10;
                let counter = 0;
                while (counter < countTarget) {
                    counter++;
                }
                Log.info(counter.toString());
                break;
            case "dummy-worker-serial":
                const now1 = new Date().getTime();

                const promises1 = [];
                for (let i = 0; i < workers; i += 1) {
                    promises1.push(CLI.exec(["", "", "count", Math.floor(target / workers).toString()]));
                }
                await Promise.all(promises1);

                console.log(new Date().getTime() - now1);
                break;
            case "dummy-worker-parallel":
                const now2 = new Date().getTime();

                const promises2 = [];
                for (let i = 0; i < workers; i += 1) {
                    promises2.push(new Promise(res => {
                        new Worker(AppInfo.getBinPath(), {
                            argv: ["count", Math.floor(target / workers).toString()]
                        }).on("exit", res)
                    }));
                }
                await Promise.all(promises2);
                
                console.log(new Date().getTime() - now2);
                break;
            default:
                Log.info(`Unknown command: ${command}`);
                process.exit(1);
        }
    }
}