/* eslint-disable no-console */
const express = require('express');
const next = require('next');
const blocker = require('express-user-agent-blocker');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

const app = next({
    dev: process.env.NODE_ENV !== 'production',
    hostname,
    port,
});
const handle = app.getRequestHandler();
const { json } = express;

// Email API
const sendEmail = require('./api/email/send');

// Image Upload API
const uploadImage = require('./api/image/upload');

app.prepare().then(() => {
    const server = express();

    const botList = fs
        .readFileSync('./botlist.txt')
        .toString()
        .split('\n')
        .filter(Boolean);

    // block bot
    server.use(blocker(botList, { text: 'Unauthorized request' }));

    server.use(json({ limit: '10MB' }));

    server.get('*', (req, res) => handle(req, res));

    // Email API
    server.post('/api/email/send', sendEmail);

    // Image Upload API
    server.post('/api/image/upload', uploadImage);

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});
