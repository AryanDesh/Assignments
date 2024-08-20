// Counter up for every second time goes by
let count = 0;
const counter = async () => {
    setInterval(() => {
        count++;
        console.log(count);
    }, 1000)
}

const counterUsingSetTimeout = async () =>{
    console.log(count);
    count++;
    setTimeout(counterUsingSetTimeout, 1000)
}

counter();
