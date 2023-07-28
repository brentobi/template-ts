import Command from "src/cli/Command";
import CommandCall from "src/cli/CommandCall";
import HelpCommand from "src/cli/HelpCommand";
import InvalidCLIArgumentsError from "src/error/InvalidCLIArgumentsError";
import { Log } from "../Log";

export default class BaseApp {
    protected commands : Command[]|undefined;
    protected helpCommand : HelpCommand|undefined;

    constructor() {}

    protected async getCommands(): Promise<Command[]> {
        let commands = this.commands;
        if (!commands) {
            const helpCommand = this.helpCommand = new HelpCommand(() => this.getCommands());
            commands = this.commands = [
                helpCommand,
                ...await this.createCommands(),
            ];
        }
        return commands;
    }

    protected async createCommands(): Promise<Command[]> {
        return [];
    }

    public async run(...args: string[]) {
        const [commandName, ...commandArgs] = args;
        const call = new CommandCall(commandName, ...commandArgs);
        try {
            await this._run(call);
        } catch (e) {
            if (e instanceof InvalidCLIArgumentsError) {
                Log.error(e.name);
                Log.error(e.message);
            } else {
                throw e;
            }
        } finally {
            this.stop();
        }
    }

    protected async _run(call: CommandCall) {
        const commands = await this.getCommands();
        const command = commands.find(candidate => candidate.matchCall(call));
        if (!command) {
            const expectedUsage = this.helpCommand ? await this.helpCommand.renderHelp() : 'No usage instructions available.';
            throw new InvalidCLIArgumentsError(call, expectedUsage);
        }
        await command.run(call);
    }

    protected stop() {
        // Does nothing yet.
    }
}