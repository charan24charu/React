import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataFilePath = path.join(__dirname, 'data.json')

const readUsers = () => {
  const raw = fs.readFileSync(dataFilePath, 'utf8')
  return JSON.parse(raw)
}

const writeUsers = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.url === '/users' && req.method === 'GET') {
    const data = readUsers()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(data))
    return
  }

  if (req.url === '/users' && req.method === 'POST') {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}')
        const data = readUsers()
        data.users = data.users || []
        data.users.push(payload)
        writeUsers(data)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true, user: payload }))
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: error.message }))
      }
    })

    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ success: false, message: 'Route not found' }))
})

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000')
})
