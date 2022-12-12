#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import Factory from './src/Factory.js';
import flags from './src/data/flags.json' assert { type: "json" }

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function main() {
    const flag = process.argv.at(2);
    
    switch (flag) {
        case flags.store:
            const templates = process.argv.slice(3),
            factory = new Factory();

            factory.setStorage(path.join(__dirname, 'templates'));
            factory.store(templates);
            break;

        case flags.create:
            
            break;

        default:
            const flagsAllowed = `${flags['store']}`

            console.log(`Invalid command, please use ${flagsAllowed}`);
            break;
    }
}

main();