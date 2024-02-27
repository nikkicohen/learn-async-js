const array2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, -9]
];

function negPerRow(arr, rowIdx) {
    return new Promise((resolve, reject) => {
        if (arr.length > rowIdx) {
            setTimeout(() => {
                arr[rowIdx].filter((e) => {
                    return e < 0;
                }).length > 0 ? resolve(`Found Evidence : ${arr[rowIdx]}`) : reject(`No Evidence : ${arr[rowIdx]}`);
            }, 0);
        }
        else {
            reject(`Row index ${rowIdx} must be within 0 and ${arr.length - 1}`);
        }
    })
}

negPerRowPromises = [];

for (let x = 0; x < array2D.length; x++) {
    negPerRowPromises.push(negPerRow(array2D, x));
}

Promise.any(negPerRowPromises)
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.error(error);
    });