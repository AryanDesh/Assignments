import express, { Request, Response } from 'express';
import { signJwt, verifyJwt, decodeJwt, jwtPassword } from './Validation/JWT'; // Update the path to where you saved the JWT functions

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/auth/sign', (req: Request, res: Response) => {
    const username= req.headers['username'] as string | undefined;
    const password= req.headers['password'] as string | undefined;
    if(username && password) {
        const token = signJwt(username, password);
        if (token) {
            res.status(200).json({ token });
        } else {
            res.status(400).json({ message: 'Invalid username or password' });
        }
    }
});

app.post('/auth/verify', (req: Request, res: Response) => {
    const { token } = req.headers;

    if (typeof token !== 'string') {
        return res.status(400).json({ message: 'Token is required and must be a string' });
    }

    const isValid = verifyJwt(token);
    if (isValid) {
        res.status(200).json({ message: 'Token is valid' });
    } else {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});

app.post('/auth/decode', (req: Request, res: Response) => {
    const { token } = req.headers;

    if (typeof token !== 'string') {
        return res.status(400).json({ message: 'Token is required and must be a string' });
    }

    const decoded = decodeJwt(token);
    if (decoded) {
        res.status(200).json({ decoded });
    } else {
        res.status(400).json({ message: 'Invalid token format' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
