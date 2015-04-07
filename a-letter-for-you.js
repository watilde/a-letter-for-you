#!/usr/bin/env node
var fs = require('fs');
var https = require('https');
var openssl = require('openssl-wrapper');
var program = require('commander');
var tmpWrite = require('temp-write');
var ursa = require('ursa');
var pkg = require('./package.json');

program
  .version(pkg.version)
  .usage('-u <Target GitHub ID> -m <Message> [-o letter.txt]')
  .option('-u, --username [value]', 'Target GitHub ID')
  .option('-m, --message [value]', 'Write your message')
  .option('-o, --out [value]', 'Out your letter to a file')
  .parse(process.argv);

if (!program.username && !program.message) return program.help();
if (!program.username) return console.error('Missing required option "--username"');
if (!program.message) return console.error('Missing required option "--message"');

var username = program.username;
var message = program.message;
var out = program.out;
var keyFile;
var messageFile;

fetchPubKey(username, function (sshRsaPubkey) {
  encryptString(sshRsaPubkey, message)
});

function encryptString(pubKey, message) {
  var pem = ursa.openSshPublicKey(fs.readFileSync(pubKey, 'utf8')).toPublicPem();
  fs.writeFileSync(pubKey, pem);
  messageFile = tmpWrite.sync(message);
  var options = {encrypt: true, pubin: true, inkey: pubKey, in: messageFile};
  if (out) options.out = out;
  return openssl.exec(
    'rsautl',
    options,
    function(err, buffer) {
      fs.unlinkSync(keyFile);
      fs.unlinkSync(messageFile);
      if (err) return console.log(err);
      if (out) return console.log('Done')
      console.log(buffer.toString());
    }
  );
}

function fetchPubKey(userID, cb) {
  var options = {
    hostname: 'github.com',
    port: 443,
    path: '/' + username + '.keys',
    method: 'GET'
  };

  var req = https.request(options, function(res) {
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function () {
      keyFile = tmpWrite.sync(body.split('\n')[0]);
      cb(keyFile);
    });
  });
  req.end();

  req.on('error', function(e) {
    cb(e);
  });
}
