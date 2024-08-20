import fs from 'fs';

const data : string = "Aryan Deshmukh says Hello Back";
const write = async () => {
    fs.writeFile("D:/100x/a.txt", data , (err: NodeJS.ErrnoException | null) => {
        if(err) console.log("Couldnt write to the given file");
    })
}
write();