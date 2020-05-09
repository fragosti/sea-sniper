require('./fetch');
const { EventType, OpenSeaPort } = require('opensea-js');
const { BigNumber } = require('bignumber.js');
const R = require('ramda');
const { OrderSide } = require('opensea-js/lib/types');

const { ETHEREUM_PUBLIC_KEY } = require('./config');
const { provider } = require('./provider');
const { askAsync, sleepAsync } = require('./util');

const BNOLAN_ADDRESS = '0x2d891ed45c4c3eab978513df4b92a35cf131d2e2';
const CRYPTO_VOXEL_ADDRESS = '0x79986af15539de2db9a5086382daeda917a9cf0c'
const MAX_PRICE_ETH = 1.1e18;

const seaport = new OpenSeaPort(provider);
seaport.gasPriceAddition = new BigNumber(10);

seaport.addListener(EventType.TransactionCreated, ({ transactionHash }) => {
  console.log('Transaction created:', `https://etherscan.io/tx/${transactionHash}`);
});

const fetchOrdersAsync = async () => {
  const { orders } = await seaport.api.getOrders({
    maker: BNOLAN_ADDRESS,
    owner: BNOLAN_ADDRESS,
    asset_contract_address: CRYPTO_VOXEL_ADDRESS,
    side: OrderSide.Sell,
    // order_by: 'eth_price',
    limit: 100,
  })
  return orders;
}

const fillOrder = (order) => {
  // No waiting for the txn to mine.
  seaport.fulfillOrder({ order, accountAddress: ETHEREUM_PUBLIC_KEY });
}

const snipeAsync = async () => {
  while (true) {
    console.log('Checking for orders...');
    const orders = await fetchOrdersAsync();
    const cheapOrders = orders.filter(order => order.currentPrice.lessThan(MAX_PRICE_ETH));
    const sortedOrders = R.sortBy(order => order.currentPrice.toNumber(), cheapOrders);
    for (const order of sortedOrders) {
      console.log(order);
      const answer = await askAsync('Should fill order?');
      if (answer === 'y') {
        fillOrder(order);
      }
    }
    await sleepAsync(5000);
  }
}

snipeAsync();