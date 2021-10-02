import express from 'express'
import routes from './presentation/routes'

const server = express()

server.use(express.json())
server.use(routes)

server.listen(3000, () => console.log('Server running'))
