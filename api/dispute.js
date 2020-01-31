const backend = require('../services/kuzzle')
const email = require('../services/email')
const config = require('../config/config')

const fetchDisputes = async function (id) {
    const data = await backend.get(id)
    const disputes = data._source.disputes || []
    return {
        id: id,
        emailId: data._source.emailId,
        disputes: disputes
    };
}

module.exports.getDisputes = async function (req, res) {
    const id = req.params.studentid
    const data = await fetchDisputes(id)
    data.disputes = data.disputes.filter(e => {
        return e.status == 'unresolved'
    })
    res.send(data)
}

/**
 * data:
 * @param subject
 * @param exam
 * @param task
 * @param type
 */
module.exports.createDispute = async function (req, res) {
    const data = req.body
    const id = req.params.studentid
    const { emailId, disputes } = await fetchDisputes(id)
    data.disputeId = disputes.length + 1
    data.emailId = emailId
    data.status = "unresolved"
    disputes.push(data)
    await backend.update(id, { disputes: disputes })
    res.send({ disputes: disputes })
    disputeNotify(data, id)
}

const disputeNotify = function (data, id) {
    const emailAddress = `${data.emailId}@freeuni.edu.ge`
    const subject = config.getSubjectName(data.subject)
    const exam = config.getExam(data.subject, data.exam).name_ge
    email.sendEmail(
        `${emailAddress}, ${config.email}`,
        // TODO add id to header
        `${data.emailId}-ის გასაჩივრება: ${subject}ს ${exam}`,
        `
            ${data.task}
            #${data.disputeId}: ${data.info}
            ნაშრომის ნახვა შეგიძლიათ ბმულზე: ${config.getUrl(data.subject, id)}`,
        () => { console.log('sent') })
}

// should maybe add resolution time + who resolved it
module.exports.resolveDispute = async function (req, res) {
    const id = req.params.studentid
    const disputeid = req.params.disputeid
    const { disputes } = await fetchDisputes(id)
    const updated = disputes.map(dispute => updateDispute(dispute, disputeid))
    const data = { disputes: updated }
    backend.update(id, data)
        .then(() => res.send(data))
}

const updateDispute = function (dispute, id) {
    if (dispute.disputeId == id)
        dispute.status = "resolved"
    return dispute
}