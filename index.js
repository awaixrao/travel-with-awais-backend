const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const UserRouter = require("./routes/user.routes");
const TourRouter = require("./routes/tour.routes");
const BookingRouter = require("./routes/booking.routes");
const PaymentRouter = require("./routes/payment.routes");






const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());




app.get('/', (req, res) => {
  res.send('Hello World!')
});





// User Route
app.use("/user", UserRouter);

// tour Route
app.use("/tour", TourRouter);
// Ubookinger Route
app.use("/booking",BookingRouter );

//payment

app.use("/payment",PaymentRouter );








// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/travellingDb")
  .then(() => {
    app.listen(port, () => console.log(`Server & DB is up on port ${port}...`));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
