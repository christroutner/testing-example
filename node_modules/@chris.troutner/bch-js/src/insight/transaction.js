//const Bitcoin = require("bitcoincashjs-lib")
const axios = require("axios")

class Transaction {
  constructor(restURL) {
    this.restURL = restURL
  }
  /**
   * @api Insight.Transaction.details() details() - Get details about a Transaction.
   * @apiName details
   * @apiGroup Insight
   * @apiDescription Return details about a Transaction..
   *
   * @apiExample Example usage:
   *    (async () => {
   *   try {
   *     let transaction = await bchjs.Insight.Transaction.details('a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8');
   *     console.log(transaction);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * //  {
   * //  "txid": "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8",
   * //  "version": 1,
   * //  "locktime": 0,
   * //  "vin": [
   * //    {
   * //      "coinbase": "04ffff001d029804",
   * //      "sequence": 4294967295,
   * //      "n": 0
   * //    }
   * //  ],
   * //  "vout": [
   * //    {
   * //      "value": "50.00000000",
   * //      "n": 0,
   * //      "scriptPubKey": {
   * //        "hex": "41047737b5d3036fcc149960d41ce31d47c5a47d3a843b23898d28a5e24d1482616860ba5bc61f060586c7ac2b0e7e3ec76e4763cf897d5b8b1110691832c9368f8cac",
   * //        "asm": "047737b5d3036fcc149960d41ce31d47c5a47d3a843b23898d28a5e24d1482616860ba5bc61f060586c7ac2b0e7e3ec76e4763cf897d5b8b1110691832c9368f8c OP_CHECKSIG",
   * //        "addresses": [
   * //          "bitcoincash:qrlvuff9308reyfj3w3zgzy8d5r4kxvyxyew6kpsfa"
   * //        ],
   * //        "type": "pubkeyhash",
   * //        "cashAddrs": [
   * //          "bitcoincash:qrlvuff9308reyfj3w3zgzy8d5r4kxvyxyew6kpsfa"
   * //        ]
   * //      },
   * //      "spentTxId": null,
   * //      "spentIndex": null,
   * //      "spentHeight": null
   * //    }
   * //  ],
   * //  "blockhash": "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0",
   * //  "blockheight": 507,
   * //  "confirmations": 595468,
   * //  "time": 1231973656,
   * //  "blocktime": 1231973656,
   * //  "isCoinBase": true,
   * //  "valueOut": 50,
   * //  "size": 135
   * //  }
   * //
   */
  async details(txid) {
    try {
      // Handle single address.
      if (typeof txid === "string") {
        const response = await axios.get(
          `${this.restURL}insight/transaction/details/${txid}`
        )
        return response.data

        // Array of addresses
      } else if (Array.isArray(txid)) {
        const options = {
          method: "POST",
          url: `${this.restURL}insight/transaction/details`,
          data: {
            txids: txid
          }
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input txid must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Transaction
