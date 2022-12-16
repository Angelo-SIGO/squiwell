import * as fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';

class Factory {
    constructor(storage = './', ...questions) {
        this.setStorage(storage);
        this.setQuestions(questions);
    }

    setStorage(dir) {
        path.isAbsolute(dir) ? this['#storage'] = dir : this['#storage'] = path.resolve(dir);
    }

    setQuestions(...quests) {
        Array.isArray(quests.at(0)) ? this['#questions'] = quests.at(0) : this['#questions'] = quests;
    }

    getStorage() {
        return this['#storage'];
    }

    store(itens) {
        itens.map((item) => {
            const 
            name = path.basename(item),
            dest = path.join(this['#storage'], name);

            fs.mkdirSync(dest);
            this.#importContent(item, dest);
        });
    }

    send() {
        inquirer.prompt(this['#questions']).then((answers) => {
            const
            type = Object.values(answers).at(0),
            name = Object.values(answers).at(1),
            orig = path.join(this['#storage'], type),
            dest = path.join(process.cwd(), name);

            fs.mkdirSync(dest);
            this.#importContent(orig, dest);
        });
    }

    review() {
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

        inquirer.prompt(this['#questions']).then((answer) => {
            const dir = path.resolve(this['#storage'], Object.values(answer).at(0));

            execSync(`${command} '${dir}'`);
        });
    }

    discard() {
        inquirer.prompt(this['#questions']).then((answer) => {
            const dir = path.join(this['#storage'], Object.values(answer).at(0));

            fs.rmSync(dir, { recursive: true });
        });
    }

    #importContent(origin, dest) {
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
                this.#importContent(filePath, fileDest);
            }
        });
    }
}

export default Factory;