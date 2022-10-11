// Funciones para testeo
const { mdLinks } = require('../index');
const { routeEx, isFolder, fileExtensionMD, extractionFilesMD, extractionLinks, dataLinks } = require('../data');

// Data
const pathErronea = './package.jon';
const pathDiferent = './package.json';
const pathRelative = './';
const pathRelative2 = './test';
const pathAbsolute = './README.md';
const pathDePrueba0 = './testcit0.md';
const pathDePrueba1 = './testcito1.md';
const arrayLinks = [
  {
    file: './testcito1.md',
    href: '(https://es.wikipedia.org/wiki/Courage_the_Cowardly_Dog)'
  },
  { file: './testcito1.md', href: '(https://es.wikipedia.org/wiki/El_laboratorio_de_Dexter)' },
  {
    file: './testcito1.md',
    href: '(http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175)'
  }
];
const validateLinks = [
  {
    file: './testcito1.md',
    href: '(https://es.wikipedia.org/wiki/Courage_the_Cowardly_Dog)',
    status: 404,
    ok: 'ok'
  },
  {
    file: './testcito1.md',
    href: '(https://es.wikipedia.org/wiki/El_laboratorio_de_Dexter)',
    status: 404,
    ok: 'ok'
  },
  {
    file: './testcito1.md',
    href: '(http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175)',
    status: 'No existe status',
    ok: 'fail'
  }
];

// testcito begin
// Test para funcion routeEx
describe('La función routeEx verifica si la ruta existe.', () => {
  it('Debería retornar una función.', () => {
    expect(typeof routeEx).toBe('function');
  });
  it('Deberia retornar true si la ruta existe.', () => {
    expect(routeEx(pathAbsolute)).toBe(true);
  });
  it('Deberia retornar false si la ruta no existe.', () => {
    expect(routeEx(pathErronea)).toBe(false);
  });
})

// Test para funcion isFolder
describe('La función isFolder verifica si la ruta es directorio.', () => {
  it('Debería retornar una función.', () => {
    expect(typeof isFolder).toBe('function');
  });
  it('Deberia retornar true si la ruta es directorio.', () => {
    expect(isFolder(pathRelative)).toBe(true);
  });
  it('Deberia retornar false si la ruta no es directorio.', () => {
    expect(isFolder(pathAbsolute)).toBe(false);
  });
})

// Test para funcion fileExtensionMD
describe('La función fileExtensionMD verifica si el archivo tiene la extensión .md', () => {
  it('Debería retornar una función.', () => {
    expect(typeof fileExtensionMD).toBe('function');
  });
  it('Deberia retornar true si el archivo es .md', () => {
    expect(fileExtensionMD(pathAbsolute)).toBe(true);
  });
  it('Deberia retornar false si el archivo es diferente a .md', () => {
    expect(routeEx(pathErronea)).toBe(false);
  });
})

// Test para funcion extractionFilesMD
describe('La función extractionFilesMD extrae los archivos .md de un directorio.', () => {
  it('Debería retornar una función.', () => {
    expect(typeof extractionFilesMD).toBe('function');
  });
  it('Deberia retornar un array si el directorio tiene archivos.md', () => {
    let arrayFiles = extractionFilesMD(pathRelative);
    expect(arrayFiles[0]).toEqual('testcit0.md');
    expect(arrayFiles[1]).toEqual('testcito1.md');
    expect(arrayFiles[2]).toEqual('readme.md');
  });
  it('Debería retornar un array vacio si el directorio no tiene archivos.md', () => {
    expect(extractionFilesMD(pathRelative2)).toEqual([]);
  });
})

// Test para funcion extractionLinks
describe('La función extractionLinks extrae los links de un archivo .md y devuelve un array con las propiedades href y file.', () => {
  it('Debería retornar una función.', () => {
    expect(typeof extractionLinks).toBe('function');
  });
  it('Si existen links deberia retornar un array con href y file.', () => {
    expect(extractionLinks([pathDePrueba1])).toStrictEqual(arrayLinks);
  });
  it('Si no existen links deberia retornar un array vacio."', () => {
    expect(extractionLinks([pathDePrueba0])).toStrictEqual([]);
  });
})

// Test para funcion dataLinks
describe('La función dataLinks valida los links en ok/fail y su status.', () => {
  it('Debería retornar una función.', () => {
    expect(typeof dataLinks).toBe('function');
  });
  test('Deberia retornar un array con la validación de los links.', async () => {
    const data = await dataLinks(arrayLinks);
    expect(data).toStrictEqual(validateLinks);
  });
})

// Test para funcion mdLinks
describe('La funcion mdLinks según la ruta y su 2do parametro devuelve la data/stats de los links.', () => {
  it('Debería retornar una función.', () => {
    expect(typeof mdLinks).toBe('function');
  });
  test('Debería retornar "La ruta ingresada no es válida." si la ruta es inválida.', async () => {
    await expect(mdLinks(pathErronea, undefined)).rejects.toMatch('La ruta ingresada no es válida.');
  });
  test('Debería retornar "La ruta -nameFile- no corresponde a un archivo Markdown." si la ruta no es archivo.md.', async () => {
    await expect(mdLinks(pathDiferent, undefined)).rejects.toMatch('La ruta ./package.json no corresponde a un archivo Markdown.');
  });
  test('Debería retornar el total de los links encontrados en el directorio.', async () => {
    const data = await mdLinks(pathRelative, '--stats');
    expect(data).toStrictEqual('Existen 80 links en total.');
  });
  test('Debería retornar los links con las propiedades href y file.', async () => {
    const data = await mdLinks(pathDePrueba1, undefined);
    expect(data).toStrictEqual(arrayLinks);
  });
  test('Debería retornar los links con todas sus propiedades.', async () => {
    const data = await mdLinks(pathDePrueba1, '--validate');
    expect(data).toStrictEqual(validateLinks);
  });
  test('Debería retornar el total de los links encontrados.', async () => {
    const data = await mdLinks(pathDePrueba1, '--stats');
    expect(data).toStrictEqual('Existen 4 links en total.');
  });
});