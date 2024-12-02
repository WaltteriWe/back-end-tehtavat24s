import express from 'express';
import mediaRouter from './routes/media-router.js';
import authRouter from './routes/auth-router.js';
import { errorHandler, notFoundHandler } from './middlewares/error-handlers.js';
import cors from 'cors';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

// bind base url for all media routes to mediaRouter
// set up pug as view engine
app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());

// Home page (client) as static html, css, js
app.use(express.static('public'));
// Uploaded media files
app.use('/media', express.static('media'));

// Api documentation tms. with pug

//media resource endpoints
app.use('/api/media', mediaRouter);

//likes resource endpoints
app.use('/api/likes', mediaRouter);

//ölkasj
app.use('/api/users', authRouter);


//login resource endpoints
app.use('/api/auth', authRouter);

//user resource endpoints
// app.use('/api/users', userRouter);

// Default for all routes not handled by routers above
app.use(notFoundHandler);
// Add error handler middleware as the last middleware in the chain
app.use(errorHandler);

app.use(cors());


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
