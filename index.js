const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

require('dotenv').config();
const app = express();
require('./database/mongodb');

const port = process.env.PORT;
const sslOptions = {
  key: fs.readFileSync('./ssl/private.key'),
  cert: fs.readFileSync('./ssl/certificate.crt'),
};

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

// ALL ROUTES
const clientRoutes = require('./routes/clientRoutes');
const adminRoutes = require('./routes/adminRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const pageRoutes = require('./routes/pageRoutes');
const uploadImageRoutes = require('./routes/uploadpaperRoutes');
const adsRoutes = require('./routes/adsRoutes');
const bookedAdsRoutes  = require('./routes/bookedAdsRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const slotRoutes = require('./routes/slotRoutes');
const successStoryRoutes = require('./routes/successStoryRoutes');

app.use('/client',clientRoutes);
app.use('/admin',adminRoutes);
app.use('/inquiry',inquiryRoutes);
app.use('/page',pageRoutes);
app.use('/upload',uploadImageRoutes);
app.use('/ads',adsRoutes)
app.use('/booked_Ads',bookedAdsRoutes);
app.use('/payment',paymentRoutes);
app.use('/slot',slotRoutes);
app.use('/success_Story',successStoryRoutes);

app.listen(port,() => {
    console.log(`server is running on ${port}`);
  })
// const server = https.createServer(sslOptions, app);

// server.listen(port, () => {
//   console.log(`server is running on https://localhost:${port}`);
// });

