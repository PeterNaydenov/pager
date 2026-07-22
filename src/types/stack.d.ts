/**
 * Minimal ambient typings for `@peter.naydenov/stack`.
 *
 * The runtime package ships no `.d.ts`, but `checkJs` needs to know the
 * shape of the helper used in `src/main.js`. Only the methods the pager
 * actually calls are declared; everything else stays implicit.
 */
declare module "@peter.naydenov/stack" {
    interface StackInstance {
        push (items: unknown[]): void;
        peek (count: number, skip?: number): unknown[];
        getSize (): number;
        reset (): boolean;
    }

    interface StackOptions {
        type?: "FIFO" | "LIFO";
        limit?: number | false;
        onLimit?: "full" | "update";
    }

    export default function stack (options?: StackOptions): StackInstance;
}
