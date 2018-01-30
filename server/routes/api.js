const express = require('express');
const router = express.Router();
const request = require('request');
const moment = require('moment');
const crypto = require('crypto');

router.param('action', function (req, res, next, action) {
    if (/^[a-zA-Z]+$/.test(action)) {
        next();
    } else {
        const err = new Error('Action is not valid.');
        err.status = 400;
        next(err);
    }
});

router.param('username', function (req, res, next, action) {
    if (/^[a-zA-Z\.\@[0-9]+$/.test(action)) {
        next();
    } else {
        const err = new Error('Username is not valid.');
        err.status = 400;
        next(err);
    }
});

router.all('/*', function(req, res, next) {
    if (!req.params[0].length) {
        const err = new Error('Bad request.');
        err.status = 400;
        next(err);
    } else {
        next();
    }
});

router.all('/:action/:username*?', function(req, res, next) {

    let config = {
        apiKey: '**************',
        secretKey: '********************',
    };
    if (process.env.NODE_ENV === 'production') {
        config.host = 'https://api-connect.example.com';
    } else {
        config.host = 'https://dev-api.example.com';
    }

    let apiParams = {
        action: req.params.action,
        apiKey: config.apiKey,
        username: req.params.username,
        apiVersion: '1.1',
        signatureVersion: '2.0',
        signatureMethod: 'HmacSHA256',
        timestamp: moment().format('YYMMDDHHmmssZZ'),
        responseFormat: 'JSON'
    };

    apiParams.signature = crypto
        .createHmac('sha256', config.secretKey + (req.headers.secretkey ? req.headers.secretkey : ''))
        .update(Object
            .keys(apiParams)
            .filter(key => apiParams[key] !== undefined && apiParams[key].length)
            .map(key => apiParams[key])
            .join('/'))
        .digest('base64')
        .replace(/\//g, '_')
        .replace(/\+/g, '-')
        .replace(/=/g, '');

    const url = config.host
        + '/rest/action/'
        + req.params.action + '/'
        + apiParams.apiKey + '/'
        + (apiParams.username ? apiParams.username + '/' : '')
        + apiParams.apiVersion + '/'
        + apiParams.signatureVersion + '/'
        + apiParams.signatureMethod + '/'
        + apiParams.signature + '/'
        + apiParams.timestamp + '/'
        + apiParams.responseFormat;

    console.log('request api: %s %s\n' +
    '            %s', req.method, url, JSON.stringify(req.body));

    const options = {
        port: 80,
        url: url,
        qs: req.query,
        method: req.method,
        rejectUnauthorized: false,
        json: req.body,
        headers: [
            {'Content-Type': 'application/json'},
            {'Accept': 'application/json'}
        ]
    };

    request(options)
        .on('error', function(err) {
            console.log('request to api:error', err);
            next(err);
        })
        .pipe(res);
});

module.exports = router;
