const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    const method = req.method;
    const url = req.url;
    if(url === '/'){
         res.setHeader('Content-Type', 'text/html')
         res.write('<html>');
         res.write('<head><title>My first Node server</title></head>');
         res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
         res.write('</html>');
         return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) =>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            
            fs.writeFileSync('message.txt', message);

        })
        
        res.statusCode = 302;
        res.setHeader('Location', '/')
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>');
    res.write('<head><title>My first Node server</title></head>');
    res.write('<body><h1>Hellow from my first Node server</h1></body>');
    res.write('</html>');
});

server.listen(3000);


/* So notes along.. whole nodejs runs using a event driven architecture where
 if something happens this should execute. When there are listeners like in
 the server case here. So the core node application is managed by the event
 loop. This is because the whole node process uses only one single thread. */