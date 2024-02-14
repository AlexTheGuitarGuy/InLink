import { EnumObject } from '@/types'

export function updateObjInArr<TArray, TNewData>(
  arr: TArray[],
  idLabel: keyof TArray,
  replaceId: number | string,
  newData: TNewData,
) {
  return arr.map((element) => {
    if (element[idLabel] === replaceId) return { ...element, ...newData }
    return element
  })
}

export function getEnumValues(enumObject: EnumObject): string[] {
  return Object.keys(enumObject).map((enumValue: keyof EnumObject) => enumObject[enumValue])
}
