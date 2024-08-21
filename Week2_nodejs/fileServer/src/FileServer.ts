import express from 'express';
import fs from 'fs/promises'; // Use promises-based fs module
import path from 'path';

const app = express();
const filesDir = path.resolve(__dirname, '../../../../files'); // Resolve the directory path

app.use(express.json());

app.get('/files/:filename', async (req, res) => {
    const filename = path.basename(req.params.filename); 
    const filePath = path.join(filesDir, filename);

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(404).json({
            message: "File not found or could not be read"
        });
    }
});

app.get('/files', async (req, res) => {
    try {
        const files = await fs.readdir(filesDir);
        res.json(files);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Could not list files"
        });
    }
});

app.all('*', (req, res) => {
    res.status(404).send('Route not found');
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
