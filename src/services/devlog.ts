export function devLog(...args: any[]) {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
}