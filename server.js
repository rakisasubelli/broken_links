const express = require('express');
const app = express();
let path = require('path');
let bodyParser = require('body-parser');

let blc = require('broken-link-checker');
let nlc = require('node-linkchecker');
const brkn = require('brkn');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname,'public')));


app.get("/", function( req, res){
    res.render('index.html');
});
app.post("/getBrokenLinks", function(req, res){
	const brkn = require('brkn');
	
	// execute the function
	try{
		brkn([req.body.brokenLinkUrl], ['href'], req.body.brokenLinkUrl, {verbose: false});
	
		// then listen for the 'end' event
	
		brkn.events.on('end', function(brokenUrls) {
			console.log('Broken URLs:', brokenUrls);
			//=> 'Broken URLs: [...]'
			res.send(brokenUrls);
		});
		brkn.events.on('error', function(brokenUrls) {
			console.log('Broken URLs:', brokenUrls);
			//=> 'Broken URLs: [...]'
			//res.send(brokenUrls);
		});

	}catch (err){
		res.send(err);
	}
})

app.listen(3400, function(){
    console.log("example is listing on the port 3400");
});
