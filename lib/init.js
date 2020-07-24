const chalk = require('chalk')
// 命令行交互工具
const Prompt = require('inquirer')

const clone = require('./clone')
const edit = require('./edit')

const remote = 'github:palxiao/typescript-node-template#'

const initQuestions = (name) => [
  {
    type: 'confirm',
    name: 'isInit',
    message: `确定要在${chalk.green(name)}文件夹下创建项目?`,
    prefix: '?',
  },
  {
    type: 'list',
    name: 'branchName',
    message: '选择创建模板',
    choices: [
      {
        name: 'Simple (Ts Express mySql apiDoc)',
        value: 'simple',
      },
      {
        name: 'Entire (...& Graphql, jwt)',
        value: 'master',
      },
    ],
  },
  {
    type: 'input',
    name: 'author',
    message: '创建者名称',
    default: 'your name'
  }
]

const init = async (name) => {
  try {
    const { isInit, branchName, author } = await Prompt.prompt(initQuestions(name))
    if (isInit) {
      await clone(remote + branchName, name)
      await edit({name, author})
    } else {
      console.log(chalk.red('程序提前结束'))
    }
  } catch (error) {
    console.log(chalk.red(error))
  }
}

module.exports = init
