function countVowels(str) {
    const vowels = 'aeiouAEIOU';
    let count = 0;
    for(let i = 0 ; i < str.length ; i++){
        if(vowels.includes(str.charAt(i))) count++;
    }
    console.log(count);

}

countVowels("abcde");