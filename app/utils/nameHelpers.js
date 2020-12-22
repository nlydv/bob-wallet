import punycode from 'punycode';
import {hoursToNow} from "./timeConverter";
import moment from "moment";

export const states = {
  OPENING: 'OPENING',
  BIDDING: 'BIDDING',
  REVEAL: 'REVEAL',
  CLOSED: 'CLOSED',
  REVOKED: 'REVOKED',
};

const STATES_TO_OPS = {
  OPENING: 'OPEN',
  BIDDING: 'BID',
  REVEAL: 'REVEAL',
};

export const isComingSoon = (name, currentHeight) => {
  return name && name.start && name.start.start > currentHeight;
};

export const isAvailable = name => {
  const {start, info} = name || {};

  if (!start) {
    return false;
  }

  if (start.reserved) {
    return false;
  }

  if (!info) {
    return true;
  }

  if (isBidding(name) || isOpening(name)) {
    return true;
  }

  return false;
};

export const isReserved = name => {
  const {start} = name || {};

  // Not available if start is undefined
  if (!start) {
    return false;
  }

  return !!start.reserved;
};

export const isOpening = name => checkState(name, states.OPENING);
export const isBidding = name => checkState(name, states.BIDDING);
export const isReveal = name => checkState(name, states.REVEAL);
export const isRevoked = name => checkState(name, states.REVOKED);
export const isClosed = name => checkState(name, states.CLOSED);

export const checkRemainingTime = (name, currentHeight) => {
  const domain = name || {};
  const info = domain.info || {};
  const start = domain.start || {};
  const stats = info.stats || {};

  if (isBidding(domain)) {
    return stats.hoursUntilReveal;
  }

  if (isOpening(domain)) {
    return stats.hoursUntilBidding;
  }

  if (isReveal(domain)) {
    return stats.hoursUntilClose;
  }

  const delta = currentHeight - start.start;
  const AVERAGE_BLOCK_TIME = 10 * 60 * 1000;
  const PER_HOUR = 60 * 60 * 1000;
  const timeUntil = delta * AVERAGE_BLOCK_TIME;
  return timeUntil / PER_HOUR;
};

function checkState(name, expectedState) {
  if (!name) {
    return false;
  }

  const {start, info} = name;
  const ops = STATES_TO_OPS[expectedState];

  if (typeof ops !== 'undefined' && name.pendingOperation === ops) {
    return true;
  }

  // Not available if start is undefined
  if (!start || !info) {
    return false;
  }

  return info.state === expectedState;
}


export const decodePunycode = name => {
  try {
    return punycode.toASCII(name);
  } catch(e) {}

  return name;
}

export const formatName = name => {
  if (!name)
    return name;

  try {
    const unicode = punycode.toUnicode(name);
    if (unicode !== name) {
      return `${name}/ (${unicode})`;
    }
  } catch(e) {}

  return `${name}/`;
}
