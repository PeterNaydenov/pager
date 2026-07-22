export type Pager = {
    /**
     * Insert a single item or an array of items.
     */
    push: (data: any | Array<any>) => void;
    /**
     * Read a page slice.
     */
    get: (pageNumber?: number, pageSize?: number, offset?: number) => Array<any>;
    /**
     * Total count of stored items.
     */
    getSize: () => number;
    /**
     * Number of pages for a given page size.
     */
    countPages: (pageSize?: number) => number;
    /**
     * Remove all stored items.
     */
    reset: () => void;
};
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
declare function pager(initialData?: Array<any>): Pager;
export default pager;
