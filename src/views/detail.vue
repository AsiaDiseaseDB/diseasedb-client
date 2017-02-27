<!-- 编辑数据库条目界面 -->
<template>
<div id="detail">
  <h1>Detail Page</h1>
  <div id="detail-page-container">
    <el-row>
      <el-col id="detail-left-part" :span="9">
        <el-tree id="detail-tree" :data="treedata" :props="defaultProps"
          node-key="id" default-expand-all :expand-on-click-node="false"
          :highlight-current="true" :render-content="renderContent"
          @node-click="clickEvent">
        </el-tree>
      </el-col>
      <el-col id="detail-right-part" :span="15">
        <span class="dt-title">Basic Source</span>
        <!-- <el-row>
          <el-input placeholder="text" v-model="inputData"></el-input>
          <el-button @click="addTest">Add</el-button>
        </el-row> -->
        <el-form ref="form" :model="form" label-width="80px" label-position="center">
          <el-form-item label="ReportID">
            <el-input v-model="form.id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="Reporter">
            <el-select v-model="form.reporter" placeholder="Reporter">
              <el-option v-for="item in form.reporterOptions" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Disease">
            <el-select v-model="form.disease" placeholder="Disease">
              <el-option v-for="item in form.diseaseOptions" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Country">
            <el-select v-model="form.country" placeholder="Country">
              <el-option v-for="item in form.countryOptions" v-bind:label="item" v-bind:value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="DocumentCategory">
            <el-select v-model="form.documentCategory" placeholder="DocumentCategory">
              <el-option v-for="item in form.documentCategoryOptions" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Journal">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Title">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Authors">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Year of Pub">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Volume">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Issue">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Page From">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Page To">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="Author contact needed">
            <el-input></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Open access">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="checked">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="note1">
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
//  should get this data from Server
import tmpTreeData from '../store/tmpTreeData.js'
import detailData from '../store/detailData.js'
let id = 1000;

export default {
  data() {
    return {
      inputData: '',
      highLightData: '',
      treedata: tmpTreeData,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        id: 1111,  //  自动生成的随机值，从数据库获取
        reporterOptions: detailData.reporterOptions,
        diseaseOptions: detailData.diseaseOptions,
        countryOptions: detailData.countryOptions,
        documentCategoryOptions: detailData.documentCategoryOptions,
        reporter: '',
        disease: '',
        country: '',
        documentCategory: ''
      }
    }
  },
  methods: {
    append(store, data) {
      store.append({ id: id++, label: 'testtest', children: [] }, data);
    },

    remove(store, data) {
      store.remove(data);
    },

    clickEvent(data, node, tree) {
      this.highLightData = {
        data: data,
        node: node
      }
      console.log(node);
    },

    addTest() {
      if (this.highLightData === '') {
        console.log('No Element Selected');
      } else {
        var newNode = {
          id: id++,
          label: this.inputData,
          children: []
        }
        this.highLightData.node.store.append(newNode, this.highLightData.node.data);
      }
    },

    onSubmit() {
      console.log('submit!');
      console.log(this.form);
    },

    renderContent(h, { node, data, store }) {
      return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ () => this.append(store, data) }>Append</el-button>
              <el-button size="mini" on-click={ () => this.remove(store, data) }>Delete</el-button>
            </span>
          </span>);
    }
  }
}
</script>

<style>
#detail-page-container {
  text-align: left;
  border-style: solid;
  border-radius: 4px;
  border-width: 1px;
}

#detail-left-part {
  height: 500px;
  overflow: scroll;
  border-right-width: 2px;
  border-right-style: solid;
  border-color: #BFCBD9;
}

#detail-right-part {
  height: 500px;
  overflow: scroll;
  padding: 20px;
}

.dt-title {
  font-size: 18pt;
  font-weight: bold;
  margin: 20px;
}

#detail-tree {
  border-width: 0;
}
</style>
