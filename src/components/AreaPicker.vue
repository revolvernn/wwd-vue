<template>
  <div>
    <van-field
      readonly
      clickable
      :label="label"
      :value="areaPickerRef.valueName"
      autosize
      type="textarea"
      :placeholder="placeholder"
      @click="isShow(true)"
    />
    <van-popup v-model="areaPickerRef.show" position="bottom">
      <van-picker
        ref="areaPickerRef"
        title="省/市/区"
        show-toolbar
        :columns="areaPickerRef.columns"
        value-key="label"
        v-on:cancel="onCancel"
        v-on:confirm="onConfirm"
        v-on:change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import utils from '../utils/utils'
export default {
  name: 'AreaPicker',
  props: {
    defaultValue: {
      type: Object
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
      areaPickerRef: {
        defaultIndex: null,
        valueName: null,
        show: false,
        placeholder: {id: '', label: '请选择'},
        columns: [
          {
            defaultIndex: 0,
            values: [],
            className: 'column1'
          },
          {
            defaultIndex: 0,
            values: [],
            className: 'column2'
          },
          {
            defaultIndex: 0,
            values: [],
            className: 'column3'
          }
        ]
      }
    }
  },
  created () {
    this.init()
  },
  watch: {
  },
  methods: {
    init () {
      let self = this
      self.$http.getArea().then(function (res) {
        let data = utils.vueTree(res)
        self.areaPickerRef.columns[0].values = self.areaPickerRef.columns[0].values.concat(self.areaPickerRef.placeholder, data)
        self.areaPickerRef.columns[1].values = [self.areaPickerRef.placeholder]
        self.areaPickerRef.columns[2].values = [self.areaPickerRef.placeholder]
        self.setDefaultValue()
      })
    },
    setDefaultValue () {
      let self = this
      let valueName = []
      if (self.defaultValue) {
        if (self.defaultValue.key1) {
          let _pdata = self.areaPickerRef.columns[0].values
          let _pindex = self.getColumnsIndex(self.defaultValue.key1, _pdata)
          self.areaPickerRef.columns[0].defaultIndex = _pindex
          valueName.push(_pdata[_pindex].label)
          if (self.defaultValue.key2) {
            let _cdata = self.areaPickerRef.columns[1].values.concat(_pdata[_pindex].children)
            let _cindex = self.getColumnsIndex(self.defaultValue.key2, _cdata)
            self.areaPickerRef.columns[1].values = _cdata
            self.areaPickerRef.columns[1].defaultIndex = _cdata
            valueName.push(_cdata[_cindex].label)
            if (self.defaultValue.key3) {
              let _ddata = self.areaPickerRef.columns[2].values.concat(_cdata[_cindex].children)
              let _dindex = self.getColumnsIndex(self.defaultValue.key3, _ddata)
              self.areaPickerRef.columns[2].values = _ddata
              self.areaPickerRef.columns[2].defaultIndex = _dindex
              valueName.push(_ddata[_dindex].label)
            }
          }
        }
        self.areaPickerRef.valueName = valueName.length > 0 ? valueName.join('-') : null
      }
    },
    getColumnsIndex (id, data) {
      let index = 0
      data.forEach(function (v, i) {
        if (v.value === id) {
          index = i
          return false
        }
      })
      return index
    },
    onCancel () {
      this.isShow(false)
    },
    onConfirm (val, index) {
      let self = this
      self.isShow(false)
      let obj = self.getVal(val)
      self.areaPickerRef.valueName = obj.name
      self.$emit('onConfirm', obj, index)
    },
    isShow (flag) {
      this.areaPickerRef.show = flag
    },
    getVal (val) {
      let obj = {}
      let value = []
      let _val = {province_id: null, city_id: null, district_id: null}
      val.forEach(function (v) {
        if (v && v.id !== '') {
          value.push(v.label)
        }
      })

      if (val[0]) {
        _val.province_id = val[0].value
        _val.province_name = val[0].label
      }
      if (val[1]) {
        _val.city_id = val[1].value
        _val.city_name = val[1].label
      }
      if (val[2]) {
        _val.district_id = val[2].value
        _val.district_name = val[2].label
      }
      obj.name = value.length > 0 ? value.join('-') : null
      obj.value = _val
      return obj
    },
    onChange (picker, val, index) {
      let self = this
      let columns = [self.areaPickerRef.placeholder]
      if (index === 0) {
        picker.setColumnValues(2, columns)
        if (val[index].children) {
          columns = columns.concat(val[index].children)
        }
        picker.setColumnValues(1, columns)
      } else if (index === 1) {
        if (val[index].children) {
          columns = columns.concat(val[index].children)
        }
        picker.setColumnValues(2, columns)
      }
      self.$emit('onChange', picker, val, index)
    }
  }
}
</script>

<style scoped>

</style>
