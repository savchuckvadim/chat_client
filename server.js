
var express = require('express');
const path = require('path')
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});
app.listen(PORT);

//Change at packege.json
//"start": "node server.js",
//"start": "react-scripts start",


//TODO on server
//https://www.npmjs.com/package/forever
//[sudo] npm install forever -g
//213.139.210.98
//PN8j&Yb*6Hve

//second server!
//213.139.209.84
//Vadimsa1988!