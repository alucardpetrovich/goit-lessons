export function sum(...nums: number[]) {
  return nums.reduce((s, num) => Math.round((s + num) * 10000) / 10000);
}
