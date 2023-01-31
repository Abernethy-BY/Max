/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-31 13:50:57
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-31 13:53:07
 * @FilePath: \big-screen\src\utils\mathUnils.ts
 * @Description:
 * Copyright (c) 2023 by ${git_name} email: ${git_email}, All Rights Reserved.
 */

/**
 * @description: 生成指定位数的随机整数
 * @param {number} digitsNumber 位数标识
 * @return {number}
 */
export const randomTwoDigitsNumber = (digitsNumber: number): number => Math.round(Math.random() * digitsNumber)
