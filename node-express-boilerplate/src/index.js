import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import api from './api';
const port = 5000;

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("Hello world!");
})
// api router
app.use('/api', api);

app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`)
});

// Catch unhandled rejections
process.on('unhandledRejection', (err) => {
	console.error('Unhandled rejection', err);
	process.exit(1);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
	console.error('Uncaught exception', err);
	process.exit(1);
});