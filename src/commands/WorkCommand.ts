import Command from "src/cli/Command";
import CommandArg from "src/cli/CommandArg";
import CommandCall from "src/cli/CommandCall";

export default abstract class WorkCommand extends Command {
    constructor(name: string) {
        super(name, [
            new CommandArg("amount"),
            new CommandArg("workers"),
        ]);
    }
    public override async run(call: CommandCall): Promise<void> {
        const amount = parseInt(call.args[0]) || 1000;
        const workers = parseInt(call.args[1], 10) || 1;
        const now2 = new Date().getTime();

        await Promise.all(this.createTasks(amount, workers));
        
        console.log(new Date().getTime() - now2);
    }
    protected abstract createTasks(amount: number, workers: number): Promise<void>[];
}