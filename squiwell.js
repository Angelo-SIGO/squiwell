#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';

import Factory from './src/Factory.js';


const 
__filename = fileURLToPath(import.meta.url),
__dirname = dirname(__filename),
questions = [
    {
        name: 'project-type',
        type: 'list',
        message: 'What kind of project are you creating?',
        choices: fs.readdirSync(path.join(__dirname, 'templates'))
    },
    {
        name: 'project-name',
        type: 'input',
        message: 'What is the name of this project?',
        validate: (input) => {
            return /^([A-Za-z\d\-\_])+$/.test(input) 
                ? true 
                : 'Project name may only include letters, numbers, underscores and hashes';
        }
    }
];

function main() {
    const 
    flag = process.argv.at(2),
    factory = new Factory();

    factory.setStorage(path.join(__dirname, 'templates'));
    
    switch (flag) {
        case '--store':
            const templates = process.argv.slice(3);
            
            factory.store(templates);
            break;

        case '--seed':
            factory.setQuestions(questions);
            factory.send();
            break;

        default:
            const flagsAllowed = `[--store | --seed]`

            console.log(`Invalid command, please use ${flagsAllowed}`);
            break;
    }
}

main();