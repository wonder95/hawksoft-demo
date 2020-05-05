import { Server, Model } from 'miragejs'
import addressList from '@/addresses.json'

export function makeServer ({ environment = 'development' } = {}) {
  const server = new Server({
    environment,

    models: {
      address: Model
    },

    seeds (server) {
      const list = addressList.addresses
      list.forEach(addr => {
        server.create('address', addr)
      })
    },

    routes () {
      this.namespace = 'api'

      this.get('/addresses', (schema) => {
        return schema.addresses.all()
      })

      this.post('/addresses', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        const newAddress = schema.addresses.create(attrs)
        return schema.addresses.find(newAddress.id)
      })
    }
  })

  return server
}
