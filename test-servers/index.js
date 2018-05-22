const authApp = require('./auth').app; 
const getMonitor = require('./monitor'); 

authApp.listen(3001, () => console.log('Auth server is running on port 3001!'));

const start = 3002;
const n = 5;

for (let port = start; port < start + n; ++port) {
    const monitorApp = getMonitor();
    monitorApp.listen(port, () => console.log('Monitor server is running on port ' + port + '!'));
}
