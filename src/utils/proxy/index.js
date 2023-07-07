import { effect, reactive, RefImpl } from './core.js'
let btn = document.getElementById('btn')
let btn1 = document.getElementById('btn1')
let texts = document.getElementById('text')
let texts1 = document.getElementById('text1')
let texts2 = document.getElementById('text2')

let text = { age: 0, child: { age: 1 } }
const proxyText = reactive(text)
let text1 = { age: 0 }
const proxyText1 = reactive(text1)
let text2 = new RefImpl(true)
console.log(text2.value)

effect(() => {
  texts.innerText = proxyText.age
  console.log(proxyText.age, 'text', text2.value)
})
effect(() => {
  texts1.innerText = proxyText1.age
  texts2.innerText = text2.value
  console.log(proxyText1.age, 'text1', text2.value)
})

const update = () => {
  proxyText.age++
}
btn.addEventListener('click', update)

const update1 = () => {
  // proxyText1.age++
  text2.value = !text2.value
  console.log(text2)
}
btn1.addEventListener('click', update1)
