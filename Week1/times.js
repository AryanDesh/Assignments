function times(n) {
    console.log(new Date().getTime());
    let sum = 0 ;
    for(let i = 0 ; i  < n ; i++){
        sum += i;
    }
    console.log(new Date().getTime());
}

// times(100);
// times(1000);
times(0);