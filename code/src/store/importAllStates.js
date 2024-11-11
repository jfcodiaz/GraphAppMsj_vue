function importAllStates(r) {
  return r.keys().reduce((state, file) => {
    const fileName = file.split('/').pop();
    const mutationName = fileName.replace(/\.state\.js$/, '');
    state[mutationName] = r(file).default;

    return state;
  }, {});
}

export default importAllStates(require.context('./', true, /\.state\.js$/));
