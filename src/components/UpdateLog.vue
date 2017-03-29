<template>
<div id="update-log">
  <div id="update-log-version-hint">Current Version: {{ this.$store.state.config.version }}</div>
  <div>
    <el-table :data="tableData" style="width: 100%" align="center" :show-header="showHead">
      <el-table-column prop="date" label="更新日期" width="180"></el-table-column>
      <el-table-column prop="content" label="更新内容"></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2017-03-29',
        content: '添加了更新日志；修复了manage页面访问控制的问题'
      }, {
        date: '2017-03-28',
        content: '主页的查询结果现在可以排序了'
      }, {
        date: '2017-03-27',
        content: '优化UI和UX，根据用户的权限不同，双击查询结果分别会进入编辑／查看界面'
      }, {
        date: '2017-03-27',
        content: '在导出按钮弹出的对话框中添加了get demo按钮，提供批量输入表格的样例下载'
      }, {
        date: '2017-03-25',
        content: '修复了服务端处理空值数据时的一些问题'
      }, {
        date: '2017-03-24',
        content: '更换了登录页面，优化外观'
      }, {
        date: '2017-03-20',
        content: '修复了录入表格页面中格式检查函数的一些bug'
      }, {
        date: '2017-03-18',
        content: '提供了另一种批量导入功能'
      }, {
        date: '2017-03-17',
        content: '提供了第一种批量导入功能'
      }, {
        date: '2017-03-16',
        content: '完成批量导出功能'
      }, {
        date: '..........',
        content: '..............'
      }],
      showHead: false
    }
  },
  methods: {}
}
</script>

<style>
#update-log {
  padding-top: 20px;
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

#update-log-version-hint {
  text-align: left;
  font-family: 'Helvetica Neue';
  color: #99A9BF;
  margin-bottom: 10px;
  margin-left: 15px;
}
</style>
