const git = require('simple-git/promise')
const repoPath = '../data/repository'
const repo = git(repoPath)

const main = () => {
    updateData()
    const tenMinutes = 600000
    setInterval(loop, tenMinutes)
}

const loop = async () => {
    repo.raw(['fetch'])
        .then(a => a ? updateData() : console.log('no updates'))
}

const updateData = async () => {
    repo.pull()
        .then(() => refresh())
        .then(notify)
        .catch(e => console.log('e'))
}

const refresh = () => {
    const updatedCount = require('./scripts/setup-database').Run()
    return updatedCount
}

const notify = (updatedCount) => {
    const hour = new Date().getHours()    
    if (hour > 9 && hour < 23) {
        console.log(`${updatedCount} new updates`)
        require('./services/notifications').Run(5000)
    } else {
        console.log('too early/late, wont send emails')
    }
}

main()