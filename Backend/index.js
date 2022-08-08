const express = require('express')
const app = express()
var cors = require('cors')
const fileupload = require("express-fileupload");
app.use(fileupload());

app.use(cors())

const port = 5000;

app.get('/', (req, res) => {
    console.log("server is running pyar se");
    res.json("Server is running pyar se");
})

app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    // console.log(req.files);
    const posi = process.env.UPLOADING_PATH;
    const file = req.files.file;

    file.mv(`${posi}${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
});

app.listen(process.env.PORT || port, () => {
    console.log(`backend listening on port ${port}`)
})