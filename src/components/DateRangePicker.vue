<template>
  <div>
    <van-field
      readonly
      clickable
      :label="label"
      :value="valueName"
      :placeholder="placeholder"
      @click="isShow(true)"
    />
    <van-popup v-model="show" closeable position="bottom">
      <van-cell-group title="年-月-日">
        <van-cell>
          <template slot="title">
            <van-datetime-picker
              v-model="startDate"
              type="date"
              :min-date="minDate"
              :show-toolbar="false"
              :visible-item-count="3"
              @change="onStartChange"
            />
          </template>
          <van-datetime-picker
            v-model="endDate"
            :min-date="minDate"
            type="date"
            :show-toolbar="false"
            :visible-item-count="3"
            @change="onEndChange"
          />
        </van-cell>
      </van-cell-group>
      <van-button size="small" v-on:click="onConfirm" type="primary">确定</van-button>
    </van-popup>
  </div>
</template>

<script>
import utils from '../utils/utils'
const currentYear = new Date().getFullYear()
export default {
  name: 'DateRangePicker',
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
      minDate: new Date(currentYear - 100, 0, 1),
      show: false,
      valueName: null,
      startDate: new Date(),
      endDate: new Date()
    }
  },
  created () {
  },
  watch: {
  },
  methods: {
    isShow (flag) {
      this.show = flag
    },
    onStartChange (picker, val, index) {
    },
    onEndChange (picker, val, index) {
    },
    onConfirm () {
      let self = this
      let startDate = utils.formatDate(self.startDate)
      let endDate = utils.formatDate(self.endDate)
      self.valueName = startDate + ' ' + endDate
      self.isShow(false)
      self.$emit('onConfirm', utils.formatDate(startDate), utils.formatDate(endDate))
    }
  }
}
</script>

<style scoped>
.van-popup .van-button{
  bottom: 10px;
}
</style>
