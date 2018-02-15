var exec = require('cordova/exec');

exports.auth = function (arg0, success, error) {
    exec(success, error, 'aerogear-auth-plugin', 'auth', [arg0]);
};
