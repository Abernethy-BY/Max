const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
// 无法继续遍历的对象
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const numberTag = '[object Number]'
const regexpTag = '[object RegExp]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const funcTag = '[object Function]'

const deepTag = [mapTag, setTag, arrayTag, objectTag]
const baseTag = [boolTag, dateTag, errorTag, numberTag, regexpTag, stringTag, symbolTag]
// 初始化对象
function getInit(target) {
  const Ctor = target.constructor
  return new Ctor()
}

// 获取类型
function getType(target) {
  return Object.prototype.toString.call(target)
}

// 克隆Symbol
function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target))
}
// 克隆正则
function cloneReg(target) {
  const reFlags = /\w*$/
  const result = new target.constructor(target.source, reFlags.exec(target))
  result.lastIndex = target.lastIndex
  return result
}
// 克隆函数
function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  if (func.prototype) {
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (body) {
      if (param) {
        const paramArr = param[0].split(',')
        return new Function(...paramArr, body[0])
      }
      else {
        return new Function(body[0])
      }
    }
    else {
      return null
    }
  }
  else {
    return eval(funcString)
  }
}
// 克隆不可再分Object类型
function cloneOtherType(target, type) {
  const Ctor = target.constructor
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target)
    case regexpTag:
      return cloneReg(target)
    case symbolTag:
      return cloneSymbol(target)
    default:
      return null
  }
}

function forEach(array, iteratee) {
  let index = -1
  const length = array.length
  while (++index < length)
    iteratee(array[index], index)

  return array
}
// 判断是否为object或者是function
function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function' || type === 'symbol')
}

export function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target))
    return target

  let cloneTarget
  const type = getType(target)
  if (deepTag.includes(type))
    cloneTarget = getInit(target)

  // 防止循环引用
  if (map.get(target))
    return map.get(target)

  map.set(target, cloneTarget)
  // 克隆不可继续递归的属性
  if (baseTag.includes(type)) {
    cloneTarget = cloneOtherType(target, type)
    return cloneTarget
  }
  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value, map))
    })
    return cloneTarget
  }
  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map))
    })
    return cloneTarget
  }

  // 克隆函数
  if (type == funcTag)
    return cloneFunction(target)

  const keys = type === arrayTag ? undefined : Object.keys(target)
  forEach(keys || target, (value, key) => {
    if (keys)
      key = value

    cloneTarget[key] = clone(target[key], map)
  })
  return cloneTarget
}

