const express = require('express')
const app = express()
const PORT = 2524;

app.use(express.json());

app.get('/ping' , (req , res) => {
    res.send('This is Home Route')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(PORT , () => {
    console.log(`Server is running at : http://localhost:${PORT}`)
})