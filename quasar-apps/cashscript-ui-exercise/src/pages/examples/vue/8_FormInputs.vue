<template>
  <div class="container q-gutter-sm">
    <h4>Form Inputs</h4>

    <div>
      <div>Simple textbox</div>
      <input v-model="text" placeholder="Text"/>
    </div>
    <div>
      <!-- Can try number, date, time, color, etc  -->
      <div>Input with "type" attribute</div>
      <input v-model="text" placeholder="Text" type="time"/>
    </div>
    <div>
      <div>Multiline textbox</div>
      <textarea v-model="text" placeholder="Text"></textarea>
    </div>

    <hr/>

    <div>
      <input v-model="checkboxValue" type="checkbox" id="my-checkbox"/>
      <label for="my-checkbox">Checkbox</label>
    </div>

    <hr/>

    <div>
      <div>Radio Input: {{ radioValue }}</div>
      <div>Typeof radio input: {{ typeof radioValue }}</div>
      <input type="radio" id="one" value="One" v-model="radioValue" />
      <label for="one">One</label>
      <br/>
      <input type="radio" id="two" :value="2" v-model="radioValue" />
      <label for="two">Two</label>
      <br/>
      <input type="radio" id="three" :value="{ name: 'Bob', age: 21 }" v-model="radioValue" />
      <label for="three">My value is not a string</label>
    </div>

    <hr/>

    
    <div>
      <div>Custom selected value: {{ customSelect }}</div>
      <div>Typeof customSelect: {{ typeof customSelect }}</div>
      <select v-model="customSelect">
        <!-- inline object literal -->
        <option>This is a string</option>
        <option value="I am the custom value">I have a custom value</option>
        <option :value="4121">This is a number of 4121</option>
        <option :value="{ number: 123, name: 'Number' }">This is an object</option>
      </select>
    </div>

    <hr/>

    <div>
      <div> Custom checkbox value: {{ customCheckboxValue }} </div>
      <div>Typeof customCheckboxValue: {{ typeof customCheckboxValue }}</div>
      <input
        v-model="customCheckboxValue" type="checkbox"
        id="my-checkbox-2"
        :true-value="1312"
        false-value="Custom string value as false"
      />
      <label for="my-checkbox-2">Checkbox with custom true/false value</label>
    </div>

    <hr/>

    <div class="subtitle"> <i>v-model</i> modifiers</div>

    <div>Text with <i>.lazy</i>, will update value after losing focus</div>
    <input v-model.lazy="text" placeholder="Text here"/>

    <div>
      <div>Text with <i>.number</i>, parse value as number</div>
      <div>Type of text: {{ typeof text }}</div>
    </div>
    <input v-model.number="text" placeholder="Text here"/>

    <div>Text with <i>.trim</i>, remove leading & trailing white spaces</div>
    <input v-model.trim="text" placeholder="Text here"/>

    <hr/>

    <div>
      <div>Form element</div>
      <form @submit="onSubmit"> 
        <input v-model="text"/>

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const text = ref('');
const checkboxValue = ref(true);
const radioValue = ref('');
const customCheckboxValue = ref('');
const customSelect = ref('');

function onSubmit() {
  alert('Submitted!');
}
</script>
<style>
.container {
  max-width: min(400px, 75vw);
  margin: 0 auto;
}

.subtitle {
  font-size: 1.5rem;
}
</style>
