class Form {
    constructor(...quests) {
        this.setQuestions(quests);
    }

    setQuestions(...quests) {
        quests.map((quest) => {
            quests.push(quest);
            this.questions = quests;
        });
    }

    getQuestions() {
        return this.questions;
    }


}

export default Form;