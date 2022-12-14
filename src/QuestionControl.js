class QuestionControl {
    constructor() {}

    testInput(input) {
        const msg = 'Project name may only include letters, numbers, underscores and hashes';

        return /^([A-Za-z\d\-\_])+$/.test(input) ? true : msg;
    }
}

export default QuestionControl;