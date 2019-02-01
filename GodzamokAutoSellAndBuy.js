GodzamokAuto = {}

GodzamokAuto.itemsSold = [];

GodzamokAuto.sellItems = function (maxSale, shouldSkipGrandma = true) {
    document.getElementById('storeBulkSell').click();
    document.getElementById('storeBulkMax').click();
    
    for (let i = 0; i < maxSale; i++) {
        if (i === 1 && shouldSkipGrandma) {
            continue;
        }

        const numberOfItems = document.getElementById(`productOwned${i}`).innerHTML;
        GodzamokAuto.itemsSold[i] = numberOfItems;

        // click item to sell all
        document.getElementById(`product${i}`).click();
    }
}

GodzamokAuto.buyBackItems = function (maxSale) {
    document.getElementById('storeBulkBuy').click();
    const buy100 = document.getElementById('storeBulk100');
    const buy10 = document.getElementById('storeBulk10');
    const buy1 = document.getElementById('storeBulk1');

    for (let i = 0; i < GodzamokAuto.itemsSold.length; i++) {
        const itemElement = document.getElementById(`product${i}`);

        buy100.click();
        GodzamokAuto.buyUntilN(itemElement, 100, i);
        buy10.click();
        GodzamokAuto.buyUntilN(itemElement, 10, i);
        buy1.click();
        GodzamokAuto.buyUntilN(itemElement, 1, i);
    }
}

GodzamokAuto.buyUntilN = function (element, n, i) {
    while (GodzamokAuto.itemsSold[i] >= n) {
        element.click();
        GodzamokAuto.itemsSold[i] -= n;
    }
}

document.onkeyup = function(e) {
    if (e.ctrlKey) {
        const numberPressed = e.which - 49;

        if (numberPressed > 10) {
            return;
        }

        if (e.shiftKey) {
            GodzamokAuto.buyBackItems(numberPressed);
        }
        else {
            GodzamokAuto.sellItems(numberPressed);
        }
    }
}
