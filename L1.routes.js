const fs = require('fs');

const requestHandler = (req, res) => {
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
        return req.on('end', () => {   // i have added return here so that this gets executed, before the html part.
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) =>{
                res.statusCode = 302;
                res.setHeader('Location', '/')
                return res.end();
            });
            
        })   
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>');
    res.write('<head><title>My first Node server</title></head>');
    res.write('<body><h1>Hellow from my first Node server</h1></body>');
    res.write('</html>');
};
    

module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// }; another way of exporting

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text'; this is also a way to export.

// exports.handler = requestHandler;
// exports.someText = 'Some hard coded text'; this is also a shortcut to export.

