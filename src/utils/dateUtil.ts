/*
 * @Author: By
 * @Version: 2.0
 * @Date: 2022-03-10 16:24:39
 * @LastEditors: By
 * @LastEditTime: 2022-08-23 18:36:59
 * @Description: 时间处理通用类
 * @FilePath: \big-screen-vue3\src\utils\DateUtil.ts
 */
// 日期格式化规范

const types = {
  yyyy_MM_dd_HH_mm_ss: 'yyyy-MM-dd HH:mm:ss',
  yyyy_MM_dd_HH_mm: 'yyyy-MM-dd HH:mm',
  yyyy_MM_dd: 'yyyy-MM-dd',
  yyyy_MM_dd_1: 'yyyy/MM/dd',
  yyyyMMdd: 'yyyyMMdd',
  HH_mm_ss: 'HH:mm:ss',
}

/**
     * 判断日期是否为空
     * @param data
     * @returns {boolean}
     */
export const isNull = (data) => {
  if (data === null || data === undefined || data === '')
    return true

  else
    return false
}

/**
     * 判断是否为日期
     * @param date 不支持yyyyMMdd格式
     * @returns {boolean}
     */
export const isDate = (date: any) => {
  if (isNaN(date) && !isNaN(Date.parse(date)))
    return true

  else
    return false
}

/**
     * Date日期格式化
     * @param date
     * @param pattern 可为空，默认yyyy-MM-dd HH:mm:ss
     * @returns {string}
     */
export const format = (date, pattern?) => {
  const yy = date.getFullYear() // 年
  const mm = date.getMonth() + 1 // 月
  const dd = date.getDate() // 日
  const hh = date.getHours() // 时
  const ii = date.getMinutes() // 分
  const ss = date.getSeconds() // 秒

  let clock = `${yy}-`
  if (mm < 10)
    clock += '0'
  clock += `${mm}-`
  if (dd < 10)
    clock += '0'
  clock += `${dd} `
  if (hh < 10)
    clock += '0'
  clock += `${hh}:`
  if (ii < 10)
    clock += '0'
  clock += `${ii}:`
  if (ss < 10)
    clock += '0'
  clock += ss
  if (isNull(pattern) || pattern === types.yyyy_MM_dd_HH_mm_ss)
    return clock

  else if (pattern === types.yyyy_MM_dd)
    return clock.substring(0, 10)

  else if (pattern === types.HH_mm_ss)
    return clock.substring(11)

  else if (pattern === types.yyyy_MM_dd_1)
    return clock.substring(0, 10).replace(/-/g, '/')

  else if (pattern === types.yyyyMMdd)
    return clock.substring(0, 10).replace(/-/g, '')

  else if (pattern === types.yyyy_MM_dd_HH_mm)
    return clock.substring(0, 16)

  else
    return clock
}

/**
     * 获取当前日期
     * @returns {Date}
     */
export const getNowDate = () => {
  return new Date()
}

/**
     * @description: 获取当前时间
     * @param {*}
     * @return {*} 格式化后的当前时间
     */
export const getNowTime = () => {
  return format(new Date()).substring(10)
}

/**
     * @description: 获取当前月份
     * @return {*}
     */
export const getNowMonth = () => {
  return new Date().getMonth() + 1
}

/**
     * @description: 获取当前日期数
     * @return {*}
     */
export const getNowDay = () => {
  return new Date().getDate()
}

/**
     * @description: 获取当前星期
     * @return {*}
     */
export const getNowWeek = () => {
  return new Date().getDay()
}
/**
     * 获取几天前日期(1代表明天，-1 代表前一天，-2前两天...)
     * @param date 指定日期
     * @param num
     * @param separator 连接符 如果为-,则结果为:yyyy-MM-dd
     */
export const getDay = (date, num, separator) => {
  const today = new Date(date)
  const nowTime = today.getTime()
  const ms = 24 * 3600 * 1000 * num
  today.setTime(Number(nowTime + ms))
  const oYear = today.getFullYear()
  let oMoth = (today.getMonth() + 1).toString()
  if (oMoth.length <= 1)
    oMoth = `0${oMoth}`
  let oDay = today.getDate().toString()
  if (oDay.length <= 1)
    oDay = `0${oDay}`
  return oYear + separator + oMoth + separator + oDay
}

/**
     * @description: 获取前几月日期(1代表下月，-1 代表上月，-2上两月...)
     * @param {*} date 指定日期
     * @param {*} num 月跨度
     * @param {*} separator 连接符
     * @return {*} 处理后数据
     */
export const getMonth = (date, num, separator) => {
  // debugger
  const today = new Date(date)
  today.setMonth(today.getMonth() + num)
  const oYear = today.getFullYear()
  let oMoth = (today.getMonth() + 1).toString()
  if (oMoth.length <= 1)
    oMoth = `0${oMoth}`
  const oDay = today.getDate().toString()
  return oYear + separator + oMoth + separator + oDay
}

