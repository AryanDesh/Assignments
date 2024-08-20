import fs from 'fs';


const read = async () => {
    fs.readFile("D:/100x//a.txt" , "utf-8" , function(err : NodeJS.ErrnoException | null, data : string) {
        if(err) console.log('no such file exists');
        else console.log (data);
    })
}

read();