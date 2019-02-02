// l = function(what) { document.getElementById(what); };

GodzamokAuto = {}
GodzamokAuto.backup = {};
GodzamokAuto.unlockedElements = 0;
GodzamokAuto.itemsSold = [];

GodzamokAuto.createCheckbox = function(itemId) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'GodzamokCheck';
    checkbox.id = `GodzamokCheck-${itemId}`;

    // create parent div, with display = flex
    const itemParent = document.createElement('div');
    itemParent.style.display = 'flex';

    // append checkbox to parent div
    itemParent.appendChild(checkbox);

    // get item div
    const itemDiv = document.getElementById(`product${itemId}`);

    // insert parent div before item div in item's parent
    itemDiv.parentElement.insertBefore(itemParent, itemDiv);

    // append item div to parent div
    itemParent.append(itemDiv);
}

GodzamokAuto.getItemsToSell = function() {
    const godzamokCheckboxes = document.getElementsByName('GodzamokCheck');

    const itemIdsSelected = [];
    for (let checkboxElement of godzamokCheckboxes) {
        if (checkboxElement.checked) {
            itemIdsSelected.push(checkboxElement.id.split('-')[1]);
        }
    }

    return itemIdsSelected;
}

GodzamokAuto.sellItems = function() {
    l('storeBulkSell').click();
    l('storeBulkMax').click();
    
    GodzamokAuto.getItemsToSell()
        .forEach((itemId) => {
            const numberOfItems = l(`productOwned${itemId}`).innerHTML;
            GodzamokAuto.itemsSold[itemId] |= numberOfItems;
    
            // click item to sell all
            l(`product${itemId}`).click();
        });
}

GodzamokAuto.buyBackItems = function() {
    l('storeBulkBuy').click();
    const buy100 = l('storeBulk100');
    const buy10 = l('storeBulk10');
    const buy1 = l('storeBulk1');

    for (let i = 0; i <= GodzamokAuto.itemsSold.length; i++) {
        const itemElement = l(`product${i}`);

        buy100.click();
        GodzamokAuto.buyUntilN(itemElement, 100, i);
        buy10.click();
        GodzamokAuto.buyUntilN(itemElement, 10, i);
        buy1.click();
        GodzamokAuto.buyUntilN(itemElement, 1, i);
    }
}

GodzamokAuto.buyUntilN = function(element, n, i) {
    while (GodzamokAuto.itemsSold[i] >= n) {
        element.click();
        GodzamokAuto.itemsSold[i] -= n;
    }
}

GodzamokAuto.init = function() {
    GodzamokAuto.backup.loop = Game.Loop;
    Game.Loop = function() {
        GodzamokAuto.backup.loop();

        // check for new checkboxes to insert into document.
        const unlockedItems = document.getElementsByClassName('product unlocked');

        if (unlockedItems.length > GodzamokAuto.unlockedElements) {
            for (let i = GodzamokAuto.unlockedElements; i < unlockedItems.length; i++) {
                GodzamokAuto.createCheckbox(i);
                GodzamokAuto.unlockedElements++;
            }
        }
    }
}

document.onkeyup = function(e) {
    if (e.which === 66 /* b */) {
        GodzamokAuto.buyBackItems();
    }
    else if (e.which === 83 /* s */) {
        GodzamokAuto.sellItems();
    }
}

GodzamokAuto.init();
