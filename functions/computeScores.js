const reducer = (acc, curValue) => {
    return acc + curValue.score;
};

const computeScores = {
    subjectTotalScore: (subjectLineItem) => {
        let score = 0;

        const { AssessmentLineItems } = subjectLineItem;
        score = AssessmentLineItems.reduce(reducer, 0);

        return score;
    },

    resultTotalScore: (studentResult) => {
        let score = 0;

        const { SubjectLineItems } = studentResult;

        score = SubjectLineItems.reduce(reducer, 0);
        
        return score;
    }
};

module.exports = computeScores;