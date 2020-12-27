<template>
  <ValidationObserver v-slot="{}" slim>
    <v-container class="module-edit">
      <div class="module-edit__body">
        <div class="module-edit__container">
          <div class="module-edit__video">Video Name</div>
          <div class="module-edit__link">Link</div>
          <div class="module-edit__required">Required</div>
        </div>

        <div v-for="(i, index) in link" :key="i" class="module-edit__inputs">
          <div class="module-edit__inputs-video">
            <validation-provider v-slot="{ errors }" slim rules="required">
              <v-text-field
                v-model="video[index]"
                :error-messages="errors"
                label="Video Name"
                outlined
              ></v-text-field>
            </validation-provider>
          </div>
          <div class="module-edit__inputs-link">
            <validation-provider v-slot="{ errors }" slim rules="required">
              <v-text-field
                v-model="link[index]"
                label="Link"
                :error-messages="errors"
                outlined
              ></v-text-field>
            </validation-provider>
          </div>
          <div class="module-edit__inputs-required">
            <v-checkbox v-model="required[index]"></v-checkbox>
          </div>
        </div>

        <div class="module-edit__add">
          <v-btn class="module-edit__add-button" depressed :ripple="false" @click="populate()">
            <v-icon class="module-edit__add-icon"> mdi-plus </v-icon>
          </v-btn>
        </div>
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import {} from '@vue/composition-api';
// import gql from 'graphql-tag';

export default {
  name: 'ModuleSetup',

  setup() {
    const video = [''];
    const link = [''];
    const required = [''];

    function populate() {
      video.push('');
      link.push('');
      required.push('');
    }
    return {
      video,
      link,
      populate,
      required
    };
  }
};
</script>

<style lang="scss">
.module-edit {
  &__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 5%;
  }
  &__container {
    display: flex;
    flex-direction: row;
  }

  &__video {
    width: 100%;
  }
  &__link {
    margin-right: 15%;
  }
  &__required {
    padding-left: 20%;
  }
  &__inputs {
    margin-top: 1%;
    display: flex;
    flex-direction: row;
    &-video {
      display: flex;
      margin-right: 9%;
    }
    &-link {
      display: flex;
      margin-right: 10%;
    }
  }
  &__add {
    display: flex;
    width: 100%;
    padding-right: 15%;
    &-button {
      width: 100%;
    }
  }
}
</style>
