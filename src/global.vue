<script>
let configGlobal = {
  WS_URL: '',
  BASE_URL: ''
  // ...
}
switch (import.meta.env.VITE_NODE_ENV) {
  case 'dev':
    console.warn('DEV 环境标识')
    configGlobal = {
      WS_URL: 'localhost:8081',
      BASE_URL: ''
    }
    break
  case 'prod':
    console.warn('PROD 环境标识')
    configGlobal = {
      WS_URL: 'localhost:8082',
      BASE_URL: ''
    }
    break
  case 'test':
    console.warn('TEST 环境标识')
    configGlobal = {
      WS_URL: 'localhost:8083',
      BASE_URL: ''
    }
    break
  default:
    break
}
export default configGlobal
</script>
