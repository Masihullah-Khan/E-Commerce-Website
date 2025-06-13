// 1. Required modules
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


// 2. Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const orderSchema = new mongoose.Schema({
  userEmail: String,
  productName: String,
  quantity: Number,
  price: Number,
  total: Number,
  address: String,
  paymentMethod: String,
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
const User = mongoose.model('User', userSchema);


app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("This email is already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    console.log("✅ User added:", email);
    res.status(200).send("🎉 Signup successful!");
  } catch (err) {
    console.error("❌ Error during signup:", err);
    res.status(500).send("Something went wrong!");
  }
});


app.post('/api/orders/place-order', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(200).json({ message: 'Order placed successfully ✅' });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});



app.get('/api/orders/my-orders', async (req, res) => {
  const { email } = req.query;
  try {
    const orders = await Order.find({ userEmail: email }).sort({ date: -1 });
    res.json({ orders} );
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});



// 3. MongoDB Atlas connection
mongoose.connect('mongodb+srv://78khanfardeen:fardeen78khan@masiullahcluster.uzo0m4w.mongodb.net/ecommerce',

)
  .then(() => console.log('✅ MongoDB Atlas Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Failed:', err));


// 4. Default Route
app.get('/', (req, res) => {
  res.send('🛒 Welcome to E-Commerce Backend!');
});


// 5. Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("User not found! 😓");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send("Incorrect password! 🔒");
        }

        // 🎉 Login successful
        res.send("Login successful! ✅");

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send("Server error!");
    }
});
