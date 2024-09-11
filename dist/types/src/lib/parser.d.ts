/**
 * a parser helper for commlib library
 *
 * Asumsi data yang diterima seperti
 * src@@dst@@message
 *
 * src = alamat pengirim
 * dst = alamat tujuan, apabila 0 maka broadcast
 * data = pesan dalam format json
 */
export type Payload = {
    src: number;
    dst: number;
    data: {
        [key: string]: any;
    };
};
export declare class ParseError extends Error {
    constructor(message: string);
}
export declare function parse(payload: string): Payload;
export declare function stringify(src: number, dst: number, data: any): string;
