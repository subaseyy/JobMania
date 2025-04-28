const express = require('express')

app = express()

app.route('/', (req, res) => {
    res.send('Hello World')
}
)
app.listen(3000, () => {
    console.log('Server is running on port 5500')
}
)