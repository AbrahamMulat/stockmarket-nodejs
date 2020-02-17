//simple stock market App by Abraham Mulat

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

//use bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));

//API KEY pk_c8a10aafe92343d8aa4129bdc75d3a75
//create call API function
function call_api(finishedAPI,ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker +'/quote?token=pk_c8a10aafe92343d8aa4129bdc75d3a75', { json: true}, (err, res, body) => {
	if (err) { return console.log(err);}	
	   if (res.statusCode == 200) {
	  	//console.log(body);
	  	finishedAPI(body);
	 	 }
	});
};


//set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//set handlebar index GET routes
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
		res.render('home', {
    	stock: doneAPI
    	});
	}, "fb");	
});
//set handlebar index POST routes
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
		//posted_stuff = req.body.stock_ticker;
		res.render('home', {
		stock: doneAPI,
    	//posted_stuff:posted_stuff
    	});
	}, req.body.stock_ticker);	
});

//Create about page routes
app.get('/aboutme.html', function (req, res) {
    res.render('abouthand');
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server listening on port: ' + PORT));






