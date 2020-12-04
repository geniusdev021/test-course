import csv from 'csvtojson/v2'
import path from 'path';

const csvFilePath = path.join(__dirname, '..', 'db/db.csv');

export default async function (req, res, next) {
    const thingsArray = await csv().fromFile(csvFilePath);
    req.things = thingsArray;
    next();
};