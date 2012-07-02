// Generated by CoffeeScript 1.3.3
(function() {
  var port;

  port = Number(process.env.PORT || 3000);

  require("zappa")(port, function() {
    this.register({
      html: require('ejs')
    });
    this.set({
      'view engine': 'html',
      'views': __dirname + "/views",
      'view options': {
        layout: false
      }
    });
    this.use({
      "static": __dirname + '/public'
    });
    return this.app.get('/', function(req, res) {
      return res.json({
        data: {
          email: 'mehta.ekta@gmail.com',
          password: 'ekta123'
        }
      });
    });
  });

}).call(this);
