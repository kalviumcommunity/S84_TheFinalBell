const express = require('express')
const app = express()
const PORT = 2524;

app.use(express.json());

app.get('/ping' , (req , res) => {
    res.send('This is Home Route')
})

app.listen(PORT , () => {
    console.log(`Server is running at : http://localhost:${PORT}`)
})