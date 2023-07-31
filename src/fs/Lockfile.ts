import { mkdir, realpath, rmdir } from "fs/promises";
import { basename, dirname, join } from "path";

export class Lockfile {
    static async createForPath(filepath: string) {
        // TODO retry
        const filename = basename(filepath);
        const dirpath = dirname(filepath);
        const realdirpath = await realpath(dirpath);
        const lockdirpath = join(realdirpath, `${filename}.lock`);
        
        await mkdir(lockdirpath);

        return new Lockfile(lockdirpath);
    }
    
    constructor (protected lockdirpath: string) {}

    async release() {
        await this.checkIntegrity();
        await rmdir(this.lockdirpath);
    }

    async checkIntegrity() {
        const reallockdirpath = await realpath(this.lockdirpath);
        if (reallockdirpath !== this.lockdirpath) {
            throw new Error("Invalid lockdirpath");
        }
        // TODO checksum of contents
        // TODO lockfile last-known date
        // TODO lockfile pid
    }
}