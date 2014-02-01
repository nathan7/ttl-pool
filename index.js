'use strict';
module.exports = TTLPool

var Dict = require('dict')

function TTLPool(ttl, cb) {
  if (!(this instanceof TTLPool)) return new TTLPool(ttl, cb)

  if (typeof ttl == 'function') {
    cb = ttl
    ttl = 0
  }

  this.ttl = ttl
  this._cb = cb

  this._dict = new Dict()
}

TTLPool.prototype.add = function(name, ttl) {
  ttl = ttl || this.ttl
  if (this._dict.has(name)) return
  this._dict.set(name, setTimeout(this._expire.bind(this, name), ttl))
}

TTLPool.prototype._expire = function(name, explicit) {
  this.remove(name)
  var cb = this._cb
  cb(name, explicit)
}

TTLPool.prototype.expire = function(name) {
  this._expire(name, true)
}

TTLPool.prototype.remove = function(name) {
  var timer = this._dict.get(name)
  if (this._dict.delete(name)) clearTimeout(timer)
}

TTLPool.prototype.ping = function(name, ttl) {
  ttl = ttl || this.ttl
  if (!this._dict.has(name)) return
  clearTimeout(this._dict.get(name))
  this._dict.set(name, setTimeout(this._expire.bind(this, name), ttl))
}
