const fs = require('fs')
const EventEmitter = require('events')

const eventEmitter = new EventEmitter()

function readTextFile(fileRead) {
    const stream = fs.createReadStream(fileRead, { encoding: 'utf8' })

    let modifiedText = ''
    let position = 0

    stream.on('data', (chunk) => {
        for (let i = 0; i < chunk.length; i++) {
            if ((position + i + 1) % 3 === 0) {
                modifiedText += chunk[i].toUpperCase()
            } else {
                modifiedText += chunk[i]
            }
        }
        position += chunk.length
    });

    stream.on('end', () => {
        eventEmitter.emit('fileRead', modifiedText)
    });

    stream.on('error', (err) => {
        eventEmitter.emit('error', err)
    });
}

const fileRead = 'text.txt'

eventEmitter.on('fileRead', (success) => {
    console.log('File content successfully:', success)
});

eventEmitter.on('error', (err) => {
    console.error('Error occurred:', err)
})

readTextFile(fileRead)
