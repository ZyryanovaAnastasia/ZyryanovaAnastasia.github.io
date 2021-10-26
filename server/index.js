import express from 'express';
import cors from 'cors';
import * as commonFun from './commonFun.js';

const app = express();
app.use(cors());
app.use(express.static('./static'));

app.get('/', (response, request) => {
    request.send('hellow');
});

app.listen('8000', () => {
    console.log('server is run')
})