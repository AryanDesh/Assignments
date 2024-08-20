import fs from 'fs';

const fileCleaner =  async () => {
    let retrievedData : string  = "";
    fs.readFile("D:/100x/a.txt", "utf-8" , function(error: NodeJS.ErrnoException | null , data : string) {
        if( error ) console.log(error);
        else retrievedData = data.replace(/\s+/g, ' ').trim();
        retrievedData.trim();
        
        fs.writeFile("D:/100x/a.txt", retrievedData, function(error: NodeJS.ErrnoException | null){
            if(error) console.log(error);
        })
    })
}

function removeExtraSpaces(text: string) : string {
    return text.replace(/\s+/g, ' ').trim();
}
fileCleaner();