/*
  An example of a typical utility library. Things to notice:
  - This library is exported as a Class.
  - External dependencies are embedded into the class 'this' object: this.bitbox
  - `_this` maintains top-level context for `this`.
*/

'use strict'

let _this

class UtilLib {
  constructor() {
    _this = this

  }

  async getBalance(addr) {

  }
  
}
