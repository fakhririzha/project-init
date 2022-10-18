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

    const data = {
        sample_a: req.body.sample_a,
        sample_b: req.body.sample_b,
    };

    db.query('INSERT INTO table SET ?', data, (errorInsert, resultInsert) => {
        if (errorInsert) {
            res.status(500).json(errorInsert);
        } else {
            res.status(200).json({
                error: false,
                success: true,
                message: 'Berhasil menambahkan data.',
                data: {
                    id: resultInsert.insertId,
                    ...data,
                },
            });
        }
    });
    db.end();
};

module.exports = handler;
