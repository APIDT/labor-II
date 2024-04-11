const fs = require('fs')
const EventEmitter = require('events')

const eventEmitter = new EventEmitter()

function readTextFile(fileRead) {
    fs.readFile(fileRead, 'utf8', (err, success) => {
        if (err) {
            eventEmitter.emit('error', err)
            return
        }
        
        let modifiedText = '';
        for (let i = 0; i < success.length; i++) {
            if ((i + 1) % 3 === 0) {
                modifiedText += success[i].toUpperCase();
            } else {
                modifiedText += success[i];
            }
        }

        eventEmitter.emit('fileRead', modifiedText)
    })
}

const fileRead = 'text.text'

eventEmitter.on('fileRead', (success) => {
    console.log('File content successfully:', success);
});

eventEmitter.on('error', (err) => {
    console.error('Error occurred:', err)
})

readTextFile(fileRead)
