<template>
  <div class="hello">
    <ol-map/>
  </div>
</template>

<script>
import olMap from '../map/olMap'
export default {
  name: 'HelloWorld',
  components: {
    olMap
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  align-items: center;
  justify-content: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
