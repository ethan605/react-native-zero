/*
 * @providesModule ZeroProj.Utils.Logger
 */

/* eslint-disable no-console */

import { DEBUGS, FEATURES } from 'app/constants/Flags';

const extractCalleeName = callee => {
  const components = callee.split(' ');
  return components.length > 1 ? components[0] : '';
};

const delegateConsole = (method, ...args) => {
  if (!FEATURES.LOGGER) return;

  const callStack = new Error().stack
    .split(/\n\s+at\s+/)
    .slice(3)
    .map(extractCalleeName);
  const logPrefix = `[ZeroProj][${method}] ${callStack[0]}():`;
  const stackTrace = DEBUGS.PRINT_LOG_STACK ? `[Stack: ${callStack.join(' > ')}]` : '';

  console[method](logPrefix, ...args, stackTrace);
};

export default {
  log: ((...args) => delegateConsole('log', ...args)),
  debug: ((...args) => delegateConsole('debug', ...args)),
  warn: ((...args) => delegateConsole('warn', ...args)),
  error: ((...args) => delegateConsole('error', ...args)),
};

/* eslint-enable no-console */
