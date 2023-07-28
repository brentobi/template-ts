import Command from "./Command";

export default class HelpCommand extends Command {
    constructor(protected getCommands: () => Promise<Command[]>) {
        super("help");
    }
    public async renderHelp() {
        const commands = await this.getCommands();
        const usage = commands.map(command => `  ${command.getCallSyntax()}`).join("\n");
        return [
            `Usage:`,
            usage
        ].join("\n");
    }
    public async run() {
        console.log(await this.renderHelp());
    }
}