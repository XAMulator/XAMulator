function Question (questionContent) {
    this.questionContent = questionContent;
    this.typeUrl = null;
}

Question.prototype.getQuestionContent = function () {
    return this.questionContent;
}

Question.prototype.setQuestionContent = function (m) {
    this.questionContent = m;
}