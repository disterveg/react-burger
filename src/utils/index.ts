export function isObjectEmpty(obj: object): boolean {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}