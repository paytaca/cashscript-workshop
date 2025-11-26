<template>
  <div class="q-pa-md col q-gutter-md">
    <!-- Simple Card -->
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Basic Card</div>
        <div class="text-subtitle2 text-grey">Subtitle or description</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        Main content goes here. Cards can hold text, images, or even other components.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" />
        <q-btn unelevated label="Save" color="primary" />
      </q-card-actions>
    </q-card>

    <!-- Card with Image -->
    <q-card class="my-card">
      <img src="https://cdn.quasar.dev/img/mountains.jpg" ratio="16/9" />

      <q-card-section>
        <div class="text-h6">Card with Image</div>
        <div class="text-subtitle2 text-grey">Media on top</div>
      </q-card-section>

      <q-card-section>
        Cards are flexible and can mix media + actions.
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat icon="favorite" color="red" />
        <q-btn flat icon="share" color="primary" />
        <q-btn flat icon="bookmark" color="green" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
</script>

<style scoped>
.my-card {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>
