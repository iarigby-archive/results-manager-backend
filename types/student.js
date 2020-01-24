module.exports.Student = class {
    /**
     * 
     * @param {String} id 
     * @param {String} emailId 
     * @param {Object} results 
     * @param {Array<Object>} notifications 
     */
    constructor(emailId, id = '', results = {}, notifications = []) {
        this.emailId = emailId
        this.id = id
        this.results = results
        // for some fucking reason
        if (Object.keys(notifications).length < 1)
            this.notifications = []
        else
            this.notifications = notifications
    }

    /**
     * 
     * @param {String} subject 
     */
    addSubjectData (subject) {
        this.results[subject] = this.results[subject] || {}
    }

    /**
     * 
     * @param {String} subject 
     * @param {String} exam 
     */
    addExamData(subject, exam) {
        this.results[subject][exam] =
            this.results[subject][exam] || {
                tasks: []
            }
    }

    /**
     * 
     * @param {String} subject 
     * @param {String} exam 
     * @returns {Array}
     */
    getTasks(subject, exam) {
        return this.results[subject][exam].tasks
    }

    /**
     * 
     * @param {String} subject 
     * @param {String} exam 
     * @param {Object} task
     */
    addTask(subject, exam, task) {
        if (! this.getTasks(subject, exam).includes(task)) {
            console.log(`new task for ${this.emailId}`)
            this.results[subject][exam].tasks.push(task)
            this.notifications.push({
                subject: subject,
                exam: exam,
                type: 'new task',
                name: task,
                sent: false
            })
        }
    }
}


