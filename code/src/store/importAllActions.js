function importAllActions(r) {
  return r.keys().reduce((actions, file) => {
    const actionName = file.replace(/^\.\/(.*)\.\w+$/, '$1');
    actions[actionName] = r(file).default;
    return actions;
  }, {});
}

export default importAllActions(require.context('./actions', true, /\.action\.js$/));
