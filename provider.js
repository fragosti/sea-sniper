const { PrivateKeyWalletSubprovider, Web3ProviderEngine, RPCSubprovider} = require('@0x/subproviders');
const { providerUtils } = require('@0x/utils');
const { ETHEREUM_RPC_URL, ETHEREUM_PRIVATE_KEY } = require('./config');


const provider = new Web3ProviderEngine();
const pkw = new PrivateKeyWalletSubprovider(ETHEREUM_PRIVATE_KEY);
const rpcSub = new RPCSubprovider(ETHEREUM_RPC_URL);
provider.addProvider(pkw);
provider.addProvider(rpcSub);
providerUtils.startProviderEngine(provider);

module.exports = {
  provider,
}