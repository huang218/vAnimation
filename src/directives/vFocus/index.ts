export default {
  updated(el, binding, vnode, prevVnode) {
    el.classList.add('active')
    el.classList.add('transition')
    el.classList.add('duration-100')
  }
}
