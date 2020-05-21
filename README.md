# Vue Vuex API Demo
A simple demo app to demostrate how to keep the data model for a form in a Vue component in sync with a back end and Vuex using a REST API.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Customize configuration
Uses fetch API and MirageJS to create a mock API.

### Notes:
* On load, first record is displayed.
* To create a new record, click New, enter data, and Save
* To delete record, click on desired row anc click Delete button
* Table can be sorted by clicking on table headers.

### Structure
* Design framework - Vuetify
* API - MiragaJS for data set and endpoints, Javascript fetch() to get records
* State management - Vuex
