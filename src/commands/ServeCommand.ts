import express from "express";
import { AppInfo } from "src/AppInfo";
import { Log } from "src/base/Log";
import Command from "src/cli/Command";
import CommandArg from "src/cli/CommandArg";
import CommandCall from "src/cli/CommandCall";

export default class ServeCommand extends Command {
    constructor(protected publicRootPath: string) {
        super("serve", [new CommandArg("port")]);
    }
    public override async run(call: CommandCall): Promise<void> {
        const app = express();
        const port = parseInt(call.args[0], 10) || 3000;
        const appName = await AppInfo.getName();
        const appVersion = await AppInfo.getVersion();
        const appDescription = await AppInfo.getDescription();

        app.get("/api/version", (req, res) => {
            res.contentType("application/json");
            res.send(JSON.stringify({
                name: appName,
                version: appVersion,
                description: appDescription, 
            }));
        });

        app.use(express.static(this.publicRootPath));

        app.listen(port, () => {
            Log.info(`[server]: Server is running at http://localhost:${port}`);
        });
    }
}