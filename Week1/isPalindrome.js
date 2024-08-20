function isPalindrome(str) {
    let str2 = str.split('').reverse().join('');
    if(str === str2) console.log("is Palindrome"); 
    else console.log("not a palindrome");
}
isPalindrome('abab');