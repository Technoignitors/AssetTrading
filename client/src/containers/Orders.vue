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
        <td style="text-align:center">{{ props.item.AssetDetails.SKU }}</td>
        <td style="text-align:center">{{ props.item.AssetDetails.Name }}</td>
        <td style="text-align:center">{{ props.item.AssetDetails.Description }}</td>
        <td style="text-align:center">{{ props.item.FinalPurchasePrice }}</td>
        <td style="text-align:center">{{ props.item.CreatedOn | formatDate}}</td>
        <td style="text-align:center">{{ props.item.Status }}</td>
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
      { text: "Price(Ç)", value: "FinalPurchasePrice" },
      { text: "Created", value: "CreatedOn" },
      { text: "Status", value: "Status" }
    ],
    tableData: []
  }),

  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.tableData.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  },
  mounted: async function() {
    let response = await PostsService.getOrderHistory({
      userID: sessionStorage.getItem("userID")
    });
    this.tableData = response.data.Orders;
    //this.total = this.tableData.length;
  }
};
</script>
<style scoped>
</style>


