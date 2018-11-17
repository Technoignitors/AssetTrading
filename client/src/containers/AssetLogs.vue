<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="tableData"
    :pagination.sync="pagination"
    
    item-key="name"
    class="elevation-1"
  >
    <template slot="headers" slot-scope="props">
      <tr>
        <th style="text-align:center"
          v-for="header in props.headers"
          :key="header.text"
          :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
          @click="changeSort(header.value)"
        >
          <v-icon small>arrow_upward</v-icon>
          {{ header.text }}
        </th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <tr :active="props.selected" @click="props.selected = !props.selected">
        <td style="text-align:center">{{ props.item.SKU }}</td>
        <td style="text-align:center">{{ props.item.Name }}</td>
        <td style="text-align:center">{{ props.item.Description }}</td>
        <td style="text-align:center">{{ props.item.OwnerShipDetails.FinalPurchasePrice }}</td>
         <td style="text-align:center">{{ props.item.CreatedOn | formatDate}}</td>
        <td>
            <button class="btn btn-sm btn-success" @click="viewHistory(props.item._id)">View History</button>&nbsp;&nbsp;
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
<script>
import PostsService from "@/services/PostsService";
export default {
  data: () => ({
    pagination: {
      sortBy: "Status"
    },
    selected: [],
    headers: [
      {
        text: "SKU",
        value: "_id"
      },
      {
        text: "Name",
        value: "_id"
      },
      { text: "Description", value: "Description" },
      { text: "Price (Ç)", value: "FinalPurchasePrice" },
      { text: "Created", value: "CreatedOn" },
      { text: "Actions", value: "Status" }
    ],
    tableData: []
  }),

  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.desserts.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    viewHistory(id){
      console.log(id)
    }
  },
  mounted: async function() {
    let response = await PostsService.getAllAssets();
    this.tableData = response.data.Assets;
  }
};
</script>
<style scoped>
</style>


