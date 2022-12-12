import * as fs from 'fs';
import path from 'path';

class Factory {
    constructor(storage = '') {
        this.storage = storage;
    }

    setStorage(dir) {
        this.storage = dir;
    }

    getStorage() {
        return this.storage;
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