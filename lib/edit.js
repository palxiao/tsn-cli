const fs = require('fs')

const edit = async (params = {}) => {
  const path = `${params.name}/package.json`
  try {
    fs.readFile(path, function (err, data) {
      if (err) {
        console.log(err)
        return false
      }
      const packJson = JSON.parse(data.toString())
      packJson.name = params.name

      fs.writeFile(path, JSON.stringify(packJson, '', '\t'), (err) => {
        if (err) throw err
      })
    })
  } catch (e) {}
}

module.exports = edit
