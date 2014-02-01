# ttl-pool

  a pool of expiring things

## Installation

    npm install ttl-pool

## API

### TTLPool(function onExpiry(name, explicit))
### TTLPool(ttl, function onExpiry(name, explicit))

  Returns a fresh TTL pool, with an optional default TTL.

### ttlPool.add(id)
### ttlPool.add(id, ttl)

  Adds something to the pool.

### ttlPool.ping(id)
### ttlPool.ping(id, ttl)

  Resets the TTL for something.

### ttlpool.remove(id)

  Removes something from the pool silently.

### ttlPool.expire(id)

  Expire something in the pool explicitly.
