import stack from "@peter.naydenov/stack"



const defaultPageSize = 20;



/**
 * Public API surface returned by {@link pager}.
 * @typedef {Object} Pager
 * @property {(data: *|Array<*>) => void} push  Insert a single item or an array of items.
 * @property {(pageNumber?: number, pageSize?: number, offset?: number) => Array<*>} get  Read a page slice.
 * @property {() => number} getSize  Total count of stored items.
 * @property {(pageSize?: number) => number} countPages  Number of pages for a given page size.
 * @property {() => void} reset  Remove all stored items.
 */



/**
 * Strip `null` / `undefined` entries from a dataset. The pager treats
 * them as "empty slots" — they are not stored, not counted in `getSize()`,
 * and not returned by `get()`. Keeping `getSize` and `get` views in sync
 * is the reason this filter exists.
 *
 * @private
 * @param  {Array<*>} arr
 * @returns {Array<*>}
 */
function dropEmptySlots ( arr ) {
    return arr.filter ( item => item != null )
}



/**
 * Create a pager instance.
 *
 * `null` / `undefined` entries in `initialData` are dropped before
 * storage — they are treated as empty slots and never counted by
 * `getSize()` or returned by `get()`.
 *
 * @param   {Array<*>} [initialData=[]]
 * @returns {Pager}
 * @throws  {TypeError} If `initialData` is provided and is not an array.
 */
function pager ( initialData = [] ) {

    if (!Array.isArray(initialData)) {
          throw new TypeError ( 'Initial data must be an array')
      }

const resultStack = stack ({ type: 'FIFO' })
const cleanedInit = dropEmptySlots ( initialData )
if ( cleanedInit.length > 0 )   resultStack.push ( cleanedInit )

/**
 * Append one item or many to the pager.
 *
 * Accepts either a single value or an array of values. `null` /
 * `undefined` entries are treated as empty slots and dropped, so they
 * do not appear in `getSize()` or `get()`. A push containing only empty
 * entries is a no-op.
 *
 * @param   {*|Array<*>} dataUpdate
 * @returns {void}
 */
const
    push = dataUpdate => {
        // `push` accepts either a single item (wrapped automatically) or
        // an array of items — see README. null / undefined are treated
        // as empty slots and dropped, so they don't show up in `getSize`
        // or `get`. An all-empty push is a no-op (nothing to store).
        if ( !Array.isArray ( dataUpdate ) ) {
                if ( dataUpdate == null )   return
                return resultStack.push ( [ dataUpdate ] )
            }
        const cleaned = dropEmptySlots ( dataUpdate )
        if ( cleaned.length > 0 )   resultStack.push ( cleaned )
    }
/**
 * Number of items currently stored in the pager.
 *
 * @returns {number}
 */
, getSize = () => resultStack.getSize ( )
/**
 * Remove all stored items. The pager returns to an empty state.
 *
 * @returns {void}
 */
, reset   = () => resultStack.reset ()
  ;

/**
 * Read a page slice from the stored items.
 *
 * Pages are 1-indexed. The effective starting position is
 * `offset + (pageNumber - 1) * pageSize`. Returns whatever items remain
 * at that window — possibly fewer than `pageSize` on the last page,
 * or an empty array if the window is past the end.
 *
 * @param   {number} [pageNumber=1]  1-based page index.
 * @param   {number} [pageSize=20]   Items per page.
 * @param   {number} [offset=0]      Items to skip before page 1 begins.
 * @returns {Array<*>}
 */
function get (pageNumber=1, pageSize=defaultPageSize, offset=0) {
    const countOffset = offset + (pageNumber-1) * pageSize;
    return resultStack.peek ( pageSize, countOffset )
} // pull func.

/**
 * Calculate how many pages the stored items would occupy.
 *
 * Non-finite (`NaN`, `Infinity`) or non-positive page sizes return `0`
 * — "no pages fit in a non-positive slot" — rather than `Infinity` or a
 * negative number.
 *
 * @param   {number} [number=20]  Items per page.
 * @returns {number}  Page count, or `0` for an invalid page size.
 */
function countPages ( number=defaultPageSize ) {
        // Guard against non-positive page sizes: `Math.ceil(N / 0)` is
        // `Infinity`, and `Math.ceil(N / -k)` is a negative number — both
        // are nonsense. Treat any non-finite or non-positive size as
        // "no pages fit" → 0.
        if ( !Number.isFinite ( number ) || number <= 0 )   return 0
        return Math.ceil ( getSize () / number )
    } // calcPages func.



return {
      push
    , get
    , getSize
    , countPages
    , reset
}
} // pager func.



export default pager
