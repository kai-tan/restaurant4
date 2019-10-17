const express = require('express');
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const path = require('path'); 

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const hi = () => {
    const you = 3;
    console.log('Hihi', you);
}

hi(); 

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("DB Connected"));

const app = express(); 
const port = process.env.PORT || 5000; 

// middlewares 
app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser())
app.use(cors())


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'restaurantFront/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'restaurantFront/build','index.html'));
    })
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port' + port);
})

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount, 
        currency: 'usd'
    }; 

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    })
})


