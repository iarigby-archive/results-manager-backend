const { readdirSync } = require('fs')

const backend = require('../services/kuzzle')
const { Student } = require('../types/student')
const config = require('../config/config')
const subject = 'paradigms'
const { Path } = require('../types/paths')
const path = new Path(subject)

/**
 * 
 * @param {String} exam 
 */
const getDirectories = (exam) => 
    readdirSync(path.getExam(exam), { withFileTypes: true })
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
    console.log(`new student: ${student.id}\n${data._id}`)
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
    tasks.forEach(t => student.addTask(subject, exam, t))
    return student
}

/**
 * 
 * @param {Student} student 
 * @returns {Promise<Student>}
 */
const syncChanges = student =>
    backend.update(student.id, student)
        .then(() => console.log(`successsfully updated data for ${student.emailId}`))
        .then(() => student)
        .catch(e => console.log(student, e))

const updateExisting = async () => {
    let results = await backend.getAll()
    while (results) {
        existingStudents.push(...results.hits)
        results = await results.next()
    }

}
const main = async () => {
    await backend.kuzzle.connect()
    const exam = process.argv[2]
    if (typeof exam == 'undefined') {
        console.log('provide exam name')
        return
    }
    await updateExisting()
    const studentIds = getDirectories(exam)
    const studentsData = await Promise.all(studentIds.map(createStudent))
    // const students = await Promise.all(studentsData.map(addStudentData))
    const students = studentsData
        .map(s => addStudentData(s, exam))
    await Promise.all(students.map(syncChanges))
    const n = await backend.get(students[0].id)
    backend.kuzzle.disconnect()
}

const existingStudents = []
main()