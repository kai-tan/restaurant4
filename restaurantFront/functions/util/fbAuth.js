const { admin, db } = require('./admin');
const {OAuth2Client} = require('google-auth-library');

module.exports = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('No token found');
    return res.status(403).json({ error: 'Unauthorized' });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      return next();
    })
    .catch((err) => {
      console.error('Error while verifying token ', err);
      return res.status(403).json(err);
    });

    // const client = new OAuth2Client("1019933584778-4ho5r1766k343jhrktluuovprk5ffoib.apps.googleusercontent.com");
    // client.verifyIdToken({
    //     idToken: idToken,
    //     audience: "1019933584778-4ho5r1766k343jhrktluuovprk5ffoib.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
    //     // Or, if multiple clients access the backend:
    //     //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    // }).then((ticket) => {
    //     const payload = ticket.getPayload();
    //     const userid = payload['sub'];
    //     return next();
    // }).catch((err) => {
    //     return res.status(404).json(err);
    // })
    
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
};

// const client = new OAuth2Client(1019933584778);
// async function verify() {
//   const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   const userid = payload['sub'];
//   // If request specified a G Suite domain:
//   //const domain = payload['hd'];
// }
// verify().catch(console.error);