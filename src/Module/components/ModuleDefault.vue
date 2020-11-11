<template>
  <div class="module-default">
    <v-data-table :headers="header" :items="items" sort-by="resource">
      <template v-slot:item.finish>
        <input type="checkbox" />
      </template>
      <template v-slot:item.click>
        <v-icon> mdi-checkbox-marked-circle </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api';
import { items, HEADER } from './const';

export default {
  name: 'ModuleDefault',
  setup() {
    return { header: ref(HEADER), items };
  }
};
</script>
