# 分支主要目的：测试bug
  测试退出登陆跳转login页面报错bug

  runtime-dom.esm-bundler.js:10 Uncaught (in promise) DOMException: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.

# 问题所在：
  vue自带组件Teleport的用法问题，to参数配置在了#app节点下，该节点在退出登陆后会被销毁从而引发错误

# 纠正：
  to参数改为放在body下即可