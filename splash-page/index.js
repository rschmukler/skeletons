var express = require('express'),
    app     = express();


app.use(express.static(__dirname + '/public'));
console.log("Listening on port 3000...");
app.listen(3000);

