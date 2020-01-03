const router = require('express').Router()
const backend = require('./kuzzle')
const email = require('./email')
const config = require('./config')
const students = require('./student')

const fetchDisputes = async function(id) {
    const data = await backend.get(id)
    const disputes = data._source.disputes || []
    return {
        emailId: data._source.id,
        disputes: disputes
    };
}
const getDisputes = async function(req, res) {
    const id = req.params.studentid
    const { disputes } = await fetchDisputes(id)
    const unresolved = disputes.filter(e => {
        return e.status == 'unresolved'
    })
    res.send({ disputes: unresolved })
}

const createDispute = async function(req, res) {
    const data = req.body
    const id = req.params.studentid
    const { emailId, disputes } = await fetchDisputes(id)
    disputes.push({
        id: disputes.length + 1,
        info: data.info,
        type: data.type,
        status: "unresolved"
    })
    await backend.update(id, { disputes: disputes })
    await backend.refresh()
    res.send({ disputes: disputes })
    disputeNotify(data, emailId)
}

const disputeNotify = function(data, id) {
        const emailAddress = `${id}@freeuni.edu.ge`
        email.sendEmail(
            `${emailAddress}, ${config.email}`,
            // TODO add id to header
            `პარადიგმების მეორე შუალედური: გასაჩივრება`,
            `#${data.id}: ${data.info}\n${config.url}?id=${id}`)
    }
    // should maybe add resolution time + who resolved it
const resolveDispute = async function(req, res) {
    const id = req.params.studentid
    const disputeid = req.params.disputeid
    const { disputes } = await fetchDisputes(id)
    const updated = disputes.map(dispute => updateDispute(dispute, disputeid))
    const data = { disputes: updated }
    backend.update(id, data)
        .then(() => res.send(data))
}

const updateDispute = function(dispute, id) {
    if (dispute.id == id)
        dispute.status = "resolved"
    return dispute
}

router.get('/:studentid', getDisputes)
router.post('/:studentid/new', createDispute)
router.get('/:studentid/resolve/:disputeid', resolveDispute)

module.exports = router