function importAllActions (r) {
  return r.keys().reduce((actions, file) => {
    const fileName = file.split('/').pop()
    const actionName = fileName.replace(/\.action\.js$/, '')
    actions[actionName] = r(file).default

    return actions
  }, {})
}

export default importAllActions(require.context('./', true, /\.action\.js$/))
