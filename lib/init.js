const chalk = require('chalk')
// 命令行交互工具
const Prompt = require('inquirer')

const clone = require('./clone')
const edit = require('./edit')

const remote = [
  'github:palxiao/ts-vue2-template#',
  'github:palxiao/typescript-node-template#',
]

const selectQuestion = () => [
  {
    type: 'list',
    name: 'chooseType',
    message: '请选择创建类型 choose type',
    choices: [
      {
        name: '客户端 client',
        value: 0,
      },
      {
        name: '服务端 service',
        value: 1,
      },
    ],
  },
]

const frontEndQuestions = (name) => [
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
        name: 'Simple (Ts Vue2.x router vuex immutable)',
        value: 'master',
      },
    ],
  },
]

const backEndQuestions = (name) => [
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
]

const commonQuestion = () => [
  {
    type: 'input',
    name: 'author',
    message: '创建者名称',
    default: 'your name',
  },
]

const init = async (name) => {
  try {
    const { chooseType } = await Prompt.prompt(selectQuestion())
    const { isInit, branchName } = await Prompt.prompt(
      chooseType === 0 ? frontEndQuestions(name) : backEndQuestions(name)
    )
    const { author } = await Prompt.prompt(commonQuestion())
    if (isInit) {
      await clone(remote[chooseType] + branchName, name)
      await edit({ name, author })
    } else {
      console.log(chalk.red('程序提前结束'))
    }
  } catch (error) {
    console.log(chalk.red(error))
  }
}

module.exports = init
