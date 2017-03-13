export default {
  //  扩展对树形控件的操作
  appendNode: function(parent, nextId, typeString) {
    var parentNode = parent.node
    var nodeToAppend = {
      id: this.id++,
      label: typeString + ' ' + nextId,
      children: [],
      dataID: nextId
    }
    if (parentNode === undefined) {  //  parentNode is the root of the tree
      this.tree.root.store.append(nodeToAppend)
      var key = this.tree.root.childNodes.length - 1
    } else {                         //  parentNode is a leaf
      parentNode.store.append(nodeToAppend, parentNode.data)
      var key = parentNode.childNodes.length
    }
    //  click the created node
    setTimeout(() => { parent.$children[key].handleClick() }, 0)
  },
  deleteNode: function(cur) {
    var curNode = cur.node
    var parent = curNode.parent
    var len = parent.childNodes.length
    if (cur.$parent.handleClick !== undefined) {
      setTimeout(function() {
        cur.$parent.handleClick()
      }, 0)
    }
    curNode.store.remove(curNode.data)
  }
}
