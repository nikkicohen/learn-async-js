const array2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

/* my approach with google help */

function sumConcurrentlyArray(arr) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(arr)) {
            reject('BAD INPUT: Expected array as input');
        }

        const promises = arr.map(subArr => {
            return new Promise((subResolve, subReject) => {
                let sum = 0;
                for (let i = 0; i < subArr.length; i++) {
                    sum += subArr[i];
                }
                subResolve(sum);
            });
        });

        Promise.all(promises)
            .then(results => {
                const totalSum = results.reduce((acc, curr) => acc + curr, 0);
                resolve(totalSum);
            })
            .catch(error => {
                reject(error);
            });
    });
}

sumConcurrentlyArray(array2D)
    .then(result => {
        console.log('Sum:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });


/* professor's approach */

function sumOfARow(arr, rowIdx) {
    return new Promise((resolve, reject) => {
        if (arr.length > rowIdx) {
            setTimeout(() => {
                let sum = 0;
                for (let i = 0; i < arr[rowIdx].length; i ++) {
                    sum += arr[rowIdx][i];
                }
                resolve(sum);
            }, 0);
        }
        else {
            reject(`Row index ${rowIdx} must be within 0 and ${arr.length - 1}`);
        }
    })
}

rowSumPromises = [];

for (let x = 0; x < array2D.length; x++) {
    rowSumPromises.push(sumOfARow(array2D, x));
}

Promise.all(rowSumPromises)
    .then((rowSums) => {
        let sum = 0;
        rowSums.forEach(rowSum => {
            sum += rowSum;
        });
        console.log('Sum:', sum);
    })
    .catch((error) => {
        console.error('Error:', error);
    });