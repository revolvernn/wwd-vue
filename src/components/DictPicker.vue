<template>
  <div>
    <van-field
      readonly
      clickable
      :label="label"
      :value="dictPickerRef.valueName"
      :placeholder="placeholder"
      @click="isShow(true)"
    />
    <van-popup  v-model="dictPickerRef.show" position="bottom">
      <van-picker
        ref="dictPickerRef"
        show-toolbar
        :columns="dictPickerRef.columns"
        :default-index="dictPickerRef.defaultIndex"
        value-key="label"
        v-on:cancel="onCancel"
        v-on:confirm="onConfirm"
        v-on:change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'DictPicker',
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
        valueName: null,
        show: false,
        columns: []
      }
    }
  },
  created () {
    let self = this
    if (this.dictType) {
      self.$http.getDictsByType(self.dictType).then(function (dictItems) {
        self.dictConvertToPicker(dictItems)
      })
    } else if (self.values) {
      self.dictPickerRef.columns = self.values
    }
  },
  watch: {
  },
  methods: {
    isShow (flag) {
      this.dictPickerRef.show = flag
    },
    // 字典数据转为列选择数据结构
    dictConvertToPicker (dictArray) {
      let self = this
      let r = [{ label: '请选择', value: '' }]
      for (let i = 0; i < dictArray.length; i++) {
        r.push({
          label: dictArray[i].name,
          value: dictArray[i].value
        })
        if (self.defaultValue && self.defaultValue === dictArray[i].value) {
          self.dictPickerRef.valueName = dictArray[i].name
        }
      }
      this.dictPickerRef.columns = r
    },
    onCancel () {
      this.isShow(false)
    },
    onConfirm (val, index) {
      this.dictPickerRef.valueName = val.value === '' ? null : val.label
      this.isShow(false)
      this.$emit('onConfirm', val, index)
    },
    onChange (e, val, index) {
      this.dictPickerRef.valueName = val.value === '' ? null : val.label
      this.$emit('onChange', e, val, index)
    }
  }
}
</script>

<style scoped>

</style>
