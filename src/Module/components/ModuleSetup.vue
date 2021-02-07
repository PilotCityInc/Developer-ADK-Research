<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <v-container class="module-edit">
      <div class="module-edit__body">
        <div class="module-edit__container">
          <!-- <div class="module-edit__video">Name</div>
          <div class="module-edit__link">Link</div>
          <div class="module-edit__required">Required</div> -->
        </div>

        <div
          v-for="(i, index) in programDoc.data.adks[index].research"
          :key="index"
          class="module-edit__inputs"
        >
          <div class="module-edit__inputs-video">
            <validation-provider v-slot="{ errors }" slim rules="required">
              <v-text-field
                v-model="i.name"
                :error-messages="errors"
                label="Resource Name"
                outlined
              >
              </v-text-field>
              <!-- <div>{{ i.name }}</div> -->
            </validation-provider>
          </div>
          <div class="module-edit__inputs-link">
            <validation-provider
              v-slot="{ errors }"
              slim
              :rules="{
                required: true
              }"
            >
              <v-text-field
                v-model="i.link"
                label="Enter Link"
                :error-messages="errors"
                outlined
              ></v-text-field>
            </validation-provider>
          </div>
          <div class="module-edit__inputs-required">
            <v-checkbox label="Required?"></v-checkbox>
          </div>
          <div class="module-edit__inputs-required">
            <!-- <v-checkbox v-model="i.required"></v-checkbox> -->
            <v-btn x-large outlined>Delete</v-btn>
          </div>
        </div>

        <div class="module-edit__add">
          <v-btn
            x-large
            class="module-edit__add-button"
            depressed
            outlined
            :disabled="invalid"
            :ripple="false"
            @click="populate()"
          >
            <v-icon class="module-edit__add-icon"> mdi-plus </v-icon>
          </v-btn>
          <!-- <v-btn :loading="loading" @click="save">Save</v-btn>
          <p>{{ errormsg }}</p> -->
        </div>
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from '@vue/composition-api';
import MongoDoc from '../types';
// import gql from 'graphql-tag';

export default defineComponent({
  name: 'ModuleSetup',
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    }
  },
  setup(props, ctx) {
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    const index = programDoc.value.data.adks.findIndex(function findResearchObj(obj) {
      return obj.name === 'research';
    });
    const initResearchSetup = {
      research: [
        {
          name: '',
          link: '',
          required: false
        }
      ]
    };

    programDoc.value.data.adks[index] = {
      ...initResearchSetup,
      ...programDoc.value.data.adks[index]
    };
    // Handle Save
    const loading = ref(false);
    const errormsg = ref('');
    async function save() {
      loading.value = true;
      try {
        await programDoc.value.save();
        errormsg.value = '';
      } catch (err) {
        errormsg.value = 'Could not save';
      }
      loading.value = false;
    }

    function populate() {
      programDoc.value.data.adks[index].research.push(initResearchSetup.research[0]);
    }

    return {
      populate,
      loading,
      save,
      errormsg,
      index,
      programDoc
    };
  }
});
</script>

<style lang="scss">
.module-edit {
  &__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    // padding-left: 5%;
    justify-content: center;
    align-items: center;
  }
  &__container {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  &__video {
    width: 100%;
  }
  &__link {
    // margin-right: 15%;
    width: 100%;
  }
  &__required {
    // padding-left: 20%;
    width: 100%;
  }
  &__inputs {
    width: 100%;
    margin-top: 1%;
    display: flex;
    flex-direction: row;
    &-video {
      display: flex;
      width: 100%;
      // margin-right: 9%;
    }
    &-link {
      display: flex;
      width: 100%;
      margin-left: 3%;
    }
    &-required {
      display: flex;
      // width: 100%;
      margin-left: 3%;
      justify-content: center;
    }
  }
  &__add {
    display: flex;
    width: 100%;
    // padding-right: 15%;
    &-button {
      width: 100%;
    }
  }
}
</style>
