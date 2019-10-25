const functions = require('firebase-functions');
const { db, admin } = require('../util/admin'); 

exports.postOneOrder = (req, res) => {
    // if (req.body.body.trim() === '') {
    //   return res.status(400).json({ body: 'Body must not be empty' });
    // }
    console.log('Hello');
    console.log(req.body); 
    console.log(JSON.stringify(req.body.products));
    const products = JSON.parse(JSON.stringify(req.body.products));
    const newOrder = {
      products: products,
      userId: req.body.userId,
      username: req.body.username,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };
  
    db.collection('orders')
      .add(newOrder)
      .then((doc) => {
        const resOrder = newOrder;
        resOrder.orderId = doc.id;
        res.json(resOrder);
      })
      .catch((err) => {
        res.status(500).json({ error: 'something went wrong' });
        console.error(err);
      });
  };


  exports.testing = (req, res) => {

    res.status(200).json("Good");
  };


  // Can be use in Server/Cloud functions

  async function grantModeratorRole(email) {

    const user = await admin.auth().getUserByEmail(email);
    if (user.customClaims && (user.customClaims).moderator === true) {
      return; 
    }
    return admin.auth().setCustomUserClaims(user.uid, {
      moderator: true
    })
  }

// exports.addAdmin = functions.https.onCall((data, context) => {
// 	// if (context.auth.token.moderator !== true) {
// 	// 	return {
// 	// 		error: "Request not authorized. User must be a moderator to fulfill request."
// 	// 	};
// 	// }
// 	const email = data.email; 
// 	return grantModeratorRole(email).then(() => {
// 		return {
// 			result: `Request fulfilled! ${email} is now a moderator.`
// 		}
// 	})
// })

exports.addAdmin = (req, res) => { 

  const email = req.body.email; 
  console.log(email); 

	return grantModeratorRole(email).then(() => {
		return res.json(`result: Request fulfilled! ${email} is now a moderator.`);
		
	})
} 


