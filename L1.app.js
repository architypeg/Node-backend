const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req);
});

server.listen(3000);

/* So notes along.. whole nodejs runs using a event driven architecture where
 if something happens this should execute. When there are listeners like in
 the server case here. So the core node application is managed by the event
 loop. This is because the whole node process uses only one single thread. */