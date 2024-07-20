import stack from "@peter.naydenov/stack"



function pager ( initialData = [] ) {

const resultStack = stack ({ type: 'FIFO' })
resultStack.push ( initialData )

const 
    push = dataUpdate => resultStack.push ( dataUpdate )
  , getSize = () => resultStack.getSize ( )
  , reset   = () => resultStack.reset ()
  ;

function get (pageNumber=1, pageSize=20, offset=0) {
    const countOffset = offset + (pageNumber-1) * pageSize;
    return resultStack.peek ( pageSize, countOffset )
} // pull func.

function countPages ( number=20 ) {
        return Math.ceil ( getSize () / number )
    } // calcPages func.



return {
      push
    , get
    , getSize
    , countPages
    , reset
}
} // paginator



export default pager


