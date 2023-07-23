import CommandCall from "src/cli/CommandCall";
import CustomError from "./CustomError";

export default class InvalidCLIArgumentsError extends CustomError {
    constructor(call : CommandCall, expectedUsage : string) {
        
        const actualUsage = call.toString();
        super([
            `Invalid usage: ${actualUsage}`,
            expectedUsage
        ].join("\n"));
    }
}