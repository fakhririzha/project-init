const fs = require('fs');

const handler = async (req, res) => {
    const buffer = Buffer.from(req.body.base64, 'base64');
    try {
        fs.writeFileSync(
            `./public/img/products/${req.body.uniqueId}-${req.body.fileName}`,
            buffer
        );
        res.status(200).send('Image upload success');
    } catch (err) {
        res.status(500).end();
    }
};

module.exports = handler;
