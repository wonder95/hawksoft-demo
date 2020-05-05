<template>
  <v-container>
    <section class="top">
      <v-layout column>
        <v-form
          ref="form"
        >
          <v-text-field
            label="Name"
            v-model="address.name"
          ></v-text-field>
          <v-text-field
            label="Email Address"
            v-model="address.email"
          ></v-text-field>
          <v-text-field
            label="Address"
            v-model="address.address"
          ></v-text-field>
          <v-text-field
            label="City"
            v-model="address.city"
          ></v-text-field>
          <v-text-field
            label="State"
            v-model="address.state"
            max-width="2"
            max-size="2"
          ></v-text-field>
          <v-text-field
            label="Zip"
            v-model="address.zip"
          ></v-text-field>
          <v-btn
           class="mr-4"
           small
           color="primary"
            @click.stop="onSave"
          >
            Save
          </v-btn>
          <v-btn
            class="mr-4"
            small
            color="error"
            @click.stop="onDelete(address)"
          >
            Delete
          </v-btn>
          <v-btn
            small
            color="secondary"
            @click.stop="setAddress({})"
          >
            New
          </v-btn>
        </v-form>

        <v-dialog
          v-model="showDialog"
          max-width="300"
        >
          <v-card>
            <v-card-title>Duplicate Email Address</v-card-title>
            <v-card-text>The email address you used is already being used. Please try another one.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="showDialog=false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-layout>
    </section>
    <section class="bottom">
      <v-divider dark></v-divider>
      <v-data-table
        caption="Users"
        :headers="headers"
        :items="addresses"
        item-key="email"
        @click:row="setAddress"
        :items-per-page="5"
      >
      </v-data-table>
    </section>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {},
  data: () => ({
    // return {
    showDialog: false,
    isNew: false,
    address: {
      id: '',
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    },
    headers: [
      {
        text: 'Name',
        value: 'name',
        align: 'start'
      },
      {
        text: 'Email Address',
        value: 'email'
      },
      {
        text: 'Address',
        value: 'address'
      },
      {
        text: 'City',
        value: 'city'
      },
      {
        text: 'State',
        value: 'state'
      },
      {
        text: 'Zip',
        value: 'zip'
      }
    ]
    // }
  }),
  computed: {
    ...mapGetters({
      addresses: 'getAddresses',
      loaded: 'loaded'
    })
  },
  methods: {
    ...mapActions({
      loadAddresses: 'loadAddresses',
      deleteAddress: 'deleteAddress',
      addAddress: 'addAddress',
      updateAddress: 'updateAddress'
    }),
    onSave () {
      const vm = this
      // Check for duplicate email addresses, since that
      // is the row key.
      const matches = this.addresses.filter(addr => vm.address.email === addr.email)

      if (this.isNew) {
        if (!matches.length > 0) {
          this.addAddress(this.address)
        } else {
          this.showDialog = true
        }
      } else {
        this.updateAddress(this.address)
      }
    },
    onDelete (item) {
      this.deleteAddress(item)
      this.address = {
        id: '',
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      }
    },
    setAddress (address) {
      if (Object.keys(address).length === 0) {
        this.address = {
          id: '',
          name: '',
          email: '',
          address: '',
          city: '',
          state: '',
          zip: ''
        }
        this.isNew = true
      } else {
        this.address = Object.assign({}, address)
        this.isNew = false
      }
    },
    async fetchAddresses () {
      await this.loadAddresses()
      this.setAddress(this.addresses[0])
    }
  },
  mounted () {
    this.fetchAddresses()
  }
}
</script>
