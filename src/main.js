import stack from "@peter.naydenov/stack"



const defaultPageSize = 20;



/**
 * Filter out `null` / `undefined` entries from a dataset. The pager treats
 * them as "empty slots" — they don't get stored, they don't get counted
 * in `getSize()`, and they don't appear in `get()` results. This makes
 * the two views (count vs. retrieve) always agree.
 *
 * @private
 * @param {Array} arr
 * @returns {Array}
 */
function dropEmptySlots ( arr ) {
    return arr.filter ( item => item != null )
}



function pager ( initialData = [] ) {

    if (!Array.isArray(initialData)) {
          throw new TypeError ( 'Initial data must be an array')
      }

const resultStack = stack ({ type: 'FIFO' })
const cleanedInit = dropEmptySlots ( initialData )
if ( cleanedInit.length > 0 )   resultStack.push ( cleanedInit )

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
  , getSize = () => resultStack.getSize ( )
  , reset   = () => resultStack.reset ()
  ;

function get (pageNumber=1, pageSize=defaultPageSize, offset=0) {
    const countOffset = offset + (pageNumber-1) * pageSize;
    return resultStack.peek ( pageSize, countOffset )
} // pull func.

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
