import { effect, reactive, ref } from './core.js'
let btn = document.getElementById('btn')
let btn1 = document.getElementById('btn1')
let btn2 = document.getElementById('btn2')
let texts = document.getElementById('text')
let texts1 = document.getElementById('text1')
let texts2 = document.getElementById('text2')

let text = { age: 0, child: { age: 1 } }
const proxyText = reactive(text)
let text1 = { age: 0 }
const proxyText1 = reactive(text1)
let text2 = ref(true)
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
  proxyText1.age++
}
btn1.addEventListener('click', update1)

const update2 = () => {
  text2.value = !text2.value
}
btn2.addEventListener('click', update2)
