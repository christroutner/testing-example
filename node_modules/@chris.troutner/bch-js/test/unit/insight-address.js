const assert = require("assert")
const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()
const axios = require("axios")
const sinon = require("sinon")

describe("#details", () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  it("should get details", done => {
    const data = {
      legacyAddress: "3CnzuFFbtgVyHNiDH8BknGo3PQ3dpdThgJ",
      cashAddress: "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l",
      balance: 300.0828874,
      balanceSat: 30008288740,
      totalReceived: 12945.45174649,
      totalReceivedSat: 1294545174649,
      totalSent: 12645.36885909,
      totalSentSat: 1264536885909,
      unconfirmedBalance: 0,
      unconfirmedBalanceSat: 0,
      unconfirmedTxApperances: 0,
      txApperances: 1042,
      transactions: [
        "b29425a876f62e114508e67e66b5eb1ab0d320d7c9a57fb0ece086a36e2b7309"
      ]
    }

    const resolved = new Promise(r => r({ data: data }))
    sandbox.stub(axios, "get").returns(resolved)

    bchjs.Insight.Address.details(
      "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
    )
      .then(result => {
        assert.deepEqual(data, result)
      })
      .then(done, done)
  })
})

describe("#utxo", () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  it("should get utxo", done => {
    const data = [
      {
        legacyAddress: "3CnzuFFbtgVyHNiDH8BknGo3PQ3dpdThgJ",
        cashAddress: "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l",
        txid:
          "6f56254424378d6914cebd097579c70664843e5876ca86f0bf412ba7f3928326",
        vout: 0,
        scriptPubKey: "a91479cb06a5986baf588237de9b7fb1a8f68c35b76687",
        amount: 12.5002911,
        satoshis: 1250029110,
        height: 528745,
        confirmations: 17
      },
      {
        legacyAddress: "3CnzuFFbtgVyHNiDH8BknGo3PQ3dpdThgJ",
        cashAddress: "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l",
        txid:
          "b29425a876f62e114508e67e66b5eb1ab0d320d7c9a57fb0ece086a36e2b7309",
        vout: 0,
        scriptPubKey: "a91479cb06a5986baf588237de9b7fb1a8f68c35b76687",
        amount: 12.50069247,
        satoshis: 1250069247,
        height: 528744,
        confirmations: 18
      }
    ]
    const resolved = new Promise(r => r({ data: data }))
    sandbox.stub(axios, "get").returns(resolved)

    bchjs.Insight.Address.utxo(
      "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l"
    )
      .then(result => {
        assert.deepEqual(data, result)
      })
      .then(done, done)
  })
})

describe("#unconfirmed", () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  it("should get unconfirmed transactions", done => {
    const data = [
      {
        txid:
          "e0aadd861a06993e39af932bb0b9ad69e7b37ef5843a13c6724789e1c94f3513",
        vout: 1,
        scriptPubKey: "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
        amount: 0.00008273,
        satoshis: 8273,
        confirmations: 0,
        ts: 1526680569,
        legacyAddress: "1Fg4r9iDrEkCcDmHTy2T79EusNfhyQpu7W",
        cashAddress: "bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c"
      }
    ]
    const resolved = new Promise(r => r({ data: data }))
    sandbox.stub(axios, "get").returns(resolved)

    bchjs.Insight.Address.unconfirmed(
      "bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c"
    )
      .then(result => {
        assert.deepEqual(data, result)
      })
      .then(done, done)
  })
})
