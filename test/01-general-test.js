import pager from '../src/main.js'
import { expect } from 'chai'

const longData = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ];

describe ( 'Paginator', () => {



    it ( 'init with data', () => {
        const pages = pager ( [1,2,3] )
        expect (pages.getSize()).to.equal (3)
    }) // it init with data



    it ( 'init empty pager', () => {
        const pages = pager ()
        expect (pages.getSize()).to.equal (0)
    }) // it init empty pager



    it ( 'extend data', () => {
        const pages = pager ( [1,2] )
        pages.push ( [3,4,5])
        expect (pages.getSize()).to.equal (5)
        const result = pages.get (1, 5)
        expect ( result ).to.deep.equal ( [1,2,3,4,5] )
    }) // it extend data



    it ( 'reset', () => {
        const pages = pager ( [1,2,3,4,5]);
        pages.reset();
        expect (pages.getSize()).to.equal (0)
    }) // it reset



    it ( 'count pages', () => {
        const pages = pager ( longData );
        expect ( pages.countPages(5)).to.be.equal ( 6 )
        expect ( pages.countPages(6)).to.be.equal ( 5 )
        expect ( pages.countPages(7)).to.be.equal ( 5 )
        expect ( pages.countPages(10)).to.be.equal ( 3 )
        expect ( pages.countPages(20)).to.be.equal ( 2 )
        expect ( pages.countPages()  ).to.be.equal ( 2 ) // Default items per page -> 20
    }) // it count pages

}) // describe