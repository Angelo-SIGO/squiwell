class Form {
    constructor(...quests) {
        this.setQuestions(quests);
    }

    setQuestions(...quests) {

        if ( Array.isArray(quests.at(0)) ) {
            quests.at(0).map((quest) => {
                quests.push(quest);
                this.questions = quests;
            });
        } else {
            quests.map((quest) => {
                quests.push(quest);
                this.questions = quests;
            });
        }
    }

    getQuestions() {
        return this.questions;
    }


}

export default Form;