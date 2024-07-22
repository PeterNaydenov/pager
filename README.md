# Pager (@peter.naydenov/pager)
![version](https://img.shields.io/github/package-json/v/peterNaydenov/pager)
![license](https://img.shields.io/github/license/peterNaydenov/pager)
![language](https://img.shields.io/github/languages/top/peterNaydenov/pager)
![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/%40peter.naydenov%2Fpager)


A library to split results into multiple pages. The module works with data, doesn't provide any UI, and is easy to use.

## Installation
Write in a console: 

```
npm install @peter.naydenov/pager
```

From your javascript or node.js project:

```js
import pager from '@peter.naydenov/pager'

// or

const pager = require ('@peter.naydenov/pager')

```



## Usage

```js
import pager from '@peter.naydenov/pager'
const initData = [ 'init1', 'init2' ];
const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
const pages = pager ( initData )

pages.push ( data ) // extend initial array with new data
// pages -> [ 'init1', 'init2', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
const items = pages.getSize () // count number of items in result array
// items -> 12
const count = pages.countPages ( 5 ) // count number of pages if 5 items per page
// count -> 3
const page2 = pages.get ( 2, 5 ) // get a page 2 if page contains 5 items
// page2 -> [ 4, 5, 6, 7, 8 ]
const page3 = pages.get ( 3, 5 ) // get a page 3 if page contains 5 items
// page3 -> [ 9, 10 ]
```


## Pager Methods

```js
  push       : 'Insert a new item to the results array'
, get        : 'Get a page from results array'
, getSize    : 'Count the number of items in results array'
, countPages : 'Calculate the number of pages'
```

## Pager Object API

Create a pager object with the `pager` function.
```js
const pageObject = pager ( initialResultsArray );
// initialArray -> Any[]
```


### pagerObject.push ()
Insert a new item(s) to the results array:
```js
pageObject.push ( item ) // Insert a single item
pageObject.push ( [ item1, item2 ] ) // Insert many items to the results array
// item, item1, item2 -> Any
```


### pagerObject.get ()
Get a page from results array
```js
pageObject.get ( pageNumber, pageSize, offset ) // Get a page from results array
// pageNumber -> Number. Default: 1. Number of the page
// pageSize -> Number. Default: 20. Number of items per page
// offset -> Number. Default: 0. Number of items to skip before starting the page
// return -> Any[]. Array of items for specified page segment
```

### pagerObject.getSize ()
Count the number of items in results array
```js
pageObject.getSize () // Count the number of items in results array
// return -> Number
```


### pagerObject.countPages ()
Calculate the number of pages
```js
pageObject.countPages ( pageSize ) // Calculate the number of pages
// pageSize -> Number. Default: 20. Number of items per page
// return -> Number. Number of pages
```




## Credits
'@peter.naydenov/pager' was created and supported by Peter Naydenov.



## License
'@peter.naydenov/pager' is released under the [MIT License](http://opensource.org/licenses/MIT).

