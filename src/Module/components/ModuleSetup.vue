<template>
  <ValidationObserver v-slot="{}" slim>
    <v-container class="module-edit">
      <div class="module-edit__body">
        <div class="module-edit__container">
          <div class="module-edit__video">Video Name</div>
          <div class="module-edit__link">Link</div>
          <div class="module-edit__required">Required</div>
        </div>

        <div class="module-edit__inputs">
          <div class="module-edit__inputs-video">
            <validation-provider v-slot="{ errors }" slim rules="required">
              <v-text-field
                v-model="video"
                :error-messages="errors"
                label="Video Name"
                outlined
              ></v-text-field>
            </validation-provider>
          </div>
          <div class="module-edit__inputs-link">
            <validation-provider v-slot="{ errors }" slim rules="required">
              <v-text-field
                v-model="link"
                label="Link"
                :error-messages="errors"
                outlined
              ></v-text-field>
            </validation-provider>
          </div>
          <div class="module-edit__inputs-required">
            <v-checkbox></v-checkbox>
          </div>
        </div>

        <div class="module-edit__add">
          <v-btn class="module-edit__add-button" depressed :ripple="false">
            <v-icon class="module-edit__add-icon"> mdi-plus </v-icon>
          </v-btn>
        </div>
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api';
// import gql from 'graphql-tag';

export default {
  name: 'ModuleSetup',

  setup() {
    const setup = reactive({
      video: '',
      link: ''
    });

    return {
      ...toRefs(setup)
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
