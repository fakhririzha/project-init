const { db: Database } = require('../../app.config');
const mysql = require('mysql');

const handler = async (req, res) => {
    const db = mysql.createConnection({
        host: Database.host,
        user: Database.user,
        password: Database.password,
        database: Database.database,
    });

    db.connect();

    db.query('SELECT * FROM table', (error, result) => {
        if (error) {
            res.status(500).end();
        } else if (result.length > 0) {
            res.status(200).json({
                error: false,
                success: true,
                message: 'Berhasil mendapatkan data.',
                data: result,
                metadata: {
                    params: `${req.body}`,
                    count: result.length,
                },
            });
        } else {
            res.status(404).json({
                error: true,
                success: false,
                message: 'Data tidak ada.',
                data: null,
                metadata: null,
            });
        }
    });

    db.end();
};

module.exports = handler;
