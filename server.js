// Generated by CoffeeScript 1.3.3
(function() {
  var port;

  port = Number(process.env.PORT || 5000);

  require("zappa")(port, function() {
    return this.app.get('/', function(req, res) {
      return this.render('index');
    });
  });

}).call(this);