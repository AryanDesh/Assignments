const anagram = (word1, word2)=>{
    const array1 = word1.split('');
    const array2 = word2.split('');
    word1 =array1.sort().join('');
    word2 = array2.sort().join('');
    if(word1 == word2) console.log("anagrams");
    else console.log("not anagrams")
}

anagram("aryan", "ryana");
