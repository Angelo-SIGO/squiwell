import * as fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';

class Factory {
    constructor(storage = '', questions = []) {
        this.storage = storage;
        this.questions = questions;
    }

    setStorage(dir) {
        this.storage = dir;
    }

    setQuestions(questions) {
        this.questions = questions;
    }

    getStorage() {
        return this.storage;
    }

    getQuestions() {
        return this.questions;
    }

    store(itens) {
        itens.map((item) => {
            const 
            name = path.basename(item),
            dest = path.join(this.getStorage(), name);

            fs.mkdirSync(dest);
            this.importContent(item, dest);
        });
    }

    send() {
        const questions = this.getQuestions();

        inquirer.prompt(questions).then((answers) => {
            const
            type = answers['project-type'],
            name = answers['project-name'],
            origin = path.join(this.getStorage(), type),
            dest = path.join(process.cwd(), name);

            fs.mkdirSync(dest);
            this.importContent(origin, dest);
        });
    }

    review() {
        const questions = this.getQuestions();

        let command = null;

        switch (process.platform) {
            case 'darwin':
                command = 'open';
                break;

            case 'win32':
                command = 'explorer';
                break;

            default:
                command = 'xdg-open';
                break;
        }

        inquirer.prompt(questions).then((answers) => {
            const name = path.resolve(this.getStorage() ,answers['template-name']);
            const dir = path.dirname(name);

            execSync(`${command} '${name}'`);
        });
    }

    discard() {
        const questions = this.getQuestions();

        inquirer.prompt(questions).then((answer) => {
            const dir = path.join(this.getStorage(), answer['template-name']);

            fs.rmSync(dir, { recursive: true });
        });
    }

    importContent(origin, dest) {
        const files = fs.readdirSync(origin);

        files.map((file) => {
            const
            filePath = path.join(origin, file),
            fileDest = path.join(dest, file),
            fileType = fs.statSync(filePath);

            if ( fileType.isFile() ) {
                const fileData = fs.readFileSync(filePath, 'utf-8');
                fs.writeFileSync(fileDest, fileData, 'utf-8');
            } else if ( fileType.isDirectory() ) {
                fs.mkdirSync(fileDest);
                this.importContent(filePath, fileDest);
            }
        });
    }
}

export default Factory;