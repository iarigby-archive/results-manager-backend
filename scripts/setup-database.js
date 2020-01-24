const { readdirSync } = require('fs')

const backend = require('../services/kuzzle')
const email = require('../services/email')

const students = require('../student')
const config = require('../config/config')

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => name != '.git')

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
    const file = readdirSync(`${config.path}/results/${studentDir}`, { withFileTypes: true })
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
        // const emailAddress = `${id}@freeuni.edu.ge`
    const emailAddress = 'i.mghvdliashvili@freeuni.edu.ge'
    console.log(emailAddress)
    email.sendEmail(
        emailAddress,
        `${id}: პარადიგმების მეორე შუალედურის ნაშრომი შემოწმებულია`,
        `თქვენი ნაშრომის ნახვა შეგიძლიათ ბმულზე ${students.getUrl(student)}
                გვერდი ექსპერიმენტულია და თუ გვერდზე რამე არ მუშაობს, ამ მეილზე პასუხით მომწერეთ`
    )
}

const main = async() => {
    await backend.kuzzle.connect()
    const studentIds = getDirectories(config.path + '/results')
    const studentsData = await Promise.all(studentIds.map(getStudentData))
    const students = await Promise.all(studentsData.map(createStudent))
    students.map((student, id) => {
        console.log(id)
        setTimeout(() => sendEmail(student), id * 1000)
    })
    backend.kuzzle.disconnect()

}

main()