class Question {
    constructor(name = '', message = '', type = 'input', ...options) {
        this.setName(name);
        this.setMessage(message);
        this.setType(type);
        this.setOptions(options);
    }

    setName(name) {
        this.name = name;
    }

    setMessage(text) {
        this.message = text;
    }

    setType(type) {
        this.type = type;
    }

    setOptions(options) {
        options.map((option) => {
            this[option.key] = option.value;
        });
    }

    get(option) {
        return this[option];
    }
}

export default Question;