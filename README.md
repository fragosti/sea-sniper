# sea-sniper

This is a _very_ simple script to take orders on OpenSea using [opensea-js](https://github.com/ProjectOpenSea/opensea-js). 
It is currently configured to look for cheap CryptoVoxels when they are created. 

## Env

You need to provide some ENV vars in an `.env` file.

```
ETHEREUM_RPC_URL=<>
ETHEREUM_PRIVATE_KEY=<>
ETHEREUM_PUBLIC_KEY=<>
```

## Running

Just install deps and go.

```
$ yarn
$ yarn start
```