<!-- 编辑数据库条目界面 -->
<template>
<div id="detail">
  <h1>Detail Page</h1>
  <div id="detail-page-container">
    <el-row>
      <el-col id="detail-left-part" :span="7">
        <el-tree id="detail-tree" :data="treedata" :props="defaultProps"
          node-key="id" default-expand-all :expand-on-click-node="false"
          :highlight-current="true" @node-click="clickEvent" ref="tree"
          accordion>
          <!-- :render-content="renderContent" -->
        </el-tree>
      </el-col>
      <el-col id="detail-right-part" :span="17">
        <!--  向孩子传递参数: tree组件  -->
        <router-view :tree="tree" :idPath="idPath" :nodeID="nodeID"></router-view>
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
      treedata: [],
      treeId: 2,
      idPath: [],
      nodeID: -1
    }
  },
  computed: {
    opt: {
      get() {
        return this.$store.state.opt
      },
      set(value) {
        this.$store.commit('updateOpt', value)
      }
    },
    id: {
      get() {
        return this.$store.state.treeID
      },
      set(v) {
        this.$store.commit('updateTreeID', v)
      }
    }
  },
  created: function() {
    //  初始化 从服务器拿数据
    switch (this.opt) {
      case 'new':
        var getid = 1234
        this.treedata = [{
          id: this.id++,
          label: "Report ID " + getid,
          children: [],
          dataID: getid  //  id from database
        }]
        break
      case 'edit':
        break
      default:
        //  do nothing
    }
  },
  mounted: function () {
    //  获取树组件的引用
    this.tree = this.$refs.tree
    if (this.opt === 'new') {
      this.$refs.tree.$children[0].handleClick()
    }
  },
  beforeDestroy: function() {
    this.opt = ''  //  清除痕迹
  },
  methods: {
    //  点击树状视图，进行导航操作
    clickEvent(data, node, tree) {
      var curNode = this.tree.currentNode.node
      this.idPath = []
      while (typeof(curNode.data.dataID) !== "undefined") {
        this.idPath.push(curNode.data.dataID)
        curNode = curNode.parent
      }
      this.idPath.reverse()
      this.nodeID = this.idPath[node.level - 1]
      // console.log(this.idPath)
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
