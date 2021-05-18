let express = require('express');

let app = express();
let handlebars = require('express-handlebars').create({defaultLayout:'main'});
let request = require('request');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 58293);
app.use(express.static('public'));

let key = 'd38e842ac476454d18109f49c5cef3e6';

app.get('/', function(req, res, next) {
	let context = {};
	request('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=' + key, function(err, res, next){
		if (!err && response.statusCode < 400) {
			context.owm1 = body;

			//second request
			request('http://api.openweathermap.org/data/2.5/weather?q=Denver&APPID=' + key, function(err, res,next) {
				if (!err && response.statusCode < 400) {
					context.owm2 = body;
					res.render('weather', context);
				} else {
					console.log(err);
					if(response) {
						console.log(response.statusCode);
					}
					next(err);
				}
			}
		}
	});
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

