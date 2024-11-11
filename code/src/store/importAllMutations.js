function importAllMutations (r) {
  return r.keys().reduce((mutations, file) => {
    const fileName = file.split('/').pop()
    const mutationName = fileName.replace(/\.mutation\.js$/, '')
    mutations[mutationName] = r(file).default

    return mutations
  }, {})
}

export default importAllMutations(require.context('./', true, /\.mutation\.js$/))
