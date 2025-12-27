export function cx(...classes: Array<string | undefined | null | false | 0 | Record<string, boolean>>): string {
  const result: string[] = [];
  for (const cls of classes) {
    if (!cls) continue;
    if (typeof cls === "string") {
      if (cls.trim()) result.push(cls);
      continue;
    }
    if (typeof cls === "object") {
      for (const key in cls) {
        if (Object.prototype.hasOwnProperty.call(cls, key) && cls[key]) result.push(key);
      }
    }
  }
  return result.join(" ");
}





