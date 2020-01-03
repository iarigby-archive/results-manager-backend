// const git = require('simple-git/promise')

// const repo = git('/home/ia/dev/social_network')
const exec = require('child-process-promise').exec
const path = require('./config').path

// repo.status()
//     .then(s => console.log(s))

//     // repo.diff().then(repo => 
//     //    console.log(repo))
//     // .then(w => console.log(w))
//     .catch(err => console.log(err))

// https://stackoverflow.com/questions/8259851/using-git-diff-how-can-i-get-added-and-modified-lines-numbers
// command = `cd ${path} && git blame ${id}/server_room.s | grep -n '^0\\{8\\} ' | cut -f1 -d: `

module.exports.getDiff = (id, file) => {
    const command = `cd ${path}/results && git diff -U1000 ${id}/${file}`
    return exec(command)
        .catch(err => console.log(err, `\n occured while git diff`))
}