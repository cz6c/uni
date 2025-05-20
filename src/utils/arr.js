/**
 * @description: 计算两个数组组合后的循环周期
 * @param {number} L1 第一个数组的长度
 * @param {number} k1 每次从第一个数组取的元素数
 * @param {number} L2 第二个数组的长度
 * @param {number} k2 每次从第二个数组取的元素数
 * @returns {number} 组合后的总周期次数
 */
export function calculateTotalCycle(L1, k1, L2, k2) {
  // 计算最大公约数 (GCD)
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))

  // 计算最小公倍数 (LCM)
  const lcm = (a, b) => (a * b) / gcd(a, b)

  // 计算单个数组的周期次数
  const T1 = L1 / gcd(L1, k1)
  const T2 = L2 / gcd(L2, k2)

  // 有一方无数据时
  if (L1 === 0 || L2 === 0) {
    if (L1 === 0) return T2
    if (L2 === 0) return T1
  }

  // 返回总周期
  return lcm(T1, T2)
}

/**
 * @description: 生成两个数组一个循环周期组合后的结果
 * @param {*} arr1 第一个数组
 * @param {*} k1 每次从第一个数组取的元素数
 * @param {*} arr2 第二个数组
 * @param {*} k2 每次从第二个数组取的元素数
 * @return {*} （二维数组）
 */
export function generateCombinations(arr1, k1, arr2, k2) {
  const L1 = arr1.length
  const L2 = arr2.length

  const totalCycle = calculateTotalCycle(L1, k1, L2, k2)

  const combinations = []
  for (let i = 0; i < totalCycle; i++) {
    // 计算当前索引对应的元素组合
    const part1 = getElements(arr1, L1, k1, i)
    const part2 = getElements(arr2, L2, k2, i)
    combinations.push([...part1, ...part2])
  }
  return combinations
}

/**
 * @description:辅助函数：循环获取数组元素
 * @param {*} arr 数组
 * @param {*} L 数组的长度
 * @param {*} k 从数组取的元素数
 * @param {*} cycleIndex 当前循环数
 * @return {*}
 */
function getElements(arr, L, k, cycleIndex) {
  const start = (cycleIndex * k) % arr.length
  const elements = []
  for (let i = 0; i < k; i++) {
    // 如果取的数量大于数组长度，补空元素
    if (L < k && i >= L) {
      elements.push(null)
    } else {
      elements.push(arr[(start + i) % arr.length])
    }
  }
  return elements
}
