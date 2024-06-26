const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const {xss} = require('express-xss-sanitizer');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

//Load env vars
dotenv.config({ path: './config/config.env' });

process.env.TZ = 'Asia/Bangkok';

//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());
app.use(cookieParser());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //10 mins
    max: 1000
});

app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Enable CORS
app.use(cors());

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: "A simple Express Hotel Booking API",
        },
        servers: [
            {
                url: process.env.HOST + ':' + process.env.PORT + '/api/v1'
                // url: 'https://cedt-se-project-raonow.vercel.app/api/v1'
            }
        ],
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const hotel = require('./routes/hotel');
const booking = require('./routes/booking');
const auth = require('./routes/auth');
const member = require('./routes/member');
const campaign = require('./routes/campaign');
const coupon = require('./routes/coupon');

app.use('/api/v1/hotel', hotel);
app.use('/api/v1/booking', booking);
app.use('/api/v1/auth', auth);
app.use('/api/v1/member', member);
app.use('/api/v1/campaign', campaign);
app.use('/api/v1/coupon', coupon);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(() => process.exit(1));
});