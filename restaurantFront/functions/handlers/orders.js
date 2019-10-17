const { db } = require('../util/admin'); 

exports.postOneOrder = (req, res) => {
    // if (req.body.body.trim() === '') {
    //   return res.status(400).json({ body: 'Body must not be empty' });
    // }

    console.log(req.body); 
    console.log(JSON.stringify(req.body.products));
    const products = JSON.parse(JSON.stringify(req.body.products));
    const newOrder = {
      products: products,
      userId: req.body.userId,
      username: req.body.username,
      createdAt: new Date().toISOString()
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