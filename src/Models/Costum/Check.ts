



export function hasKey<ObjTest>(obj: ObjTest, key: PropertyKey): key is keyof ObjTest {
  return key in obj
}







export function hasValue<ObjTest>(O:ObjTest,value:string){
  return value in Object.values(O);
}