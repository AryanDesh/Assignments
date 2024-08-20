function findLargestElement(numbers) {
    numbers.sort();
    console.log(numbers[numbers.length - 1])
}

let numbers = [4, 2, 5, 1, 3];

findLargestElement(numbers);