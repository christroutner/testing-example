/*
  This library interacts with the REST API endpoints in bch-api that communicate
  with the Bitcore API.
*/

const axios = require("axios")

class Bitcore {
  constructor(restURL) {
    this.restURL = restURL
  }
  /**
   * @api Bitcore.balance() balance() - Balance about an address.
   * @apiName Bitcore Balance
   * @apiGroup Bitcore
   * @apiDescription Return Balance about an address.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let balance = await bchjs.Bitcore.balance('bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c');
   *     console.log(balance)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   * //  {
   * //  "confirmed": 6000000,
   * //  "unconfirmed": 0,
   * //  "balance": 6000000
   * //}
   *(async () => {
   *   try {
   *     let balance = await bchjs.Bitcore.balance([
   *           "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
   *           "bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c"
   *        ]);
   *     console.log(balance)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // [
   * //  {
   * //    "confirmed": 230000,
   * //    "unconfirmed": 0,
   * //    "balance": 230000
   * //  },
   * //  {
   * //    "confirmed": 6000000,
   * //    "unconfirmed": 0,
   * //    "balance": 6000000
   * //  }
   * //]
   */
  async balance(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response = await axios.get(
          `${this.restURL}bitcore/balance/${address}`
        )

        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const response = await axios.post(`${this.restURL}bitcore/balance`, {
          addresses: address
        })

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
  /**
   * @api Bitcore.utxo()  utxo() - Get list of uxto for address.
   * @apiName Bitcore Utxo
   * @apiGroup Bitcore
   * @apiDescription Return list of uxto for address.
   *
   * @apiExample Example usage:
   *    (async () => {
   *   try {
   *     let utxo = await bchjs.Bitcore.utxo('bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c');
   *     console.log(utxo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * //   [
   * //  {
   * //    "_id": "5d0606ab41fa186e47a9d7f2",
   * //    "chain": "BCH",
   * //    "network": "mainnet",
   * //    "coinbase": false,
   * //    "mintIndex": 1,
   * //    "spentTxid": "",
   * //    "mintTxid": "d31dc2cf66fe4d3d3ae18e1065def58a64920746b1702b52f060e5edeea9883b",
   * //    "mintHeight": 585570,
   * //    "spentHeight": -2,
   * //    "address": "qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c",
   * //    "script": "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
   * //    "value": 1000000,
   * //    "confirmations": -1
   * //  },
   * //  {
   * //    "_id": "5cece3c7a9f1235e2ab53db9",
   * //    "chain": "BCH",
   * //    "network": "mainnet",
   * //    "coinbase": false,
   * //    "mintIndex": 0,
   * //    "spentTxid": "",
   * //    "mintTxid": "41e9a118765ecf7a1ba4487c0863e23dba343cc5880381a72f0365ac2546c5fa",
   * //    "mintHeight": 577125,
   * //    "spentHeight": -2,
   * //    "address": "qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c",
   * //    "script": "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
   * //    "value": 1000000,
   * //    "confirmations": -1
   * //  },
   * //  {
   * //    "_id": "5cece06aa9f1235e2a75a1e3",
   * //    "chain": "BCH",
   * //    "network": "mainnet",
   * //    "coinbase": false,
   * //    "mintIndex": 0,
   * //    "spentTxid": "",
   * //    "mintTxid": "2f902dec880568511cefa87b9dd761563edeba9c8ba784dc9fca2f7c8c4e6f97",
   * //    "mintHeight": 569922,
   * //    "spentHeight": -2,
   * //    "address": "qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c",
   * //    "script": "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
   * //    "value": 1000000,
   * //    "confirmations": -1
   * //  },
   * //  {
   * //    "_id": "5cecdf55a9f1235e2a6250b6",
   * //    "chain": "BCH",
   * //    "network": "mainnet",
   * //    "coinbase": false,
   * //    "mintIndex": 0,
   * //    "spentTxid": "",
   * //    "mintTxid": "eea57285462dd70dadcd431fc814857b3f81fe4d0a059a8c02c12fd7d33c02d1",
   * //    "mintHeight": 566900,
   * //    "spentHeight": -2,
   * //    "address": "qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c",
   * //    "script": "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
   * //    "value": 1000000,
   * //    "confirmations": -1
   * //  },
   * //  {
   * //    "_id": "5cecde66a9f1235e2a51a6e2",
   * //    "chain": "BCH",
   * //    "network": "mainnet",
   * //    "coinbase": false,
   * //    "mintIndex": 0,
   * //    "spentTxid": "",
   * //    "mintTxid": "282b3b296b6aed7122586ed69f7a57d35584eaf94a4d1b1ad7d1b05d36cb79d1",
   * //    "mintHeight": 563858,
   * //    "spentHeight": -2,
   * //    "address": "qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c",
   * //    "script": "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
   * //    "value": 1000000,
   * //    "confirmations": -1
   * //  },
   * //  {
   * //    "_id": "5cecdcbaa9f1235e2a346876",
   * //    "chain": "BCH",
   * //    "network": "mainnet",
   * //    "coinbase": false,
   * //    "mintIndex": 13,
   * //    "spentTxid": "",
   * //    "mintTxid": "ac444896b3e32d17824fa6573eed3b89768c5c9085b7a71f3ba88e9d5ba67355",
   * //    "mintHeight": 558992,
   * //    "spentHeight": -2,
   * //    "address": "qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c",
   * //    "script": "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
   * //    "value": 1000000,
   * //    "confirmations": -1
   * //  }
   * //]
   * //
   *
   *
   * (async () => {
   *   try {
   *     let utxo = await bchjs.Bitcore.utxo([
   *           "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
   *           "bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c"
   *        ]);
   *     console.log(utxo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * //   [
   * //  [
   * //    {
   * //      "_id": "5cecdd39a9f1235e2a3d409a",
   * //      "chain": "BCH",
   * //      "network": "mainnet",
   * //      "coinbase": false,
   * //      "mintIndex": 0,
   * //      "spentTxid": "",
   * //      "mintTxid": "27ec8512c1a9ee9e9ae9b98eb60375f1d2bd60e2e76a1eff5a45afdbc517cf9c",
   * //      "mintHeight": 560430,
   * //      "spentHeight": -2,
   * //      "address": "qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
   * //      "script": "76a914db6ea94fa26b7272dc5e1487c35f258391e0f38788ac",
   * //      "value": 100000,
   * //      "confirmations": -1
   * //    },
   * //    {
   * //      "_id": "5cecdd1ca9f1235e2a3b6349",
   * //      "chain": "BCH",
   * //      "network": "mainnet",
   * //      "coinbase": false,
   * //      "mintIndex": 0,
   * //      "spentTxid": "",
   * //      "mintTxid": "6e1ae1bf7db6de799ec1c05ab2816ac65549bd80141567af088e6f291385b07d",
   * //      "mintHeight": 560039,
   * //      "spentHeight": -2,
   * //      "address": "qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
   * //      "script": "76a914db6ea94fa26b7272dc5e1487c35f258391e0f38788ac",
   * //      "value": 130000,
   * //      "confirmations": -1
   * //    }
   * //  ],
   * //  [
   * //    {
   * //      "_id": "5d0606ab41fa186e47a9d7f2",
   * //      "chain": "BCH",
   * //      "network": "mainnet",
   * //      "coinbase": false,
   * //      "mintIndex": 1,
   * //      "spentTxid": "",
   * //      "mintTxid": "d31dc2cf66fe4d3d3ae18e1065def58a64920746b1702b52f060e5edeea9883b",
   * //      "mintHeight": 585570,
   * //      "spentHeight": -2,
   * //      "address": "qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c",
   * //      "script": "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
   * //      "value": 1000000,
   * //      "confirmations": -1
   * //    },
   * //    {
   * //      "_id": "5cece3c7a9f1235e2ab53db9",
   * //      "chain": "BCH",
   * //      "network": "mainnet",
   * //      "coinbase": false,
   * //      "mintIndex": 0,
   * //      "spentTxid": "",
   * //      "mintTxid": "41e9a118765ecf7a1ba4487c0863e23dba343cc5880381a72f0365ac2546c5fa",
   * //      "mintHeight": 577125,
   * //      "spentHeight": -2,
   * //      "address": "qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c",
   * //      "script": "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
   * //      "value": 1000000,
   * //      "confirmations": -1
   * //    },
   * //    {
   * //      "_id": "5cece06aa9f1235e2a75a1e3",
   * //      "chain": "BCH",
   * //      "network": "mainnet",
   * //      "coinbase": false,
   * //      "mintIndex": 0,
   * //      "spentTxid": "",
   * //      "mintTxid": "2f902dec880568511cefa87b9dd761563edeba9c8ba784dc9fca2f7c8c4e6f97",
   * //      "mintHeight": 569922,
   * //      "spentHeight": -2,
   * //      "address": "qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c",
   * //      "script": "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
   * //      "value": 1000000,
   * //      "confirmations": -1
   * //    },
   * //    {
   * //      "_id": "5cecdf55a9f1235e2a6250b6",
   * //      "chain": "BCH",
   * //      "network": "mainnet",
   * //      "coinbase": false,
   * //      "mintIndex": 0,
   * //      "spentTxid": "",
   * //      "mintTxid": "eea57285462dd70dadcd431fc814857b3f81fe4d0a059a8c02c12fd7d33c02d1",
   * //      "mintHeight": 566900,
   * //      "spentHeight": -2,
   * //      "address": "qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c",
   * //      "script": "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
   * //      "value": 1000000,
   * //      "confirmations": -1
   * //    },
   * //    {
   * //      "_id": "5cecde66a9f1235e2a51a6e2",
   * //      "chain": "BCH",
   * //      "network": "mainnet",
   * //      "coinbase": false,
   * //      "mintIndex": 0,
   * //      "spentTxid": "",
   * //      "mintTxid": "282b3b296b6aed7122586ed69f7a57d35584eaf94a4d1b1ad7d1b05d36cb79d1",
   * //      "mintHeight": 563858,
   * //      "spentHeight": -2,
   * //      "address": "qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c",
   * //      "script": "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
   * //      "value": 1000000,
   * //      "confirmations": -1
   * //    },
   * //    {
   * //      "_id": "5cecdcbaa9f1235e2a346876",
   * //      "chain": "BCH",
   * //      "network": "mainnet",
   * //      "coinbase": false,
   * //      "mintIndex": 13,
   * //      "spentTxid": "",
   * //      "mintTxid": "ac444896b3e32d17824fa6573eed3b89768c5c9085b7a71f3ba88e9d5ba67355",
   * //      "mintHeight": 558992,
   * //      "spentHeight": -2,
   * //      "address": "qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c",
   * //      "script": "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
   * //      "value": 1000000,
   * //      "confirmations": -1
   * //    }
   * //  ]
   * //]
   * //
   */
  async utxo(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response = await axios.get(
          `${this.restURL}bitcore/utxos/${address}`
        )
        return response.data
      } else if (Array.isArray(address)) {
        const response = await axios.post(`${this.restURL}bitcore/utxos`, {
          addresses: address
        })

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Bitcore
