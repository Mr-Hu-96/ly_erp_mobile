const readline = require('readline')
const fs = require('fs')
const path = require('path')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('请输入目录（如 src/api/composite/xxx.ts）：', (directory) => {
  rl.question('请输入接口路径（如 /composite/xxx）：', (url) => {
    rl.close()
    main({ directory, url })
  })
})

function main({ directory, url }) {
  const baseName = path.basename(url)
  const camelName = baseName.replace(/\/(.)/g, (_, c) => c.toUpperCase())
  const capitalizeName = capitalize(camelName) + 'Api'
  const content = `import { http } from '@/utils/http'

/**
 * 查询${camelName}记录列表
 */
export function list${capitalizeName}(data) {
  return http.get<any>('${url}/list', data)
}

/**
 * 新增${camelName}记录
 */
export function add${capitalizeName}(data) {
  return http.post<any>('${url}', data)
}

/**
 * 查询${camelName}记录详细
 */
export function get${capitalizeName}(id) {
  return http.get<any>('${url}/' + id)
}

/**
 * 修改${camelName}记录
 */
export function update${capitalizeName}(data) {
  return http.put<any>('${url}', data)
}

/**
 * 删除${camelName}记录
 */
export function del${capitalizeName}(id) {
  return http.delete<any>('${url}/' + id)
}
`

  const filePath = path.resolve(directory)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf8')
  console.log(`✅ 文件已生成：${filePath}`)
}

function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
