const config = require('../config/config')
module.exports.Path = class {
    constructor(subject) {
        this.subject = subject
        this.base = config.path
    }

    getTask(exam, emailId, task) {
        return `${this.getStudent(exam, emailId)}/${task}`
    }
    getStudent(exam, emailId) {
        return `${this.base}/${this.subject}/${exam}/${emailId}`
    }
    getExam(exam) {
        return `${this.base}/${this.subject}/${exam}`
    }
    getSubject() {
        return `${this.base}/${this.subject}`
    }
}
