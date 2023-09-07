const pools = [
    [{ symbol: 'VND', amount: 1000000 }, { symbol: 'AUD', amount: 2000000 }],
    [{ symbol: 'AUD', amount: 2000000 }, { symbol: 'AUF', amount: 3000000 }],
    [{ symbol: 'AUF', amount: 1000000 }, { symbol: 'AUG', amount: 4000000 }],
    [{ symbol: 'AUG', amount: 4000000 }, { symbol: 'AUH', amount: 2000000 }],
    [{ symbol: 'AUH', amount: 2000000 }, { symbol: 'VND', amount: 5000000 }],
    [{ symbol: 'VND', amount: 5000000 }, { symbol: 'AUJ', amount: 2000000 }],
    [{ symbol: 'AUJ', amount: 5000000 }, { symbol: 'USD', amount: 20000000 }],
    [{ symbol: 'AUH', amount: 1000000 }, { symbol: 'AUJ', amount: 6000000 }],
    [{ symbol: 'AUJ', amount: 3000000 }, { symbol: 'AUK', amount: 2000000 }],
    [{ symbol: 'AUK', amount: 1000000 }, { symbol: 'USD', amount: 20000000 }]
];
const visitedCurrencies = new Set();
function exchange(symbol, quantity, targetSymbol) {
    const kq = [];
    for (let i = 0; i < pools.length; i++) {
        const [fromCurrency, toCurrency] = pools[i];
        if (fromCurrency.symbol === symbol && !visitedCurrencies.has(toCurrency.symbol)) {
            const rate = quantity * (toCurrency.amount / fromCurrency.amount);
            if (toCurrency.symbol === targetSymbol) {
                kq.push({ route: [symbol, toCurrency.symbol], rate });
            } else {
                visitedCurrencies.add(toCurrency.symbol);
                const subkq = exchange(toCurrency.symbol, rate, targetSymbol);
                subkq.forEach(subItem => {
                    kq.push({ route: [symbol, ...subItem.route], rate: subItem.rate });
                });

                visitedCurrencies.delete(toCurrency.symbol);
            }
        }
    }

    return kq;
}


const kq = exchange("VND", 1, "USD");
console.log("Nguyễn Văn Huy", kq);
const kqElement = document.querySelector(".kq");
kqElement.innerHTML = JSON.stringify(kq);
