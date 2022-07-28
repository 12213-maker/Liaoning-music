<template>
  <div>
    <debug-function></debug-function>
  </div>
</template>

<script>
  const DebugFunction = () =>  import ('./DebugFunction');
  export default {
    components: {
      DebugFunction
    }
  }
</script>