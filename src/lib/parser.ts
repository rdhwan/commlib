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

// extend error class
export class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParseError";
  }
}

export function parse(payload: string) {
  try {
    // check if payload is not empty, even though it's not necessary
    if (!payload) {
      throw new ParseError("payload must not be empty");
    }

    // split payload
    const [src, dst, data] = payload.split("@@");

    // check if src and dst is number
    if (isNaN(+src) || isNaN(+dst)) {
      throw new ParseError("src and dst must be a number");
    }

    // check if data is not empty
    if (!data) {
      throw new ParseError("data must not be empty");
    }

    // parse data to json
    const jsonData = JSON.parse(data);

    // return payload
    return {
      src: +src,
      dst: +dst,
      data: jsonData,
    } as Payload;
  } catch (err) {
    if (err instanceof ParseError) {
      throw err;
    }

    throw new ParseError("payload format is invalid");
  }
}

export function stringify(src: number, dst: number, data: any) {
  // check if data is object
  if (typeof data !== "object") {
    throw new ParseError("data must be a javascript object");
  }

  return `${src}@@${dst}@@${JSON.stringify(data)}`;
}
