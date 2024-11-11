function importAllGetters(r) {
  return r.keys().reduce((getters, file) => {
    const fileName = file.split('/').pop();
    const actionName = fileName.replace(/\.getter\.js$/, '');
    getters[actionName] = r(file).default;

    return getters;
  }, {});
}

export default importAllGetters(require.context('./', true, /\.getter\.js$/));
