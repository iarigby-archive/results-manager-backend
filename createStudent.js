const backend = require('./kuzzle')

// eMgeUm8BqR86sytD2Opx
const createStudent = async () => {
    const newStudent = await backend.createID(
        {
            id: "Aroba18",
            file: "server_room.s"
        },
        "someid"
    )
    console.log(newStudent._id)
}

const deleteAll = async () => {
    const results = await backend.getAll()
    console.log(results)

    const toDelete = []

    results.hits.forEach((res) => {
        toDelete.push(backend.delete(res._id))
    })
    await Promise.all(toDelete)
    await backend.refresh()
}

const main = async () => {
    await backend.kuzzle.connect();
    await backend.refresh()
    await deleteAll()
    await createStudent()
    backend.kuzzle.disconnect()
}

main()