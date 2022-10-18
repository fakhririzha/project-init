const { smtp } = require('../../app.config');
const { createTransport } = require('nodemailer');

const handler = async (req, res) => {
    const transporter = createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: {
            user: smtp.auth.user, // SMTP username
            pass: smtp.auth.pass, // SMTP password
        },
    });

    // Send email
    transporter.sendMail(
        {
            from: `${req.body.from}`, // SMTP From
            to: `${req.body.to}`, // SMTP To
            subject: `${req.body.subject}`, // SMTP Subject
            html: `${req.body.html}`, // SMTP HTML
        },
        (err, info) => {
            if (err) {
                res.status(500).json(err);
            }

            if (info) {
                res.status(200).json({
                    message: 'Email sent',
                    serverResponse: info,
                });
            }
        }
    );
};

module.exports = handler;
