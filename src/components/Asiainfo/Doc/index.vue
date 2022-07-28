<template>
  <div>
    <svg-icon icon-class="question" @click="goto"/>
  </div>
</template>

<script>
export default {
  name: 'AsiainfoDoc',
  data() {
    return {
      url: 'http://10.1.235.71/docs'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
