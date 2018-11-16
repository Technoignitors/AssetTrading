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
        <td style="text-align:center">{{ props.item.UserDetails.FirstName }} {{ props.item.UserDetails.LastName }}</td>
        <td style="text-align:center">{{ props.item.AssetDetails.Description }}</td>
        <td style="text-align:center">{{ props.item.FinalPurchasePrice }}</td>
        <td style="text-align:center">{{ props.item.CreatedOn | formatDate}}</td>
        <td>
            <button class="btn btn-sm btn-success" @click="approveOrder(props.item._id, props.item.AssetID, 'approve')">Approve</button>&nbsp;&nbsp;
            <button class="btn btn-sm btn-danger" @click="approveOrder(props.item._id, props.item.AssetID, 'reject')">Reject</button>
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
      { text: "Current Owner", value: "UserDetails.FirstName" },
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
    async approveOrder(id, AssetID, type) {
      var request = {
        userID: sessionStorage.getItem("userID"),
        OrderId: id,
        Status: type == 'approve'?"Completed":"Rejected",
        AssetID: AssetID
      };
      let response = await PostsService.setOrder(request);
      let response1 = await PostsService.getAllPendingOrder();
      this.tableData = response1.data.Orders;
    },
    rejectOrder(id) {
      console.log(id);
    }
  },
  mounted: async function() {
    let response = await PostsService.getAllPendingOrder();
    this.tableData = response.data.Orders;
  }
};
</script>
<style scoped>
</style>


