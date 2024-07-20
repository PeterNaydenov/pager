# Pager (@peter.naydenov/pager)
![version](https://img.shields.io/github/package-json/v/peterNaydenov/pager)
![license](https://img.shields.io/github/license/peterNaydenov/pager)


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
  push       : 'Extend result array with new item'
, get        : 'Get a page from result array'
, getSize    : 'Count the number of items in result array'
, countPages : 'Calculate the number of pages'
```

