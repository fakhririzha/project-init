/* eslint-disable comma-dangle */
/* eslint-disable max-len */
const { db: Database } = require('../../app.config');
const mysql = require('mysql');

const handler = async (req, res) => {
    if (!req.body.sample_a) {
        res.status(400).json({
            error: true,
            success: false,
            message: 'Parameter sample_a tidak ada.',
            data: null,
        });
    } else {
        const db = mysql.createConnection({
            host: Database.host,
            user: Database.user,
            password: Database.password,
            database: Database.database,
        });

        db.connect();

        const data = {
            sample_a: req.body.sample_a,
            sample_b: req.body.sample_b ? req.body.sample_b : null,
        };

        let query = 'UPDATE tabel SET ';

        if (data.booking_pic_name) {
            if (query === 'UPDATE booking SET ') {
                query += `booking_pic_name = "${data.booking_pic_name}"`;
            } else {
                query += `, booking_pic_name = "${data.booking_pic_name}"`;
            }
        }

        query += ` WHERE sample_a = ${data.sample_a}`;

        db.query(query, (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else if (result.affectedRows > 0) {
                res.status(200).json({
                    error: false,
                    success: true,
                    message: 'Berhasil memperbaharui data.',
                    data: result,
                });
            } else {
                res.status(500).json({
                    error: true,
                    success: false,
                    message: 'Gagal memperbaharui data.',
                    data: null,
                });
            }
        });

        db.end();
    }
};

module.exports = handler;
