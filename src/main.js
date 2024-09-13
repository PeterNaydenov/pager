import stack from "@peter.naydenov/stack"



const defaultPageSize = 20;



function pager ( initialData = [] ) {
    
    if (!Array.isArray(initialData)) {
          throw new TypeError ( 'Initial data must be an array')
      }

const resultStack = stack ({ type: 'FIFO' })
resultStack.push ( initialData )

const 
    push = dataUpdate => resultStack.push ( dataUpdate )
  , getSize = () => resultStack.getSize ( )
  , reset   = () => resultStack.reset ()
  ;

function get (pageNumber=1, pageSize=defaultPageSize, offset=0) {
    const countOffset = offset + (pageNumber-1) * pageSize;
    return resultStack.peek ( pageSize, countOffset )
} // pull func.

function countPages ( number=defaultPageSize ) {
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


