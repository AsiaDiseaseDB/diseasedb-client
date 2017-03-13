<template>
<div id="location">
  <span class="dt-title">Location Information</span>
  <el-form ref="form" :model="form" label-width="80px" label-position="center">
    <el-form-item label="Location ID">
      <el-input v-model="form.LocationID" :disabled="true"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="ADM1">
          <el-input v-model="form.ADM1"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="ADM2">
          <el-input v-model="form.ADM2"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="ADM3">
          <el-input v-model="form.ADM3"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="PointName">
          <el-input v-model="form.PointName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="PointType">
          <el-select v-model="form.PointType" placeholder="Point Type">
            <el-option v-for="item in pointTypeOptions" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="GeoRef">
          <el-select v-model="form.GeoReferenceSources" placeholder="Point Type">
            <el-option v-for="item in grSourceOptions" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Latitude">
          <el-input v-model="form.Latitude"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Longitude">
          <el-input v-model="form.Longitude"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="note3">
      <el-input v-model="form.Note3" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onNext">Next</el-button>
      <el-button @click="onSave">Save</el-button>
      <el-button @click="onCancel">Cancel</el-button>
      <el-button @click="onAdd">Add Location</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import detailData from '../static/detailData.js'
import api from '../model/api.js'
import util from '../model/util.js'

export default {
  name: 'app',
  props: ['tree', 'idPath', 'nodeID', 'buff'],
  data() {
    return {
      form: {
        LocationID: -1,
        SurveyDescriptionBasicSourcesReportID: -1,
        SurveyDescriptionSurveyID: -1,
        ADM1: '',
        ADM2: '',
        ADM3: '',
        PointName: '',
        PointType: '',
        Latitude: '',
        Longitude: '',
        GeoReferenceSources: '',
        Note3: ''
      },
      grSourceOptions: detailData.locationDetail.grSourceOptions,
      pointTypeOptions: detailData.locationDetail.pointTypeOptions
    }
  },
  computed: {
    id: {
      get() {
        return this.$store.state.treeID
      },
      set(v) {
        this.$store.commit('updateTreeID', v)
      }
    }
  },
  methods: {
    onNext() {
      api.getId('Disease Data')
        .then((res) => {
          var cur = this.tree.currentNode
          util.appendNode.call(this, cur, res.data.id, 'Disease')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onSave() {
      let that = this
      api.add('Location Information', this.form, that)
    },
    onMenu() {
      this.$router.push('/home')
    },
    onCancel() {
      var curNode = this.tree.currentNode.node
      var parent = curNode.parent
      var len = parent.childNodes.length
      var that = this
      setTimeout(function() {
        that.tree.currentNode.$parent.handleClick()
      }, 0)
      curNode.store.remove(curNode.data)
    },
    onAdd() {
      api.getId('Location Information')
        .then((res) => {
          var parent = this.tree.currentNode.$parent
          util.appendNode.call(this, parent, res.data.id, 'Location')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    initForm() {
      this.form = {
        LocationID: this.idPath[2],
        SurveyDescriptionBasicSourcesReportID: this.idPath[0],
        SurveyDescriptionSurveyID: this.idPath[1],
        ADM1: '',
        ADM2: '',
        ADM3: '',
        PointName: '',
        PointType: '',
        Latitude: '',
        Longitude: '',
        GeoReferenceSources: '',
        Note3: ''
      }
    },
    updateData() {
      if (this.buff.L[this.nodeID] !== undefined) {
        this.form = this.buff.L[this.nodeID]
      } else {
        api.getIdContent(this.nodeID, 'Location Information')
          .then((res) => {
            if (res.data.data == null) {
              this.initForm()
            } else {
              this.form = res.data.data
            }
          })
          .catch((err) => {
            this.initForm()
          })
      }
    }
  },
  created: function() {
    this.updateData()
  },
  beforeDestroy: function() {
    this.$emit('getBuffer', 'L', this.nodeID, this.form)
  },
  watch: {
    nodeID: function(val, oldVal) {
      this.$emit('getBuffer', 'L', oldVal, this.form)
      this.updateData()
    }
  }
}
</script>
