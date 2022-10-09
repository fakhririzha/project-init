module.exports = {
    db: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'database',
    },
    smtp: {
        host: 'smtphost.domain.com',
        port: 465,
        secure: true,
        auth: {
            user: 'email@domain.com',
            pass: 'password',
        },
    },
    baseUrl: 'http://localhost:3000',
    encryption: {
        key: 'TXAjwm8k53PJG9NacLbyZavvQB2qBh43',
        algorithm: 'aes-256-cbc',
    },
    expiredToken: new Date(Date.now() + 1000 * 60 * 60),
    expiredDefault: 365,
    nameGlobalCookie: 'nameGlobalCookie',
};
