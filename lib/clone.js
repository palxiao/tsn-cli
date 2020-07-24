/**
 *
 * @param {string} repo 仓库地址
 * @param {string}  dir 文件夹
 * @param {object}  opotions 配置项
 */
const { promisify } = require('util')
const ora = require('ora')
const chalk = require('chalk')
const download = promisify(require('download-git-repo'))

const clone = async function (repo, dir, opotions = {}) {
  const process = ora(`开始下载 ${chalk.blue(repo)}`)
  process.start()
  process.color = 'yellow'
  process.text = `正在下载..... ${chalk.yellow(repo)} `

  try {
    await download(repo, dir, opotions)
    process.color = 'green'
    process.text = `项目创建成功！请进入目录查看\n 执行  cd ${dir} \n 执行  yarn`
    process.succeed()
  } catch (error) {
    process.color = 'red'
    process.text = '下载失败，请重试'
    process.fail()
  }
}

module.exports = clone
