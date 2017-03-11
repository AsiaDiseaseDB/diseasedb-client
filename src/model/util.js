export default {
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
  }
}
