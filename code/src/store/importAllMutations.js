function importAllMutations(r) {
  return r.keys().reduce((mutations, file) => {
    const fileName = file.split('/').pop(); // Extrae el nombre del archivo sin la ruta
    const mutationName = fileName.replace(/\.mutation\.js$/, ''); // Elimina ".mutation.js" del nombre del archivo
    mutations[mutationName] = r(file).default; // Asigna la mutación al objeto
    return mutations;
  }, {});
}

export default importAllMutations(require.context('./', true, /\.mutation\.js$/));
