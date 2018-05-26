const StudyModel = {
    namespace: 'study',
    state: {
        word: 'Fuck',
        meaning: 'here is the meaning of the word above.'
    },
    effects: {
        * getTodayWords(payload, { call, put }) {
        }
    }
};

export default StudyModel;
