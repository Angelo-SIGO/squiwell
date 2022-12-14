#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';

import Factory from './src/Factory.js';
import Question from './src/Question.js';
import QuestionControl from './src/QuestionControl.js';
import Form from './src/Form.js';


const 
__filename = fileURLToPath(import.meta.url),
__dirname = dirname(__filename);

function main() {
    const 
    flag = process.argv.at(2),
    templates = process.argv.slice(3),
    factory = new Factory(),
    form = new Form(),
    questControl = new QuestionControl();

    factory.setStorage(path.join(__dirname, 'templates'));
    
    switch (flag) {
        case '--store':
            factory.store(templates);
            break;

        case '--seed':
            const
            typeQuest = new Question(),
            nameQuest = new Question();

            typeQuest.setName('project-type');
            typeQuest.setMessage('Which kind of project are you creating?');
            typeQuest.setType('list');
            typeQuest.setOptions([{key: 'choices', value: fs.readdirSync(factory.getStorage())}]);
            
            nameQuest.setName('project-name');
            nameQuest.setMessage('What is the name of this project?');
            nameQuest.setOptions([{key: 'validate', value: (input) => {return questControl.testInput(input)}}]);

            form.setQuestions(typeQuest, nameQuest);

            factory.setQuestions(form.getQuestions());
            factory.send();
            break;

        case '--modify':
            const quest = new Question();

            quest.setName('template-name');
            quest.setMessage('Which template do you wanna edit?');
            quest.setType('list');
            quest.setOptions([{key: 'choices', value: fs.readdirSync(factory.getStorage())}]);

            form.setQuestions(quest);

            factory.setQuestions(form.getQuestions());
            factory.review();
            break;

        case '--forgot':
            const deleteQuest = new Question();

            deleteQuest.setName('template-name');
            deleteQuest.setMessage('Which template do you wanna remove?');
            deleteQuest.setType('list');
            deleteQuest.setOptions([{key: 'choices', value: fs.readdirSync(factory.getStorage())}]);

            form.setQuestions(deleteQuest);

            factory.setQuestions(form.getQuestions());
            factory.discard()
            break;

        default:
            const flagsAllowed = `[--store | --seed]`

            console.log(`Invalid command, please use ${flagsAllowed}`);
            break;
    }
}

main();