const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/api/courses', (req, res) => {
    res.send([1,2,3]);
})

app.post('/', (req, res) => {
    res.send('Got a POST request')
})

app.listen(port,() => console.log(`it's alive on http:localhost:${port}`)
)

app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
})