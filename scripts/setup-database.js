const { readdirSync } = require('fs')

const backend = require('../services/kuzzle')
const { Student } = require('../types/student')
const subject = 'paradigms'
const { Path } = require('../types/paths')
const path = new Path(subject)

let existingStudents = []
let studentsWithNewData = []

// if (process.argv.length < 3) {
/**
 * @returns number of updates
 */
module.exports.Run = async () => {
    await backend.kuzzle.connect()
    const exams = getDirectories(path.getSubject())
    let updatedCount = 0
    for (exam of exams) {
        await updateExisting()
        const studentIds = getDirectories(path.getExam(exam))
        const studentsData = await Promise.all(studentIds.map(createStudent))
        // const students = await Promise.all(studentsData.map(addStudentData))
        const students = studentsData
            .map(s => addStudentData(s, exam))
        // TODO add id's that need changes
        const toUpdate = students
            .filter(hasNewData)
        await Promise.all(toUpdate
            .map(syncChanges))
        updatedCount += toUpdate.length
    }
    backend.kuzzle.disconnect()
    return updatedCount
}


/**
 * 
 * @param {String} exam 
 */
const getDirectories = (path) =>
    readdirSync(path, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .filter(name => name != '.git')
// .slice(1, 5)

/**
 * 
 * @param {String} emailId 
 */
const findStudent = (emailId) => {
    for (student of existingStudents) {
        if (student._source.emailId == emailId) {
            return student._source
        }
    }
    console.log(emailId, existingStudents)
    return null
}

/**
 * 
 * @param {String} studentDir 
 * @returns {Student}
 */
const createStudent = async (emailId) => {
    const e = findStudent(emailId)
    if (e != null) {
        return new Student(e.emailId, e.id, e.results, e.notifications)
    }
    const student = new Student(emailId)
    const data = await backend.create(student)
    // TODO write this to file
    student.id = data._id
    console.log(`new student: ${student.emailId}\n${data._id}`)
    return student
}

/**
 * 
 * @param {Student} student 
 * @param {String} exam 
 * @returns {Student}
 */
const addStudentData = (student, exam) => {
    student.addSubjectData(subject)
    student.addExamData(subject, exam)
    const pathName = path.getStudent(exam, student.emailId)
    const tasks = readdirSync(pathName, { withFileTypes: true })
        .map(file => file.name)
    const addResult = tasks.map(t => student.addTask(subject, exam, t))
    if (addResult.filter(a => a).length > 0) {
        studentsWithNewData.push(student.id)
    }
    return student
}

const hasNewData = student =>
    studentsWithNewData.includes(student.id)

/**
 * 
 * @param {Student} student 
 * @returns {Promise<Student>}
 */
const syncChanges = student =>
    backend.update(student.id, student)
        .then((res) => console.log(`successsfully updated data for ${res._id}, ${student.id}, ${student.emailId}`))
        .then(() => backend.refresh())
        .then(() => student)
        .catch(e => console.log(student, e))

const updateExisting = async () => {
    existingStudents = []
    studentsWithNewData = []
    let results = await backend.getAll()
    while (results) {
        existingStudents.push(...results.hits)
        results = await results.next()
    }

}

