<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <v-container class="module-edit">
      <div :ref="body" class="module-edit__body">
        <div class="module-edit__container">
          <!-- <div class="module-edit__video">Name</div>
          <div class="module-edit__link">Link</div>
          <div class="module-edit__required">Required</div> -->
        </div>

        <div
          v-for="(i, itemIndex) in programDoc.data.adks[index].researchLinks"
          :key="itemIndex"
          class="module-edit__inputs"
        >
          <div class="module-edit__inputs-video">
            <validation-provider v-slot="{ errors }" slim rules="required">
              <v-text-field
                v-model="i.resource"
                :error-messages="errors"
                label="Resource Name"
                outlined
                rounded
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
                rounded
              ></v-text-field>
            </validation-provider>
          </div>
          <div class="module-edit__inputs-required">
            <v-checkbox v-model="i.required" label="Required?"></v-checkbox>
          </div>
          <div class="module-edit__inputs-required">
            <!-- <v-checkbox v-model="i.required"></v-checkbox> -->
            <v-btn
              rounded
              x-large
              outlined
              :disabled="itemIndex === 0"
              @click="removeItem(itemIndex)"
              >Delete</v-btn
            >
          </div>
        </div>

        <div class="module-edit__add">
          <v-btn
            x-large
            rounded
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
        <div>
          <v-btn
            class="mt-12"
            x-large
            outlined
            depressed
            :disabled="invalid"
            :loading="loading"
            @click="process()"
            >Save</v-btn
          >
        </div>
        <v-alert v-if="success || error" :type="success ? 'success' : 'error'">{{
          message
        }}</v-alert>
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from '@vue/composition-api';
import { createLoader, getModAdk } from 'pcv4lib/src';
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

    let index = programDoc.value.data.adks.findIndex(obj => obj.name === 'research');
    if (index === -1)
      index =
        programDoc.value.data.adks.push({
          name: 'research'
        }) - 1;
    const initResearchSetup = {
      researchLinks: [
        {
          resource: '',
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
    const body = ref(0);
    function populate() {
      programDoc.value.data.adks[index].researchLinks.push({
        resource: '',
        link: '',
        required: false
      });
      body.value += 1;
    }
    function removeItem(itemIndex: number) {
      programDoc.value.data.adks[index].researchLinks.splice(itemIndex, 1);
      body.value += 1;
    }
    return {
      populate,
      index,
      programDoc,
      body,
      removeItem,
      ...createLoader(programDoc.value.save, 'Saved Successfully', 'Could not save at this time')
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
