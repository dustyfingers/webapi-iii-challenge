const server = require('./server.js');

const port = 8001;
server.listen(port, () => console.log(`\n Listnening on port ${port} \n`));