<template>
  <div class="module-default">
    <div class="module-default__instructions">
      <v-expansion-panels v-model="showInstructions" class="module-default__instructions" flat>
        <v-expansion-panel>
          <v-expansion-panel-header
            v-show="showInstructions"
            hide-actions
            class="pa-0"
            @click="showInstructions = true"
          >
            <template v-slot="{ open }">
              <v-scroll-y-transition hide-on-leave>
                <div v-if="!open" class="d-flex flex-column justify-center">
                  <v-icon color="grey lighten-2" class="d-flex justify-center">
                    mdi-chevron-down
                  </v-icon>
                  <div color="grey lighten-2" class="module-default__collapse-title">
                    INSTRUCTIONS
                  </div>
                </div>
              </v-scroll-y-transition>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <Instruct readonly />
            <div @click="showInstructions = true">
              <div class="module-default__collapse-title">CLOSE</div>
              <!-- <div class="hr"/> OPTIONAL -->
              <v-icon color="grey lighten-2" class="d-flex justify-center"> mdi-chevron-up </v-icon>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-progress-linear
      class="module-default__collapse-divider"
      color="#dedede"
      height="2"
      value="100"
      buffer-value="100"
      stream
    />
    <div class="">
      <v-data-table
        :headers="header"
        :items="researchProgress"
        sort-by="resource"
        :items-per-page="100"
        :hide-default-footer="true"
      >
        <template v-slot:item.click="{ item }">
          <!-- WHEN REVIEWED AND CONFIRMED -->
          <v-icon v-if="item.completed" color="green"> mdi-checkbox-marked-circle </v-icon>
          <!-- WHEN ONE HAS BEEN REVIEWED OR CONFIRMED -->
          <v-icon v-else-if="item.viewed" color="yellow"> mdi-alert-circle </v-icon>
          <!-- WHEN NONE HAVE BEEN REVIEWED OR CONFIRMED -->
          <v-icon v-else color="grey"> mdi-close-circle </v-icon>
        </template>
        <template v-slot:item.cta="{ item }">
          <v-btn v-if="item.viewed" x-small outlined depressed>
            <v-icon left x-small color="green">mdi-check-bold </v-icon>Goto Link</v-btn
          >
          <v-btn
            v-else
            x-small
            outlined
            depressed
            :href="item.link"
            target="_blank"
            @click="item.viewed = true"
          >
            Goto Link</v-btn
          >
        </template>
        <template v-slot:item.required="{ item }">
          <v-btn v-if="item.required" x-small color="red" outlined depressed>Required</v-btn>
          <v-btn v-else x-small disabled>Recommended</v-btn>
        </template>
        <template v-slot:item.finish="{ item }">
          <v-checkbox v-model="item.completed" :disabled="!item.viewed" type="checkbox" />
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from '@vue/composition-api';
import MongoDoc from '../types';
import { items, HEADER } from './const';
import Instruct from './ModuleInstruct.vue';

export default defineComponent({
  name: 'ModuleDefault',
  components: {
    Instruct
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    }
  },
  setup(props, ctx) {
    // props
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });
    const researchData = computed(() =>
      programDoc.value.data.adks.find(obj => obj.name === 'research')
    );
    const researchProgress = ref(
      (researchData.value!.researchLinks as any[]).map((obj: any) => ({
        ...obj,
        viewed: false,
        completed: false
      }))
    );
    // layout
    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    const showInstructions = ref(true);
    return {
      header: HEADER,
      items,
      setupInstructions,
      showInstructions,
      researchProgress,
      researchData
    };
  }
});
</script>

<style lang="scss">
.module-default {
  padding: 0px;
  &__none {
    border-radius: 5px;
    // border: 1px solid #dedede;
    height: 100px;
    text-align: center;
    background-color: #dedede;
    font-weight: 700;
    color: #ffffff;
    font-size: 18px;
    padding-top: 35px;
  }

  &__collapse-divider {
    margin-top: 15px;
    margin-bottom: 75px;
    margin-right: none;
    margin-left: none;
    padding-right: none;
    padding-left: none;
    width: 100%;
  }

  &__collapse-title {
    color: #dedede;
    text-align: center;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1px;
    font-size: 13px;
    //  text-uppercase font-weight-bold text-subtitle-2 text-center
  }

  &__container {
    // width: 100%;
    // padding: none;
    // margin: none;
    margin-top: 0px;
    padding: 0px;
    // max-width: 100%;
  }
  &__employer-title {
    font-size: 25px;
    font-weight: 700;
  }

  &__scope {
    font-size: 22px;
    font-weight: 800;
    text-align: center;
    max-width: 95%;
    margin: auto;
  }
  &__youtube {
    height: 400px;
    width: 95%;
    border-radius: 25px;
    // margin: 0px;
    background-color: #dedede;

    // text-align: center;
    // justify-content: center;
    // align-items: center;
    // padding-top: auto;
    // padding-bottom: auto;
  }
  &__about {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }

  &__faq {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }

  &__faq-chat {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 5%;
  }
  &__faq-chat-line {
    margin: 5px;
  }

  &__faq-avatar {
    margin: 5px;
  }

  &__faq-question {
    // text-align: left;
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 800;
    color: #404142;
  }

  &__faq-answer {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: white;
    font-style: italic;
  }

  &__faq-answer-dark {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: #404142;
    font-style: italic;
  }

  &__faq-answer-dark-highlight {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0px;
    color: #404142;
  }

  &__specs-title {
    font-weight: 800;
  }
}
</style>
