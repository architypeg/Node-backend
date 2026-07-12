const http = require('http')
const requestHandler = require('./L1.routes')

const server = http.createServer(requestHandler);

server.listen(3000);


/* So notes along.. whole nodejs runs using a event driven architecture where
 if something happens this should execute. When there are listeners like in
 the server case here. So the core no de application is managed by the event
 loop. This is because the whole node process uses only one single thread. */