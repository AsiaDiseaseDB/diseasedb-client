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
        <el-row>
          <span class="dt-title">Basic Source</span>
          <span>Report ID 1</span>
        </el-row>
        <el-row>
          <el-input placeholder="text" v-model="inputData"></el-input>
          <el-button @click="addTest">Add</el-button>
        </el-row>
        <el-row>
        </el-row>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
//  should get this data from Server
import tmpTreeData from '../store/tmpTreeData.js'
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
  height: 400px;
  overflow: scroll;
  border-right-width: 2px;
  border-right-style: solid;
  border-color: #BFCBD9;
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
