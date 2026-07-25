import pager from '../src/main.js'
import { describe, it, expect } from 'vitest'

const longData = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ];

describe ( 'Paginator', () => {



    it ( 'init with data', () => {
        const pages = pager ( [1,2,3] )
        expect (pages.getSize()).toBe (3)
    }) // it init with data



    it ( 'init empty pager', () => {
        const pages = pager ()
        expect (pages.getSize()).toBe (0)
    }) // it init empty pager



    it ( 'extend data', () => {
        const pages = pager ( [1,2] )
        pages.push ( [3,4,5])
        expect (pages.getSize()).toBe (5)
        const result = pages.get (1, 5)
        expect ( result ).toEqual ( [1,2,3,4,5] )
    }) // it extend data



    it ( 'reset', () => {
        const pages = pager ( [1,2,3,4,5]);
        pages.reset();
        expect (pages.getSize()).toBe (0)
    }) // it reset



    it ( 'count pages', () => {
        const pages = pager ( longData );
        expect ( pages.countPages(5)).toBe ( 6 )
        expect ( pages.countPages(6)).toBe ( 5 )
        expect ( pages.countPages(7)).toBe ( 5 )
        expect ( pages.countPages(10)).toBe ( 3 )
        expect ( pages.countPages(20)).toBe ( 2 )
        expect ( pages.countPages()  ).toBe ( 2 ) // Default items per page -> 20
    }) // it count pages




    // =====================================================================
    // BUG REGRESSIONS
    // =====================================================================

    // -----------------------------------------------------------------
    // BUG 1 — `getSize` and `get` were inconsistent when the data
    // contained `null` or `undefined` entries. The internal stack
    // (`@peter.naydenov/stack`) drops both in its `peek` implementation
    // — so `get` returned only the non-empty items, but `getSize` still
    // counted the empty slots. The pager now strips `null`/`undefined`
    // at the entry points (constructor + `push`) so the two views
    // always agree on the count of real items.
    // -----------------------------------------------------------------
    it ( 'BUG 1 — null entries in initial data are dropped (count + retrieve agree)', () => {
        const pages = pager ( [ 1, null, 2, undefined, 3, null ] )
        // 3 real items (1, 2, 3), 3 empty slots (null, undefined, null)
        expect ( pages.getSize() ).toBe ( 3 )
        expect ( pages.get(1, 10) ).toEqual ( [ 1, 2, 3 ] )
        // The count and the array length agree — the empty slots are
        // compacted out, not silently kept in the size counter.
    }) // it BUG 1 — init

    it ( 'BUG 1 — undefined entries in initial data are dropped', () => {
        const pages = pager ( [ 1, undefined, 2, 3 ] )
        expect ( pages.getSize() ).toBe ( 3 )
        expect ( pages.get(1, 10) ).toEqual ( [ 1, 2, 3 ] )
    }) // it BUG 1 — init undefined

    it ( 'BUG 1 — null entries in push (array) are dropped', () => {
        const pages = pager ( [ 1, 2 ] )
        pages.push ( [ 3, null, 4, undefined, 5 ] )
        expect ( pages.getSize() ).toBe ( 5 )
        expect ( pages.get(1, 10) ).toEqual ( [ 1, 2, 3, 4, 5 ] )
    }) // it BUG 1 — push array

    it ( 'BUG 1 — null entries in push (single item) are dropped', () => {
        // README line 73 documents `push(item)` as "Insert a single
        // item". A null/undefined single item is an empty slot — it
        // should be a no-op, not a phantom count.
        const pages = pager ( [ 1, 2 ] )
        pages.push ( null )
        expect ( pages.getSize() ).toBe ( 2 )
        pages.push ( undefined )
        expect ( pages.getSize() ).toBe ( 2 )
        pages.push ( 3 )
        expect ( pages.getSize() ).toBe ( 3 )
    }) // it BUG 1 — push single

    it ( 'BUG 1 — pushing only empty entries is a no-op', () => {
        const pages = pager ( [ 1 ] )
        pages.push ( [ null, undefined ] )
        expect ( pages.getSize() ).toBe ( 1 )
        pages.push ( null )
        expect ( pages.getSize() ).toBe ( 1 )
    }) // it BUG 1 — all-empty push

    it ( 'BUG 1 — getSize stays in sync after mixed valid + empty pushes', () => {
        // Simulates the original failure mode: an array with empties
        // pushed alongside valid items. Before the fix, getSize would
        // grow by the empty count too, and the two views would drift.
        const pages = pager ( [ 1, 2, 3 ] )
        pages.push ( [ null, 4, undefined, 5, null ] )
        pages.push ( [ 6, null ] )
        pages.push ( 7 )
        expect ( pages.getSize() ).toBe ( 7 )
        expect ( pages.get(1, 20) ).toEqual ( [ 1, 2, 3, 4, 5, 6, 7 ] )
    }) // it BUG 1 — mixed

    // -----------------------------------------------------------------
    // BUG 2 — `countPages(0)` returned `Infinity` (Math.ceil(N/0)) and
    // `countPages(-k)` returned a negative number (Math.ceil(N/-k)).
    // Both are nonsensical. A non-positive page size now returns 0 —
    // "no pages fit in a non-positive slot".
    // -----------------------------------------------------------------
    it ( 'BUG 2 — countPages(0) returns 0, not Infinity', () => {
        const pages = pager ( [ 1, 2, 3, 4, 5 ] )
        expect ( pages.countPages(0) ).toBe ( 0 )
    }) // it BUG 2 — zero

    it ( 'BUG 2 — countPages(-5) returns 0, not -1', () => {
        const pages = pager ( [ 1, 2, 3, 4, 5 ] )
        expect ( pages.countPages(-5) ).toBe ( 0 )
    }) // it BUG 2 — negative

    it ( 'BUG 2 — countPages on an empty pager with a non-positive size is still 0', () => {
        const pages = pager ( [] )
        expect ( pages.countPages(0) ).toBe ( 0 )
        expect ( pages.countPages(-1) ).toBe ( 0 )
    }) // it BUG 2 — empty + non-positive

}) // describe