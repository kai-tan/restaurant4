const functions = require('firebase-functions');
const { db, admin } = require('../util/admin'); 
const stripe = require('stripe')(functions.config().stripe.secret.key)
const cors = require('cors')({origin: true});
const nodemailer = require('nodemailer');

exports.postOneOrder = (req, res) => {
    // if (req.body.body.trim() === '') {
    //   return res.status(400).json({ body: 'Body must not be empty' });
    // }
    res.set('Access-Control-Allow-Origin', '*');
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
        res.status(500).send({ error: 'something went wrong' });
        console.error(err);
      });
  };


  exports.testing = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send("Good"); 
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

  // return cors(req, res, () => {
    // res.set('Access-Control-Allow-Origin', '*');
    const email = req.body.email; 
    console.log(email); 


    grantModeratorRole(email).then(() => {
      return res.send(`result: Request fulfilled! ${email} is now a moderator.`);
    })
  // })
  
} 


exports.payment = (req, res) => { 
  res.set('Access-Control-Allow-Origin', '*');
  console.log(req.body); 
  console.log('From the payment function in firebase functions')
    const body = {
        source: req.body.token.id,
        amount: req.body.amount, 
        currency: 'usd'
    }; 

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            console.log(stripeErr)
            res.status(500).send({ error: stripeErr });
        } else {
            console.log(stripeRes)
            res.status(200).send({ success: stripeRes });
        }
    })
}



exports.sendEmail = (req, res) => {
  console.log(req.body);

  var transport = {
    host: 'mail.xintesys.com',
    port: 465,
    secure: true,
    auth: {
      user: 'kai.tan@xintesys.com',
      pass: 'tpk@xts@2019'
    }
  }
  
  var transporter = nodemailer.createTransport(transport)
  console.log(transporter); 

  transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log('All works fine, congratz!');
      }
    });

    console.log(transporter); 

  var mail = {
    from: req.body.email,
    to: 'kai.tan@xintesys.com',  
    subject: req.body.subject,
    html: req.body.message
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
}