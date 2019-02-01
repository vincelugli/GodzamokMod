# GodzamokMod
Auto sell and re-buy items with single keypress.

## Installing

Create a bookmark and add the following as the URL.

```
javascript: (function () {
	Game.LoadMod('https://raw.githubusercontent.com/vincelugli/GodzamokMod/master/GodzamokAutoSellAndBuy.js');
}());
```

Alternatively, you can run the follow function from dev tools console.

```
(function () {
	Game.LoadMod('https://raw.githubusercontent.com/vincelugli/GodzamokMod/master/GodzamokAutoSellAndBuy.js');
}());
```

## How to use

Once the mod is loaded, press Ctrl + a number to sell all builds (except grandmas) at and below that level. For example, `Ctrl + 5` will sell all Cursors, Farms, Mines, and Factories. `Ctrl + 3` will sell only Cursors, and Farms.

To re-buy everything, press Ctrl + Shift + the same number. In the same examples above, you would press `Ctrl + Shift + 5` and `Ctrl + Shift + 3`.