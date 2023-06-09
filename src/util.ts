export function transformObject(object: any): any {
  // Base case: if object is a number, return object + 1
  if (typeof object === "number") {
    return object + 1;
  }

  // If object is a string, return object + ' AE'
  if (typeof object === "string") {
    return object + " AE";
  }

  // If object is an array, map over it and transform each element
  if (Array.isArray(object)) {
    return object.map((element) => transformObject(element));
  }

  // If object is an object, transform each property
  if (typeof object === "object") {
    let transformedObject: Record<string, any> = {};
    for (let key in object) {
      transformedObject[key] = transformObject(object[key]);
    }
    return transformedObject;
  }

  console.log(object);

  // If object is none of the above, return it as is
  return object;
}
