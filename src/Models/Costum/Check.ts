export function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj
}


export function hasValue<O>(O:O,value:string){
  return value in Object.values(O);
}