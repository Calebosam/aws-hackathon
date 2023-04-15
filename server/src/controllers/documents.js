const db = require('../db');

exports.getDocuments = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM files')
        return res.status(res.statusCode).json({ success: true, data: rows })
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).json({ message: error.message })
    }
}

exports.postDocument = async (req, res) => {
    if (!req.files) {
        throw new Error('No files added')
    }
    const file = req.files.document;
    const fileName = file.name;
    const data = req.body;

    try {
        await file.mv('./uploads/' + fileName, function (err) {
            if (err) {
                //res.send(err);
                console.log(err);
            } else {
                console.log('Successfully uploaded')

                const filePath = `./uploads/${fileName}`;
                db.query('INSERT INTO files (title, description, file_path, user_id) values ($1, $2, $3, $4)', [data.title, data.description, filePath, data.user_uid])
            }
        })
        return res.status(res.statusCode).json({ success: true, message: 'File uploaded successfully' })
    } catch (error) {
        return res.status(res.statusCode).json({ message: error.message })
    }
}

exports.downloadFile = async (req, res) => {
    const { id } = req.params
    try {
        const { rows } = await db.query('SELECT * FROM files WHERE file_uid = $1', [id])
        await res.download(rows[0].file_path)
        const count = rows[0].num_downloads + 1;
        await db.query('UPDATE files SET num_downloads = $1 WHERE file_uid = $2', [count, id])
    } catch (error) {
        console.error(error.message)
    }
}