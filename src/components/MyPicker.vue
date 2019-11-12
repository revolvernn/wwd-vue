<template>
  <div>
    <van-field
      readonly
      clickable
      :label="label"
      :value="dictPickerRef.value"
      :placeholder="placeholder"
      @click="dictPickerRef.showPicker = true"
    />
    <van-popup ref="dictPickerRef" v-model="dictPickerRef.showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="dictPickerRef.columns"
        :default-index="dictPickerRef.defaultIndex"
        v-on:cancel="onCancel"
        v-on:confirm="onConfirm"
        v-on:change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'MyPicker',
  props: {
    defaultValue: {
      type: String,
      default () {
        return null
      }
    },
    dictType: {
      type: String,
      default () {
        return null
      }
    },
    values: {
      type: Array
    },
    label: {
      type: String,
      default () {
        return '字段'
      }
    },
    placeholder: {
      type: String,
      default () {
        return '请选择'
      }
    }
  },
  data () {
    return {
      dictPickerRef: {
        defaultIndex: null,
        value: null,
        showPicker: false,
        columns: []
      }
    }
  },
  created () {
    if (this.values) {
      this.dictPickerRef.columns = this.values
    }
    if (this.defaultValue && this.dictPickerRef.columns) {
      this.dictPickerRef.value = this.dictPickerRef.columns.indexOf(this.defaultValue)
    }
  },
  watch: {
  },
  methods: {
    onCancel (val) {
      this.dictPickerRef.showPicker = false
    },
    onConfirm (val, index) {
      this.dictPickerRef.value = val
      this.dictPickerRef.showPicker = false
      this.$emit('onConfirm', val, index)
    },
    onChange (e, val, index) {
      this.dictPickerRef.value = val
      this.$emit('onChange', e, val, index)
    }
  }
}
</script>

<style scoped>

</style>
