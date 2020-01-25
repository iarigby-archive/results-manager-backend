const backend = require('./kuzzle')
const email = require('../services/email')
const templates = require('../resources/emailTemplates')
const config = require('../config/config')

const existingStudents = []
module.exports.Run = async (offset) => {
    const delay = offset || 5000
    await backend.kuzzle.connect()
    await updateExisting()
    const notifications = existingStudents
        .map(s => s._source)
        .filter(hasNotifications)
        .map(mergeNotifications)
    console.log(`${notifications.length} new notifications`)
    notifications
        .forEach((student, id) =>
            setTimeout(() => sendNotifications(student), id * delay)
        )


    setTimeout(() => backend.kuzzle.disconnect(), (notifications.length + 5) * delay)
}

// TODO callback
const sendEmail = (student, notification) => {
    const emailAddress = `${student.emailId}@freeuni.edu.ge`
    // const emailAddress = 'i.mghvdliashvili@freeuni.edu.ge'
    email.sendEmail(
        emailAddress,
        templates.new_file.subject(student.emailId, notification),
        templates.new_file.body(config.getUrl(student), notification),
        () => {
            const notifications = student.notifications
            notification.sent = true
            const index = notifications.indexOf(notification)
            notifications[index] = notification
            updateNotified(student, notifications)
        }
    )
}

const updateNotified = (student) => {
    backend.update(student.id, { notifications: student.notifications })
        .then(() => console.log(`successfully updated notification for ${student.emailId}`))
}
const mergeNotifications = (student) => {
    const notifications = []
    const newNotifications = []
    student.notifications.forEach(n => {
        if (n.sent)
            notifications.push(n)
        else
            newNotifications.push(n)
    })
    notifications.push({
        // todo map + join
        type: 'ახალი ფაილები',
        subject: 'პარადიგმები',
        exam: Array.from(new Set(newNotifications.map(n => n.exam))).join(', '),
        sent: false
    })
    student.notifications = notifications
    return student
}

const updateExisting = async () => {
    let results = await backend.getAll()
    while (results) {
        existingStudents.push(...results.hits)
        results = await results.next()
    }

}

const sendNotifications = (student) => {
    const notifications = student.notifications.filter(n => !n.sent)
    for (notification of notifications) {
        sendEmail(student, notification)
    }
}
const hasNotifications = (student) => {
    return student.notifications.filter(n => !n.sent).length > 0
}

