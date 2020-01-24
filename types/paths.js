const config = require('../config/config')
module.exports.Path = class {
    constructor(subject) {
        this.subject = subject
        this.base = config.path
    }

    getStudent(exam, emailId) {
        return `${this.base}/${this.subject}/${exam}/${emailId}`
    }
    getExam(exam) {
        return `${this.base}/${this.subject}/${exam}`
    }
}
