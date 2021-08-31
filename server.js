const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path');
const LoginMiddleware = require('./Middleware/LoginMiddleware');

const authRoutes = require('./routes/auth');
const tutorRoutes = require('./routes/tutor');
const commonRoutes = require('./routes/common');
const studentsRoutes = require('./routes/student');

const app = express();
const port = process.env.PORT || 7777;


const MongoURI = 'mongodb+srv://aman:N6m8dWk7WsNXbgla@cluster0.ijtx4.mongodb.net/goClass?retryWrites=true&w=majority';
mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {console.log(err)});

app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
  });

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.use('/images', express.static(path.join('images')));
app.use('/files', express.static(path.join('files')));
app.use('/auth', LoginMiddleware, authRoutes);
app.use('/tutor', LoginMiddleware, tutorRoutes);
app.use('/common', LoginMiddleware, commonRoutes);
app.use('/student', LoginMiddleware, studentsRoutes);



const server = app.listen(port, () => {
    console.log(`Listening on PORT: ${port}...`);
});

