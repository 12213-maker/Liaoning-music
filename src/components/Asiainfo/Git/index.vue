<template>
  <div>
    <svg-icon icon-class="github" @click="goto"/>
  </div>
</template>

<script>
export default {
  name: 'AsiainfoGit',
  data() {
    return {
      url: 'http://10.1.235.70:8889/'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
