var express = require('express');

var app = module.exports = express.createServer();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.post('/badcop', function(req,res) {
    
    res.send('ok');
    res.end();
});

app.get('/move/forward/:count',function(req,res){
    var count = req.params.count;
    res.send('moving forward ')
});
app.listen(8001);
console.log("TC GitHub Status Updater listening on port %d in %s mode", app.address().port, app.settings.env);
