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
const employeeRoutes = require('./src/routes/employeeRoutes')
const ownerRoutes = require('./src/routes/ownerRoute')
const ownerCompanyRoutes = require('./src/routes/ownerCompanyRoute')
const vagonRoutes = require('./src/routes/vagonRoute')

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/employee', employeeRoutes)
app.use('/api/owner', ownerRoutes)
app.use('/api/owner-company', ownerCompanyRoutes)
app.use('/api/vagon', vagonRoutes)

// G'ildirak sexi
const vu53Routes = require('./src/routes/vu53Route')
const vu90Routes = require('./src/routes/vu90Route')
const vu91Routes = require('./src/routes/vu91Route')
const vu92Routes = require('./src/routes/vu92Route')
const vu93Routes = require('./src/routes/vu93Route')
const naplavkaRoutes = require('./src/routes/naplavkaRoute')

app.use('/api/gildirak-sexi/vu-53', vu53Routes)
app.use('/api/gildirak-sexi/vu-90', vu90Routes)
app.use('/api/gildirak-sexi/vu-91', vu91Routes)
app.use('/api/gildirak-sexi/vu-92', vu92Routes)
app.use('/api/gildirak-sexi/vu-93', vu93Routes)
app.use('/api/gildirak-sexi/naplavka', naplavkaRoutes)


// Telejka sexi
const prujinaRoutes = require('./src/routes/telejka/prujinaRoute')
const tyagaRoutes = require('./src/routes/telejka/tyagaRoute')

app.use('/api/telejka-sexi/prujina', prujinaRoutes)
app.use('/api/telejka-sexi/tyaga', tyagaRoutes)

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
