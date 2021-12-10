import express from 'express'
import cors from 'cors'
import routes from './presentation/routes'

const server = express()
const port = 3333

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(port, () =>
    console.log(`Server running in http://localhost:${port}`)
)
