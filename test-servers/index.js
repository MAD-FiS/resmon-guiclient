const authApp = require('./auth').app; 
const monitorApp = require('./monitor'); 

authApp.listen(3001, () => console.log('Auth server is running on port 3001!'));
monitorApp.listen(3002, () => console.log('Monitor server is running on port 3002!'));
