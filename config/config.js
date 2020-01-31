const subjects = require('./subjects')

const url = 'http://116.203.187.241:8080'
const email = 'i.mghvdliashvili@freeuni.edu.ge'

module.exports = {
    path: '../data',
    diffScript: './scripts/git-diff-total.sh',
    // url: 'file:///home/ia/dev/results-manager/frontend/index.html',
    url: url,
    email: email,
    getUrl: (subject, student) => `${url}?id=${student}&subject=${subject}`,
    subjects: subjects,
    getExam: (subject, exam) => {
        const x = subjects[subject].exams.find(e => e.name == exam)
        x.getTaskFiles = x.getTaskFiles || subjects[subject].getTaskFiles
        return x
    },
    getTasks: (exam) =>
        exam.tasks.map(task => {
            task.getTaskFiles = task.getTaskFiles || exam.getTaskFiles
            return task
        }),
    getSubjectName: (subject) =>
            subjects[subject].name_ge,
}