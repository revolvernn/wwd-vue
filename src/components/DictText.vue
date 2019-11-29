<template>
  <div><van-icon v-if="icon" :class="'iconfont '+ icon " /> {{label || text}}{{otherText}}</div>
</template>

<script>
export default {
  props: {
    icon: {
      default: null
    },
    type: {
      default: null
    },
    val: {
      default: null
    },
    text: {
      default: ''
    },
    otherText: {
      default: ''
    }
  },
  data () {
    return {
      label: null
    }
  },
  created () {
    this.setLabel(this.type, this.val)
  },
  watch: {
    type (type) {
      this.setLabel(type, this.val)
    },
    val (val) {
      this.setLabel(this.type, val)
    }
  },
  methods: {
    setLabel (type, val) {
      if (type && val) {
        let self = this
        this.$http.getDictByValue(type, val).then(function (dict) {
          self.label = dict.name
        })
      }
    }
  }
}
</script>
<style>
</style>
