require('dotenv').config();
const express = require("express");
const dbConnect = require('./config/db')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();

dbConnect()
app.use(cors({ origin: '*', methods: 'GET, PUT, PATCH, POST, DELETE' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());


//Import and use routes
const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')
const ownerRoutes = require('./src/routes/ownerRoute')
const ownerCompanyRoutes = require('./src/routes/ownerCompanyRoute')
const vagonRoutes = require('./src/routes/vagonRoute')

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/owner', ownerRoutes)
app.use('/api/owner-company', ownerCompanyRoutes)
app.use('/api/vagon', vagonRoutes)

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; font-src 'self' data:;"
  );
  next();
});

const PORT = process.env.PORT || 3000;
  
 app.listen(PORT, async () => {
   console.log(`Server is running on port ${PORT}`);
 });
