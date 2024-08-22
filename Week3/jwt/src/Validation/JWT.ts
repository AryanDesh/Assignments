// Write a function that takes in a username and password and returns a JWT token with the username encoded. Should return null if the username is not a valid email or if the password is less than 6 characters. Try using the zod library here
// Write a function that takes a jwt as input and returns true if the jwt can be DECODED (not verified). Return false otherwise
// Write a function that takes a jwt as input and returns true if the jwt can be VERIFIED. Return false otherewise
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const jwtPassword = 'secret';
const UserSchema = z.object({
    username : z.string().email(),
    password : z.string().min(6)
});
type InferSchema = z.infer<typeof UserSchema>;
const signJwt = (username: string, password: string) => {
    try {
        UserSchema.parse({
            username , password
        });
    } catch {
        return null;
    }
    const payload = { username, password };
    return jwt.sign(payload, jwtPassword, { expiresIn: '1h' });
}


const verifyJwt = (token: string) : boolean => {
    try{
        jwt.verify(token, jwtPassword);
        return true;
    }
    catch(e){
        return false;
    }
}
function decodeJwt(token: string) {
    try {
        return jwt.decode(token) || false;
    } catch {
        return false;
    }
}
export {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword,
  }