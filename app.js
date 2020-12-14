const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT

app.use(express.json());

const authRoute = require('./routes/auth');

app.use('/api/users', authRoute);


app.get('/', (request, response) => {
  response.json({ info: 'Raticord experimental API' })
})


app.listen(port, () => {
  console.log(`Raticord started`)
})


