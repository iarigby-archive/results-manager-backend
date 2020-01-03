const path = `data/results`

const backend = require('./kuzzle')
const { readdirSync } = require('fs')
const email = require('./email')
const fs = require('fs').promises
const url = 'localhost:8080'
const students = require('./student')
const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const createStudent = async(studentData) => {
    console.log('data', studentData)
    try {
        const student = await backend.create(studentData)
        console.log(student)
        return student
    } catch (error) {
        console.log(error)
        return {}
    }
}

const getStudentData = (studentDir) => {
    const file = readdirSync(`${path}/${studentDir}`, { withFileTypes: true })
        .map(file => file.name)[0]
    return {
        id: studentDir,
        file: file,
        // status: 'checked',
        email: 'not sent'
    }
}

const sendEmail = (student) => {
    const id = `${students.getId(student)}`
    const emailAddress = `${id}@freeuni.edu.ge`

    email.sendEmail(
        emailAddress,
        `${id}: პარადიგმების მეორე შუალედურის ნაშრომი შემოწმებულია`,
        `თქვენი ნაშრომის ნახვა შეგიძლიათ ბმულზე ${students.getUrl(student)}
        გვერდი ექსპერიმენტულია და თუ გვერდზე რამე არ მუშაობს, ამ მეილზე პასუხით მომწერეთ`
    )
}

const main = async() => {
    await backend.kuzzle.connect()
    const studentIds = getDirectories(path)
        .slice(1, 10)
    const studentsData = await Promise.all(studentIds.map(getStudentData))
    const students = await Promise.all(studentsData.map(createStudent))
    students.map(sendEmail)
    backend.kuzzle.disconnect()

}

main()