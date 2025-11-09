require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');

const router = express.Router();



router.post('/orders', async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // YOUR RAZORPAY KEY
      key_secret: process.env.RAZORPAY_SECRET, // YOUR RAZORPAY SECRET
    });

    const options = {
      amount: 50000,
      currency: 'INR',
      receipt: 'some_random_tsr',
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send('Some error occured');
    console.log(order)
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/success', async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const shasum = crypto.createHmac('sha256', 'FH8XaWqQMIbS34SgeWxM9KRs');
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: 'Transaction not legit!' });

    console.log("payment successful")

    res.json({
      msg: 'success',
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

module.exports = router;