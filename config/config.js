const subjects = require('./subjects')

const url = 'http://116.203.187.241:8080'
const email = 'i.mghvdliashvili@freeuni.edu.ge'

module.exports = {
    path: '../data',
    diffScript: './scripts/git-diff-total.sh',
    // url: 'file:///home/ia/dev/results-manager/frontend/index.html',
    url: url,
    email: email,
    getUrl: (student) => `${url}?id=${student.id}`,
    subjects: subjects,
    getExams: (subject) => subjects[subject].exams,
    getTasks: (exam) => exam.tasks,
    getTaskFiles: (task) => task.files,
}