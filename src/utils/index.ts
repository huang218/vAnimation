export * from './router'
export * from './model'
export * from './formatTime'
export * from './storage'
export * from './theme'
// export * from "./i18n";
export * from './global'

// then0
// Promise.resolve().then(() => {
//   console.log('promise1')
//   setTimeout(() => {
//     console.log('timeout1')
//   }, 0)
// })
// new Promise<void>((resolve) => {
//   resolve()
// })
//   // then1
//   .then(function () {
//     new Promise<void>((resolve) => {
//       resolve()
//     })
//       .then(function () {
//         console.log('promise2')
//       })
//       .then(function () {
//         console.log('promise3')
//       })
//     console.log('then1')
//   })
//   // then2
//   .then(function () {
//     new Promise<void>((resolve) => {
//       resolve()
//     })
//       .then(function () {
//         console.log('promise4')
//       })
//       .then(function () {
//         console.log('promise5')
//       })
//     console.log('then2')
//   })
//   // then3
//   .then(function () {
//     new Promise<void>((resolve) => {
//       resolve()
//     })
//       .then(function () {
//         console.log('promise6')
//       })
//       .then(function () {
//         console.log('promise7')
//       })
//     console.log('then3')
//   })
// setTimeout(() => {
//   console.log('timeout2')
//   Promise.resolve().then(() => {
//     console.log('promise8')
//   })
// }, 0)
