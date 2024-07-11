import http from 'http'
import fs from 'fs/promises'
import url from 'url'
import path from 'path'
const PORT = process.env.PORT

// Get the current path
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = http.createServer( async (req, res) => {
   // create router 
   try {
      if (req.method === "GET") {
         let filepath
         if (req.url === '/') {
            // res.writeHead(200, { 'Content-Type': 'text/html'})
            // // res.write('Hello world!')
            // res.end('<h1>Home Page!</h1>')

            filepath = path.join(__dirname, 'public', 'index.html')
         } else if (req.url === "/about") {
            filepath = path.join(__dirname, 'public', 'about.html')
         } else {
            throw new Error('Not Found')
         }

         const data = await fs.readFile(filepath)
         res.setHeader('Content-Type', 'text/html')
         res.write(data)
         res.end()
      } else {
         throw new Error('Method not allowed')
      }
   } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain'})
      res.end('Server Error')
   }
    // res.setHeader('Content-Type', 'text/html')
    // res.statusCode = 404
   //  console.log(req.url)
   //  console.log(req.method)

 })

 server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
 })