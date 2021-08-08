#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

var inputFile = process.env.HOME + '/.sophia/tokens.json';
if (argv.input){
  inputFile = argv.input;
}

fs = require('fs')
fs.readFile(inputFile, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var oauth = JSON.parse(data);
//  console.log(oauth);
  for (let i = 0; i < oauth.length ; i++){
//	  console.log(decodeToken(oauth[i].tokens.accessToken));
    var decodedToken = decodeToken(oauth[i].tokens.accessToken);
    decodedToken.payload.nbf = new Date(1000 * decodedToken.payload.nbf);
    decodedToken.payload.auth_time = new Date(1000 * decodedToken.payload.auth_time);
    decodedToken.payload.exp = new Date(1000 * decodedToken.payload.exp);
    decodedToken.payload.iat = new Date(1000 * decodedToken.payload.iat);
    oauth[i].tokens.accessToken = decodedToken 
    oauth[i].tokens.refreshToken = decodeToken(oauth[i].tokens.refreshToken);
  }
  console.log(JSON.stringify(oauth));
});


function decodeToken(token){

  let parts = token.split('.');

  let header = JSON.parse(Buffer.from(parts[0], 'base64').toString('utf-8'));  
  let payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));  
  let signature = parts[2];  
  return decodedToken = {
	header: header,
	payload: payload,
	signature: signature
  }
}