/**
     * @description: 获取几年前日期
     * @param {*} date 指定日期
     * @param {*} num 年跨度
     * @param {*} separator 连接符
     * @return {*} 处理后数据
     */
export const getYear = (date, num, separator) => {
  const today = new Date(date)
  today.setFullYear(today.getFullYear() + num)
  const oMonth = today.getMonth() + 1
  const oYear = (today.getFullYear()).toString()
  const oDay = today.getDate().toString()
  return oYear + separator + oMonth + separator + oDay
}

/**
     * @description: 获取当月第一天日期
     * @return {String}
     */
export const getOneDayOfMonth = (date, pattern = 'yyyy-MM-dd') => {
  const currentTimeArr = format(date, pattern).split('')
  if (pattern === 'yyyyMMdd') {
    currentTimeArr[6] = '0'
    currentTimeArr[7] = '1'
  }
  else {
    currentTimeArr[8] = '0'
    currentTimeArr[9] = '1'
  }
  return currentTimeArr.join('')
}

/**
     * @description: 获取月中最后一天
     * @param {*} date 日期对象
     * @param {*} pattern 返回格式
     * @return {string}
     */
export const getLastDayOfMonth = (date, pattern = 'yyyy-MM-dd') => {
  const dateStr = date
  const dateObj = new Date(dateStr)
  const nextMonth = dateObj.getMonth() + 1
  dateObj.setMonth(nextMonth)
  dateObj.setDate(1) // 1-31

  const nextMonthFirstDayTime = dateObj.getTime() // 下个月一号对应毫秒

  const theMonthLastDayTime = nextMonthFirstDayTime - 24 * 60 * 60 * 1000 // 下个月一号减去一天，正好是这个月最后一天

  const theMonthDay = (new Date(theMonthLastDayTime)).getDate()
  const currentTimeArr = format(date, pattern).split('')
  const theMonthDayArr = theMonthDay.toString().split('')
  if (pattern === 'yyyyMMdd') {
    currentTimeArr[6] = theMonthDayArr[0]
    currentTimeArr[7] = theMonthDayArr[1] ? theMonthDayArr[1] : '0'
  }
  else {
    currentTimeArr[8] = theMonthDayArr[0]
    currentTimeArr[9] = theMonthDayArr[1] ? theMonthDayArr[1] : '0'
  }

  return currentTimeArr.join('')
}

/**
     * @description: 获取目标年份第一月第一天
     * @param {*} date 日期对象
     * @param {*} pattern 日期格式
     * @return {string}
     */
export const getOneDayOfYear = (date, pattern = 'yyyy-MM-dd') => {
  const currentTimeArr = format(date, pattern).split('')
  if (pattern === 'yyyy-MM-dd') {
    currentTimeArr[5] = '0'
    currentTimeArr[6] = '1'
    currentTimeArr[8] = '0'
    currentTimeArr[9] = '1'
  }
  else {
    currentTimeArr[4] = '0'
    currentTimeArr[5] = '1'
    currentTimeArr[6] = '0'
    currentTimeArr[7] = '1'
  }
  return currentTimeArr.join('')
}

/**
     * @description: 获取毫秒数
     * @param {*} date 时间对象，不传则返回当前时间毫秒数
     * @return {*}
     */
export const getMilliseconds = (date = getNowDate()) => {
  if (isNull(date))
    return
  return new Date(date).getTime()
}

/**
     * @description: 计算时间差
     * @param {Date} start 开始时间
     * @param {Date} end 结束时间
     * @param {*} flag 时间差标识 --- 天，小时，分钟，秒
     * @return {*}
     */
export const getTimeDifference = (start: Date, end: Date, flag) => {
  if (isNull(start) || isNull(end)) {
    console.error(`时间参数错误，${Error}`)
    return
  }
  const MillisecondsDifference = Math.abs(new Date(start).getTime() - new Date(end).getTime())
  const days = Math.floor(MillisecondsDifference / (24 * 3600 * 1000) + 1)

  const leave1 = MillisecondsDifference % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000))

  const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000))

  const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000)

  const flagMap = new Map().set('hours', Math.abs(hours)).set('days', Math.abs(days)).set('minutes', Math.abs(minutes)).set('seconds', Math.abs(seconds))
  return flagMap.get(flag)
}

/**
     * @description: 获取目标年份最后一天
     * @param {*} year 年份
     * @param {*} pattern 格式化
     * @return {string}
     */
export const getYearLastDay = (year, pattern = 'yyyy-MM-dd') => {
  const lastDay = new Date(year)
  lastDay.setFullYear(lastDay.getFullYear() + 2)
  lastDay.setDate(0)
  lastDay.setMonth(-1)
  return format(lastDay, pattern)
}
