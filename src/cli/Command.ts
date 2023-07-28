import { AppInfo } from "src/AppInfo.js";
import CommandCall from "./CommandCall.js";
import CommandArg from "./CommandArg.js";

export default abstract class Command {
    protected readonly expectedArgs: CommandArg[];
    constructor(public readonly name: string, expectedArgs?: CommandArg[]) {
        this.expectedArgs = expectedArgs || [];
    }
    public getCallSyntax() {
        const argsSyntax = this.expectedArgs.map(arg => `<${arg.name}>`).join(" ");
        return `node ${AppInfo.getBinPath()} ${this.name} ${argsSyntax}`;
    }
    public abstract run(call: CommandCall) : Promise<void>;
    public matchCall(call : CommandCall) {
        return call.name === this.name && call.args.length === this.expectedArgs.length;
    }
}