const axios = require("axios")
class Control {
  constructor(restURL) {
    this.restURL = restURL
  }

  /**
   * @api Control.getInfo() getInfo() - Get full node info
   * @apiName getInfo
   * @apiGroup Control
   * @apiDescription Returns an object containing various state info.
   *
   * @apiExample Example usage:
   * (async () => {
   *  try {
   *    let getInfo = await bchjs.Control.getInfo();
   *    console.log(getInfo);
   *  } catch(error) {
   *    console.error(error)
   *    }
   *  })()
   *
   * // {
   * //   version: 170000,
   * //   protocolversion: 70015,
   * //   blocks: 529235,
   * //   timeoffset: 0,
   * //   connections: 35,
   * //   proxy: '',
   * //   difficulty: 702784497476.8376,
   * //   testnet: false,
   * //   paytxfee: 0,
   * //   relayfee: 0.00001,
   * //   errors: ''
   * // }
   */
  async getInfo() {
    try {
      const response = await axios.get(`${this.restURL}control/getInfo`)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
  /**
   * @api Control.getNetworkInfo() getNetworkInfo() - Get Network info
   * @apiName getNetworkInfo
   * @apiGroup Control
   * @apiDescription Returns an object containing various network info.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let getInfo = await bchjs.Control.getNetworkInfo();
   *     console.log(getInfo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   * { version: 190500,
   *   subversion: '/Bitcoin ABC:0.19.5(EB32.0)/',
   *   protocolversion: 70015,
   *   localservices: '0000000000000425',
   *   localrelay: true,
   *   timeoffset: 0,
   *   networkactive: true,
   *   connections: 17,
   *   networks:
   *   [ { name: 'ipv4',
   *       limited: false,
   *       reachable: true,
   *       proxy: '',
   *       proxy_randomize_credentials: false },
   *     { name: 'ipv6',
   *       limited: false,
   *       reachable: true,
   *       proxy: '',
   *       proxy_randomize_credentials: false },
   *     { name: 'onion',
   *       limited: true,
   *       reachable: false,
   *       proxy: '',
   *       proxy_randomize_credentials: false } ],
   *   relayfee: 0.00001,
   *   excessutxocharge: 0,
   *   warnings:
   *   'Warning: Unknown block versions being mined! It\'s possible unknown rules are in effect' }}
   */
  async getNetworkInfo() {
    try {
      const response = await axios.get(`${this.restURL}control/getNetworkInfo`)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getMemoryInfo() {
    try {
      const response = await axios.get(`${this.restURL}control/getMemoryInfo`)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
  //
  // stop() {
  //   // Stop Bitcoin Cash server.
  //   return axios.post(`${this.restURL}control/stop`)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return JSON.stringify(error.response.data.error.message);
  //   });
  // }
}

module.exports = Control
