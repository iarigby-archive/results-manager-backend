const config = require('../config/config')
module.exports.Path = class {
    constructor(subject) {
        this.subject = subject
        this.base = config.path
    }

    getStudent = (exam, emailId) =>
        `${this.base}/${this.subject}/${exam}/${emailId}`
    getExam = (exam) =>
        `${this.base}/${this.subject}/${exam}`
}
