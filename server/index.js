import express from 'express';
import cors from 'cors';
import * as commonFun from './commonFun.js';
import * as constants from './constants.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./static'));

app.patch('/api', (res, req) => {
    commonFun.addItems(constants.BASKET_PATH, res.body).then((items) => {
        req.setHeader('Content-type', 'application/json');
        req.send(items);
    });
})

app.get('/', (response, request) => {
    request.send('hellow');
});

app.listen('8000', () => {
    console.log('server is run')
})