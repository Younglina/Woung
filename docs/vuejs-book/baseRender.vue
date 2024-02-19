<template>
  <div id="demo"></div>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  function render(vnode, root) {
    if (typeof vnode.tag === 'string') {
      mountElement(vnode, root)
    } else if (typeof vnode.tag === 'object') {
      mountComponent(vnode, root)
    }
  }
  function mountElement(vnode, container) {
    const el = document.createElement(vnode.tag)
    for (const key in vnode.props) {
      if (/^on/.test(key)) {
        el.addEventListener(key.substr(2).toLowerCase(), vnode.props[key])
      }
    }
    if (typeof vnode.children === 'string') {
      const text = document.createTextNode(vnode.children)
      el.appendChild(text)
    } else if (vnode.children) {
      vnode.children.forEach(child => {
        render(child, el)
      });
    }
    container.appendChild(el)
  }
  function mountComponent(vnode, container) {
    const subtree = vnode.tag.render()
    render(subtree, container)
  }

  const obj = {
    tag: 'div',
    props: {
      onClick: () => alert('asdf')
    },
    children: [
      {
        tag: 'div',
        children: '123'
      },
      {
        tag: 'div',
        children: '321'
      }
    ]
  }
  const myComponent = {
    render: () => {
      return {
        tag: 'div',
        props: {
          onClick: () => alert('asdf2')
        },
        children: [
          {
            tag: 'span',
            children: 'span'
          }
        ]
      }
    }
  }
  const obj2 = {
    tag: myComponent
  }
  render(obj, document.querySelector('#demo'))
  render(obj2, document.querySelector('#demo'))
})
</script>