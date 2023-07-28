import { AppInfo } from "src/AppInfo";

export default class CommandCall {
    public readonly args : string[];
    constructor(public readonly name?: string, ...args : string[]) {
        this.args = args;
    }
    public toString() {
        return `node ${AppInfo.getBinPath()} ${this.name || ""} ${this.args.join(" ")}`;
    }
}