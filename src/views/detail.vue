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
        <router-view @getBuffer="updateBuff"
          :buff="buff" :tree="tree" :idPath="idPath" :nodeID="nodeID">
        </router-view>
      </el-col>
      <!--  -->
    </el-row>
  </div>
</div>
</template>

<script>
//  should get this data from Server
//  import tmpTreeData from '../static/tmpTreeData.js'
import api from '../model/api.js'

let id = 1000;

export default {
  data() {
    return {
      inputData: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      nodeType: ['ReportID', 'Survey', 'Location', 'Disease', 'Intervention'],
      tree: null,
      treedata: [],
      treeId: 2,
      idPath: [],
      nodeID: -1,
      buff: { 'B': {}, 'S': {}, 'L': {}, 'D': {}, 'I': {} }
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
    updateBuff(type, id, form) {
      this.buff[type][id] = form
    },
    buildNode(node, nodeData, level) {
      var len = 0
      for (let i in nodeData) len++
      if (len === 0) return
      for (let i in nodeData) {
        let newNode = {
          id: this.id++,
          label: this.nodeType[level] + ' ' + i,
          children: [],
          dataID: i
        }
        node.push(newNode)
        this.buildNode(newNode.children, nodeData[i], level + 1)
      }
    },
    initTreeData(rawData) {
      this.buildNode(this.treedata, rawData, 0)
      console.log(this.treedata)
    }
  },
  created: function() {
    //  初始化 从服务器拿数据
  },
  mounted: function () {
    //  获取树组件的引用
    this.tree = this.$refs.tree
    switch (this.opt) {
      case 'new':
        api.getId('Basic Sources')
          .then((res) => {
            var getid = res.data.id
            this.treedata = [{
              id: this.id++,
              label: "Report ID " + getid,
              children: [],
              dataID: getid  //  id from database
            }]
            setTimeout(() => {
              this.$refs.tree.$children[0].handleClick()
            }, 0)
          })
          .catch((err) => {
            console.log(err)
          })
        break
      case 'edit':
        //  从服务器读取数据
        api.getIdTree(this.$store.state.editOpt.editID)
          .then((res) => {
            if (res.data.err === null) {
              console.log(res.data.data);
              this.initTreeData(res.data.data)
            } else {
              console.log('>> /getidtree Error')
              console.log(res.data.err)
            }
            setTimeout(() => {
              this.$refs.tree.$children[0].handleClick()
            }, 0)
          }).catch((err) => {
            console.log('>> /getidtree catch Error')
            console.log(err)
          })
        break
      default:
        //  do nothing
    }
  },
  beforeDestroy: function() {
    this.opt = ''  //  清除痕迹
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
