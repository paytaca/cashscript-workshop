<template>
  <q-page padding class="q-gutter-lg">
    <div class="text-h3">Quasar CSS Classes</div>
    <div class="q-pa-md shadow-3 rounded-borders">
      <div class="text-h4">Layout</div>
      <div class="row q-gutter-sm">
        <q-select label="Pattern" v-model="layout.flow" :options="layout.flowOpts" outlined dense class="col"/>
        <q-select label="Vertical alignment" v-model="layout.align" :options="layout.alignOpts" outlined dense class="col"/>
        <q-select label="Horizontal aligment" v-model="layout.justify" :options="layout.justifyOpts" outlined dense class="col"/>
      </div>

      <div class="row q-pa-sm items-center justify-around text-h5">
        <div>Container class: {{ layoutContainerClass }}</div>
      </div>

      <div :class="layoutContainerClass" style="min-height:3rem;">
        <div class="bg-blue" style="min-height:3rem">Element 1</div>
        <div class="bg-blue" style="min-height:2rem">Element 2</div>
        <div class="bg-blue" style="min-height:5rem">Element 3</div>
      </div>
    </div>

    <div class="q-pa-md shadow-3 rounded-borders">
      <div class="text-h4">Text sizes</div>
      <q-select label="Text sizes" v-model="selectedTextSize" :options="textSizes" outlined class="q-mb-md"/>
      <div :class="[selectedTextSize]">
        The quick brown fox jumps over the lazy dog
      </div>
    </div>

    <div class="q-pa-md shadow-3 rounded-borders">
      <div class="text-h4">Colors</div>
      <div class="text-body2">
        Applies to for text by setting
        <i>{{ 'text-<color-name>' }}</i>
        and background 
        <i>{{ 'bg-<color-name>' }}</i>
      </div>
      <q-option-group
        v-model="colorType"
        :options="colorTypes"
        color="primary"
        inline
      />

      <div class="row items-center">
        <q-select label="Brand color" v-model="selectedBrandColor" :options="brandColors" dense class="col-6"/>
        <div class="text-white col-6">
          <div :class="colorBrandClass + ' q-pa-sm'">
            {{ colorBrandClass }}
          </div>
        </div>
      </div>

      <q-separator spaced/>
  
      <q-select label="Colors" v-model="selectedColor" :options="colors" dense class="col-6"/>
      <div v-if="selectedColor" class="row items-center">
        <div class="q-pa-sm text-white col-3">
          <div :class="colorClass + ' q-pa-sm'">
            {{ colorClass }}
          </div>
        </div>
        <div
          v-for="num in 14" :key="num"
          class="q-pa-sm text-white col-3"
        >
          <div :class="colorClass + '-' + num + ' q-pa-sm'">
            {{ colorClass }}-{{ num }}
          </div>
        </div>
      </div>
    </div>

    <div class="q-pa-md shadow-3 rounded-borders">
      <div class="text-h4">Spacing</div>
      <div class="row items-center justify-around q-mb-md">
        <q-select v-model="spacing.margin.side" label="Margin(side)" :options="spacingSideOpts" outlined dense class="col-2"/>
        <q-select v-model="spacing.margin.size" label="Margin(size)" :options="spacingSizeOpts" outlined dense class="col-2"/>
        <q-select v-model="spacing.padding.side" label="Padding(side)" :options="spacingSideOpts" outlined dense class="col-2"/>
        <q-select v-model="spacing.padding.size" label="Padding(size)" :options="spacingSizeOpts" outlined dense class="col-2"/>
      </div>

      <div class="text-h5 q-pa-md row items-center justify-around">
        <div>
          Padding class: {{ spacingPaddingClass }}
        </div>

        <div>
          Margin class: {{ spacingMarginClass }}
        </div>
      </div>
      
      <div class="row items-center justify-center">
        <div class="col-12 q-py-sm q-px-md text-white bg-amber">Top</div>
        <div class="q-pa-sm text-white bg-blue">Left</div>
        <div
          :class="spacingPaddingClass + ' ' + spacingMarginClass"
          style="border: 1px solid black;"
        >
          Center
        </div>
        <div class="q-pa-sm text-white bg-blue">Right</div>
        <div class="col-12 q-py-sm q-px-md text-white bg-amber">Bottom</div>
      </div>
    </div>

    <!-- Shadow Examples -->
    <div class="q-pa-md shadow-3 rounded-borders">
      <div class="text-h6 q-mb-sm">Shadow & Borders Classes</div>
      <div class="row q-col-gutter-md">
        <div class="col-3">
          <div class="bg-white q-pa-md shadow-1 rounded-borders">shadow-1</div>
        </div>
        <div class="col-3">
          <div class="bg-white q-pa-md shadow-5 rounded-borders">shadow-5</div>
        </div>
        <div class="col-3">
          <div class="bg-white q-pa-md shadow-10 rounded-borders">shadow-10</div>
        </div>
        <div class="col-3">
          <div class="bg-white q-pa-md shadow-24 rounded-borders">shadow-24</div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default({
  name: 'QuasarClasses',
  data() {
    return {
      layout: {
        flow: 'row',
        flowOpts: ['row', 'col'],

        justify: 'center',
        justifyOpts: ['center', 'start', 'end', 'between', 'around', 'evenly'],

        align: 'center',
        alignOpts: ['center', 'start', 'end', 'stretch']
      },

      selectedTextSize: 'text-h1',
      textSizes: [
        'text-h1', 'text-h2', 'text-h3', 'text-h4', 'text-h5', 'text-h6',
        'text-subtitle1', 'text-subtitle2',
        'text-body1', 'text-body2',
        'text-caption',
      ],

      colorType: 'bg',
      colorTypes: [{ label: 'Text', value: 'text'}, { label: 'Background', value: 'bg' }],
      selectedBrandColor: 'primary',
      brandColors: [
        'primary', 'secondary', 'accent', 'dark', 'positive',
        'negative', 'info', 'warning', 'black', 'white',
      ],
      selectedColor: 'blue',
      colors: [
        'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue',
        'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber',
        'orange', 'deep-orange', 'brown', 'grey', 'blue-grey',
      ],

      spacingSideOpts: [ 'a', 'x', 'y', 't', 'b', 'l', 'r' ],
      spacingSizeOpts: [ 'none', 'xs', 'sm', 'md', 'lg', 'xl' ],
      spacing: {
        margin: { side: 'a', size: 'md' },
        padding: { side: 'a', size: 'md' },
      },
    }
  },

  computed: {
    layoutContainerClass() {
      return this.layout.flow + ' items-' + this.layout.align + ' justify-' + this.layout.justify
    },
    colorBrandClass() {
      return this.colorType + '-' + this.selectedBrandColor
    },
    colorClass() {
      return this.colorType + '-' + this.selectedColor
    },
    spacingMarginClass() {
      return 'q-m' + this.spacing.margin.side + '-' + this.spacing.margin.size;
    },
    spacingPaddingClass() {
      return 'q-p' + this.spacing.padding.side + '-' + this.spacing.padding.size;
    },
  }
})
</script>
