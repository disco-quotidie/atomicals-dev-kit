import * as CrockfordBase32 from 'crockford-base32';

export interface BitworkInfo {
  input_bitwork: string;
  hex_bitwork: string;
  prefix: string;
  ext: number | undefined;
}

export const isValidBitworkMinimum = (bitworkc: any) => {
  if (!bitworkc) {
    return false
    // throw new Error('Require at least 4 hex digits or 3 ascii digits for any bitwork.')
  }
  const bitworkInfoCommit = isValidBitworkString(bitworkc);
  if (bitworkInfoCommit?.prefix && bitworkInfoCommit?.prefix.length < 4) {
    // console.log('bitworkInfoCommit', bitworkInfoCommit);
    return false
    // throw new Error('Require at least --bitworkc with 4 hex digits or 3 ascii digits.')
  }
  return true
}

export const isBitworkHexPrefix = (bitwork: string) => {
  if (/^[a-f0-9]{1,10}$/.test(bitwork)) {
    return true;
  }
  return false
}

export const isBitworkRefBase32Prefix = (bitwork: string): string | null => {
  if (/^[abcdefghjkmnpqrstvwxyz0-9]{1,10}$/.test(bitwork)) {
    const enc = CrockfordBase32.CrockfordBase32.decode(bitwork);
    return enc.toString('hex').toLowerCase();
  }
  return null
}

export const isValidBitworkString = (fullstring: string, safety = true): BitworkInfo | null => {
  if (!fullstring) {
    return null
    // throw new Error(errMessage);
  }

  if (fullstring && fullstring.indexOf('.') === -1) {
    if (isBitworkHexPrefix(fullstring)) {
      return {
        input_bitwork: fullstring,
        hex_bitwork: fullstring,
        prefix: fullstring,
        ext: undefined
      };
    } else if (isBitworkRefBase32Prefix(fullstring)) {
      const hex_encoded: string | any = isBitworkRefBase32Prefix(fullstring);
      if (!hex_encoded) {
        throw new Error('invalid base32 encoding: ' + fullstring);
      }
      return {
        input_bitwork: fullstring,
        hex_bitwork: hex_encoded,
        prefix: hex_encoded,
        ext: undefined
      };
    } else {
      throw new Error('Invalid bitwork string: ' + fullstring)
    }
  }

  const splitted = fullstring.split('.');
  if (splitted.length !== 2) {
    return null
    // throw new Error(errMessage)
  }

  let hex_prefix: any = null;
  if (isBitworkHexPrefix(splitted[0])) {
    hex_prefix = splitted[0];
  } else if (isBitworkRefBase32Prefix(splitted[0])) {
    hex_prefix = isBitworkRefBase32Prefix(splitted[0]);
    if (!hex_prefix) {
      throw new Error('invalid base32 encoding: ' + splitted[0]);
    }
  } else {
    throw new Error('Invalid bitwork string: ' + fullstring)
  }

  const parsedNum = parseInt(splitted[1], 10);
  if (isNaN(parsedNum)) {
    return null
    // throw new Error(errMessage)
  }
  if (parsedNum <= 0 || parsedNum > 15) {
    return null
    // throw new Error(errMessage)
  }

  if (safety) {
    if (splitted[0].length >= 10) {
      return null
      // throw new Error('Safety check triggered: Prefix length is >= 8. Override with safety=false');
    }
  }
  let hex_bitwork = '';
  if (parsedNum) {
    hex_bitwork = `${hex_prefix}.${parsedNum}`;
  }
  return {
    input_bitwork: fullstring,
    hex_bitwork: hex_bitwork,
    prefix: hex_prefix,
    ext: parsedNum,
  }
}