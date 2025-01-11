/* Expresiones regulares */
const quitarAcentos = (cadena: string): string => {
  const acentos: { [key: string]: string } = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
  };
  return cadena
    .split("")
    .map((letra) => acentos[letra] || letra)
    .join("")
    .toString();
};

const regexUrl = (url: string): string => {
  const newUrl = quitarAcentos(url.toLowerCase())
    .replace(/[^\w\s]/gi, "")
    .toString()
    .replaceAll(" ", "-");
  return newUrl;
};

// Función para validar el correo electrónico
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export { quitarAcentos, regexUrl, isValidEmail };
