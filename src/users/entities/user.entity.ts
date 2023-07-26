import { v4 as uuid } from 'uuid';
export class User {
    id: string;
    login: string;
    password: string;
    version: number;
    createdAt: number;
    updatedAt: number;

    constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
        this.id = uuid();
        this.version = 1;
        this.createdAt = Date.now();
        this.updatedAt = this.createdAt;
    }

    info() {
        /*     const createdDate = new Date(this.createdAt).toLocaleString();
            const updatedDate = new Date(this.updatedAt).toLocaleString(); */
        return {
            id: this.id,
            login: this.login,
            version: this.version,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    changePassword(pass: string) {
        this.password = pass;
        this.version += 1;
        this.updatedAt = Date.now();
        console.log("Done")
    }
}
