<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="desserts"
    :pagination.sync="pagination"
    item-key="name"
    class="elevation-1"
  >
    <template slot="headers" slot-scope="props">
      <tr>
        <th
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
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.AvailDiscount }}</td>
        <td class="text-xs-right">{{ props.item.FinalPurchasePrice }}</td>
        <td class="text-xs-right">{{ props.item.DiscountPercentage }}</td>
        <td class="text-xs-right">{{ props.item.DiscounedAmount }}</td>
        <td class="text-xs-right">{{ props.item.Status }}</td>
      </tr>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    data: () => ({
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      headers: [
        {
          text: 'Asset Name',
          align: 'left',
          value: 'name'
        },
        { text: 'Avail Discount', value: 'AvailDiscount' },
        { text: 'Final Purchase Price', value: 'FinalPurchasePrice' },
        { text: 'Discount Percentage', value: 'DiscountPercentage' },
        { text: 'Discouned Amount', value: 'DiscounedAmount' },
        { text: 'Status', value: 'Status' }
      ],
      desserts: [
        {
          value: false,
          name: 'Frozen Yogurt',
          AvailDiscount: true?'Yes':'No',
          FinalPurchasePrice: 6.0,
          DiscountPercentage: 24,
          DiscounedAmount: 4.0,
          Status: 'Pending'
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          AvailDiscount: true?'Yes':'No',
          FinalPurchasePrice: 9.0,
          DiscountPercentage: 37,
          DiscounedAmount: 4.3,
          Status: 'Pending'
        }
      ]
    }),

    methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.desserts.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      }
    }
  }
</script>
<style scoped>
</style>


