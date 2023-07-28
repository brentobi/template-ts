import { Log } from "src/base/Log";
import Command from "src/cli/Command";
import CommandArg from "src/cli/CommandArg";
import CommandCall from "src/cli/CommandCall";

export default class CountCommand extends Command {
    constructor() {
        super("count", [new CommandArg("amount")]);
    }
    public override async run(call: CommandCall): Promise<void> {
        const countTarget = parseInt(call.args[0], 10) || 10;
        let counter = 0;
        Log.info("counting ...");
        while (counter < countTarget) {
            counter++;
        }
        Log.info(counter.toString());
    }
}