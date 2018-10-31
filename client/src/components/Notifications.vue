<template>
    <div>
     <v-snackbar
      v-model="show"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ messege }}
      <v-btn
        color="pink"
        flat
        @click="show = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      y: "top",
      x: null,
      mode: "",
      timeout: 6000
    };
  },
  props: {
    show: Boolean,
    messege: String
  }
};
</script>
