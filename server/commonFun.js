import fs, { readFile } from 'fs';
import * as constants from './constants.js';

const readItems = function (path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data));
        });
    })
}

const writeItems = function (path, items) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(items), (err) => {
            if (err) {
                reject(err);
            }
            resolve(items);
        });
    })
}

export function addItems(path, item) {
    return new Promise((resolve, reject) => {
      readItems(path).then((items) => {
        const resultItems = [...items];
        resultItems.push(item);
        writeItems(path, resultItems).then((_resultItems) => {
          resolve(_resultItems)
        }).catch((err) => {
          reject(err);
        })
      })
    });
}