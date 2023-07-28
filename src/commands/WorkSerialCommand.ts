import App from "src/App";
import WorkCommand from "./WorkCommand";

export default class WorkSerialCommand extends WorkCommand {
    constructor() {
        super("work-serial");
    }
    protected override createTasks(amount: number, workers: number) {
        const promises = [];
        for (let i = 0; i < workers; i += 1) {
            const app = new App();
            promises.push(app.run("count", Math.floor(amount / workers).toString()));
        }
        return promises;
    }
}