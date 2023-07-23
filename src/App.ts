import { AppInfo } from "./AppInfo";
import BaseApp from "./base/app/BaseApp";
import Command from "./cli/Command.js";
import CountCommand from "./commands/CountCommand";
import InfoCommand from "./commands/InfoCommand";
import ServeCommand from "./commands/ServeCommand";
import WorkParallelCommand from "./commands/WorkParallelCommand";
import WorkSerialCommand from "./commands/WorkSerialCommand";

export default class App extends BaseApp {
    protected override async createCommands(): Promise<Command[]> {
        return [
            new InfoCommand,
            new CountCommand,
            new WorkParallelCommand,
            new WorkSerialCommand,
            new ServeCommand(AppInfo.getPublicDirectory()),
        ];
    }
}