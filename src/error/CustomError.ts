/**
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
 */
export default class CustomError extends Error {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
        this.name = new.target.name;
    }
}