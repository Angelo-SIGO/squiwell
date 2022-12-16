#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';

import Factory from './src/Factory.js';
import Question from './src/Question.js';
import QuestionControl from './src/QuestionControl.js';


const 
__filename = fileURLToPath(import.meta.url),
__dirname = dirname(__filename);

function main() {
    const 
    flag = process.argv.at(2),
    factory = new Factory(path.join(__dirname, 'templates')),
    selectQuest = new Question('', '', 'list', {key: 'choices', value: fs.readdirSync(factory.getStorage())});
    
    switch (flag) {
        case '--store':
            factory.store(process.argv.slice(3));
            break;

        case '--seed':
            const 
            controller = new QuestionControl(),
            inputQuest = new Question("project-name", "What is the project's name?");
            inputQuest.setOptions({ key: 'validate', value: input => controller.testInput(input) })

            selectQuest.setName('project-type');
            selectQuest.setMessage('What kind of project are you creating?');

            factory.setQuestions(selectQuest, inputQuest);          
            factory.send();
            break;

        case '--modify':
            selectQuest.setName('template-name');
            selectQuest.setMessage('Which template do you want to edit?');

            factory.setQuestions(selectQuest);
            factory.review();
            break;

        case '--forgot':
            selectQuest.setName('template-name');
            selectQuest.setMessage('Which template do you want to remove?');

            factory.setQuestions(selectQuest);
            factory.discard();
            break;

        default:
            const flagsAllowed = `[--store | --seed]`

            console.log(`Invalid command, please use ${flagsAllowed}`);
            break;
    }
}

main();