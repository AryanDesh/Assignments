const transactions = [
    {
        id: 1,
        timestamp: 1656076800000, // Unix timestamp
        price: 10,
        category: 'Food',
        itemName: 'Pizza',
    },
    {
        id: 2,
        timestamp: 1656163200000, 
        price: 20,
        category: 'Electronics',
        itemName: 'Headphones',
    },
    {
        id: 3,
        timestamp: 1656249600000, 
        price: 15,
        category: 'Books',
        itemName: 'JavaScript Guide',
    },
    {
        id: 4,
        timestamp: 1656336000000, 
        price: 25,
        category: 'Clothing',
        itemName: 'Jacket',
    }
];

function calculateTotalSpentByCategory (transactions) {
    let result = new Map();
    for(let transaction of transactions){
        result.set(transaction.category, transaction.price + getOrDefault(result, transaction.category, 0))
    }
    result.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      }

function getOrDefault(map, key, defaultValue) {
    return map.has(key) ? map.get(key) : defaultValue;
  }

 

calculateTotalSpentByCategory(transactions);