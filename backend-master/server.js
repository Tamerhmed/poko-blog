const express = require('express');
const connectDB = require('./config/connectDb');
const authRouter = require('./routes/authRoute');
const usersRouter = require('./routes/usersRoute');
const postsRouter = require('./routes/postsRoute');
const commentsRouter = require('./routes/commentsRoute');
const categoriesRouter = require('./routes/categoriesRoute');
const {errorHandler, notFound} = require('./middlewares/error');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());

//Cors policy
app.use(cors({
    origin: "http://localhost:3000"
}));

//Routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/categories', categoriesRouter);





if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res)=> {
        res.send('API is running ...');
    })
}


//error handler middleware
app.use(notFound);
app.use(errorHandler);



const port = process.env.PORT || 5000;


const start = async()=> {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=> {
            console.log(`Server is listing on ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();