<!-- 编辑数据库条目界面 -->
<template>
<div id="detail">
  <h1>Detail Page</h1>
  <div id="detail-page-container">
    <el-row>
      <el-col id="detail-left-part" :span="7">
        <el-tree id="detail-tree" :data="treedata" :props="defaultProps"
          node-key="id" default-expand-all :expand-on-click-node="false"
          :highlight-current="true" @node-click="clickEvent" ref="tree">
          <!-- :render-content="renderContent" -->
        </el-tree>
      </el-col>
      <el-col id="detail-right-part" :span="17">
        <!--  向孩子传递参数: tree组件  -->
        <router-view :tree="tree" :idPath="idPath"></router-view>
      </el-col>
      <!--  -->
    </el-row>
  </div>
</div>
</template>

<script>
//  should get this data from Server
//  import tmpTreeData from '../static/tmpTreeData.js'
let id = 1000;

export default {
  data() {
    return {
      inputData: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tree: null,
      treeId: 2,
      idPath: []
    }
  },
  created: function() {
    //  初始化 从服务器拿数据
    var getid = 1234
    this.treedata = [{
      id: 1,
      label: "Report ID " + getid,
      children: [],
      dataID: getid  //  id from database
    }]
  },
  methods: {
    //  test function
    append(store, data) {
      store.append({ id: id++, label: 'testtest', children: [] }, data);
    },

    //  test function
    remove(store, data) {
      store.remove(data);
    },

    //  点击树状视图，进行导航操作
    clickEvent(data, node, tree) {
      //  获取树组件
      this.tree = this.$refs.tree
      var curNode = this.tree.currentNode.node
      this.idPath = []
      while (typeof(curNode.data.dataID) !== "undefined") {
        this.idPath.push(curNode.data.dataID)
        curNode = curNode.parent
      }
      this.idPath.reverse()
      console.log(this.idPath)
      //  TODO: 数据库查询默认数据操作
      switch (node.level) {
        case 1:
          this.$router.push('/detail/basicsource');
          break;
        case 2:
          this.$router.push('/detail/survey');
          break;
        case 3:
          this.$router.push('/detail/location');
          break;
        case 4:
          this.$router.push('/detail/disease');
          break;
        case 5:
          this.$router.push('/detail/intervention');
          break;
        default:
          console.log('err');
      };
    },

    //  test function
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
