import { readFile, stat, writeFile } from "fs/promises";
import { Lockfile } from "./Lockfile";

export class File {
    protected lockfile?: Lockfile;

    constructor(protected filepath: string) {}

    public async lock() {
        if (this.lockfile) {
            throw new Error("Lock already exists.");
        }
        this.lockfile = await Lockfile.createForPath(this.filepath);
    }

    public getLockfile() {
        const lockfile = this.lockfile;
        if (!lockfile) {
            throw new Error("File is not locked.");
        }
        return lockfile;
    }

    public async release() {
        await this.checkLockfileIntegrity();
        const lockfile = this.getLockfile();
        await lockfile.release();
    }

    protected async checkLockfileIntegrity() {
        const lockfile = this.getLockfile();
        await lockfile.checkIntegrity();
    }

    public async read() {
        await this.checkLockfileIntegrity();
        return (await readFile(this.filepath)).toString();
    }

    public async write(content: string) {
        await this.checkLockfileIntegrity();
        await writeFile(this.filepath, content);
    }

    public async exists() {
        await this.checkLockfileIntegrity();
        try {
            await stat(this.filepath);
            return true;
        } catch (e) {
            if (typeof e === "object" && e !== null && "errno" in e && "code" in e) {
                if (e.errno === -2 && e.code === "ENOENT") {
                    return false;
                }
            }
            throw e;
        }
    }
}