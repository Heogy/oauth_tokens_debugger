fs = require('fs')
fs.readFile('/Users/vincentsolaberrieta/.sophia/tokens.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var oauth = JSON.parse(data);
//  console.log(oauth);
  for (let i = 0; i < oauth.length ; i++){
//	  console.log(decodeToken(oauth[i].tokens.accessToken));
    oauth[i].tokens["decodedAccessToken"] = decodeToken(oauth[i].tokens.accessToken);
    oauth[i].tokens["decodedRefreshToken"] = decodeToken(oauth[i].tokens.refreshToken);
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
