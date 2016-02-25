var Proxy = require('browsermob-proxy').Proxy;

exports.setupProxy = function(nightwatch, callback) {


  var nightwatchClient = nightwatch.client || nightwatch,
    _proxyHost = 'localhost';
  _proxyPort = '9095';

  nightwatchClient.proxy = new Proxy({
    host: _proxyHost,
    port: _proxyPort
  });

  console.log('Requesting new proxy port from: ' + _proxyHost + ':' + _proxyPort);
  nightwatchClient.proxy.start(function(err, data) {

    if (err !== null) {
      // Console.error("Proxy Connection error: " + err);
      throw new Error('Failed to connect to Proxy: ' + err);
    }
    var proxyPort = data.port;

    var proxyUrl = 'localhost' + ':' + proxyPort;
    nightwatchClient.options.desiredCapabilities.proxy = {
      proxyType: 'manual',
      httpProxy: proxyUrl
    };
    console.log('Setup proxy [" + JSON.stringify(nightwatchClient.options.desiredCapabilities.proxy.httpProxy) + "] with port [" + proxyPort + "]');

    nightwatchClient.proxyPort = proxyPort;
    console.log('proxyPort: ' + nightwatchClient.proxyPort);
    if (typeof callback === 'function') {
      callback();
    }
  });
};