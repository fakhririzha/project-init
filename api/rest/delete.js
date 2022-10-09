import { db as Database } from '@appConfig';
import { createConnection } from 'mysql';

const handler = async (req, res) => {
    if (!req.body.sample_a) {
        res.status(400).json({
            error: true,
            success: false,
            message: 'Parameter sample_a tidak ada.',
            data: null,
        });
    } else {
        const db = createConnection({
            host: Database.host,
            user: Database.user,
            password: Database.password,
            database: Database.database,
        });

        db.connect();

        db.query(
            'DELETE FROM table WHERE sample_a = ?',
            [req.body.booking_id],
            (error, result) => {
                if (error) {
                    res.status(500).json(error);
                } else if (result.affectedRows > 0) {
                    res.status(200).json({
                        error: false,
                        success: true,
                        message: 'Berhasil menghapus data.',
                        data: result,
                    });
                } else if (result.affectedRows === 0) {
                    res.status(500).json({
                        error: true,
                        success: false,
                        message: 'Gagal menghapus data.',
                        data: result,
                    });
                } else {
                    res.status(500).end();
                }
            }
        );

        db.end();
    }
};

export default handler;
