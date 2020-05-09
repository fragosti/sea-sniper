
const throwError = (err) => {
  throw new Error(err);
}

const ETHEREUM_RPC_URL = process.env.ETHEREUM_RPC_URL || throwError('ETHEREUM_RPC_URL required');
const ETHEREUM_PRIVATE_KEY = process.env.ETHEREUM_PRIVATE_KEY || throwError('ETHEREUM_PRIVATE_KEY required');
const ETHEREUM_PUBLIC_KEY = process.env.ETHEREUM_PUBLIC_KEY || throwError('ETHEREUM_PUBLIC_KEY required');

module.exports = {
  ETHEREUM_RPC_URL,
  ETHEREUM_PRIVATE_KEY,
  ETHEREUM_PUBLIC_KEY,
}