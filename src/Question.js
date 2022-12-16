class Question {
    constructor(name = '', message = '', type = 'input', options = {}) {
        this.setName(name);
        this.setMessage(message);
        this.setType(type);
        this.setOptions(options);
    }

    setName(name) {
        typeof name === String ? this.name = name : this.name = name.toString();
    }

    setMessage(text) {
        typeof text === String ? this.message = text : this.message = text.toString();
    }

    setType(type) {
        typeof type === String ? this.type = type : this.type = type.toString();
    }

    setOptions(options) {
        if ( typeof options === 'string' || Array.isArray(options) || typeof options !== 'object' ) {
            throw `The "options" parameter must be an key-value pair object.`
        } else {
            Object.entries(options).map((option) => {
                this[option.at(0)] = option.at(1);
            });
        }
    }
}

export default Question;