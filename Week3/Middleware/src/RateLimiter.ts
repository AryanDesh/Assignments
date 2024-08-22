import express  from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

type UserRate = {
    [key : string] : number
}

let UsersPerSecond : UserRate = {};

setInterval(()=> {
    UsersPerSecond = {};
}, 1000)

app.use((req, res, next) => {
    const user_id = req.headers['user_id'] as string | undefined;
    if(user_id){
        if(UsersPerSecond[user_id]){
            UsersPerSecond[user_id] += 1;
            if(UsersPerSecond[user_id]  > 5){
                return res.status(404).json({
                    message : "Too many tries"
                })
            }
        }
        else{
            UsersPerSecond[user_id] = 1;
        }
        next();
    }
    else {
        res.status(404).json({ message :"User cant be found" });
    }
})

app.get('/user', function(req, res) {
res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
res.status(200).json({ msg: 'created dummy user' });
});

app.listen(PORT, () => {
    console.log(`running on Port ${PORT}`)
})