/* Elimina los espacios vacíos de los arreglos */
const cleanArray = (actual: any[]): any[] => {
  let newArray: any[] = [];
  for (let i = 0, j = actual.length; i < j; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
};

/* Simplemente envía un console.log */
const log = (
  mensaje: string = "¡Ya llegamos aquí!",
  style: string = `background-color: #fff; color: #101010; font-size: 16px; font-weight: bold; font-family: Lato; padding: 5px 10px; border-radius: 4px`
): void => {
  console.log(`%c${mensaje}`, style);
};

export { cleanArray, log };
