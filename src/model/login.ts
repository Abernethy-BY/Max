/*
 * @Author: Abernethy-BY by15242952083@outlook.com
 * @Date: 2023-02-02 16:15:11
 * @LastEditors: Abernethy-BY by15242952083@outlook.com
 * @LastEditTime: 2023-03-25 16:20:59
 * @FilePath: \big-screen\src\model\login.ts
 * @Description:
 * Copyright (c) 2023 by Abernethy-BY email: by15242952083@outlook.com, All Rights Reserved.
 */
export interface LOGIN_FLAG_DICTIONARY {
  mainTitle: string
  subTitle: string | null
  jumpIcon: boolean
  routerDirection: `${LOGIN_TYPE_ENUM}` | null
  marking: string | null
  returnIcon: boolean
}

export interface LOGIN_FOOTER_SPAN_DICTIONARY {
  buttonList: LOGIN_TYPE[]
  buttonType: 'JUMP' | 'CONFIRM'
  routerDirection: LOGIN_TYPE[]
  showFooter: boolean
}

export enum LOGIN_TYPE_ENUM {
  PASS_LOGIN = 'PASS_LOGIN',
  FORGOT_PASS = 'FORGOT_PASS',
  SIGN_UP = 'SIGN_UP',
  SMS_LOGIN = 'SMS_LOGIN',
  SCAN_TO_LOG_IN = 'SCAN_TO_LOG_IN',
}

export type LOGIN_TYPE = `${LOGIN_TYPE_ENUM}`

export type LOGIN_KEY = keyof typeof LOGIN_TYPE_ENUM

// 弹窗类型
export enum OPERATE_DIALOG_FLAG_ENUM {
  LOGIN = 'LOGIN',
  SIGN_UP = 'SIGN_UP',
  USER_AGREEMENT = 'USER_AGREEMENT',
  UNDER_REVIEW = 'UNDER_REVIEW',
  AUDIT_FAILED = 'AUDIT_FAILED',
  NOT_ENTERED = 'NOT_ENTERED',
  PASS_MISTAKE = 'PASS_MISTAKE',
}

export type OPERATE_DIALOG_TYPE = `${OPERATE_DIALOG_FLAG_ENUM}`

export type OPERATE_DIALOG_TYPE_KEY = keyof typeof OPERATE_DIALOG_FLAG_ENUM

export interface OPERATE_DIALOG_MITT_MODEL<T> {
  type: OPERATE_DIALOG_TYPE_KEY
  nextCallBack?: Function
  closeCallBack?: Function
  param?: T
}

export enum LOGIN_MITT_ENUM {
  openForgetPass = 'OPEN_FORGET_PASS',
  openOperateDialog = 'OPEN_OPERATE_DIALOG',
  openEnterInformation = 'OPEN_ENTER_INFORMATION',
  userAgreementError = 'USER_AGREEMENT_ERROR',
  notRegistered = 'NOT_REGISTERED',
}

export type LOGIN_MITT_TYPE = `${LOGIN_MITT_ENUM}`

export type LOGIN_MITT = keyof typeof LOGIN_MITT_ENUM

export enum LOGIN_ERROR_ENUM {
  UNDER_REVIEW = '审核中',
  NOT_ENTERED = '未录入资料',
  AUDIT_FAILED = '审核不通过',
}

export type LOGIN_ERROR_TYPE_LEY = keyof typeof LOGIN_ERROR_ENUM

export enum USER_ROLE_ENUM {
  DIT = '工信厅',
  BIT = '工信局',
  PMC = '园区管委会',
  PC = '园区专员',
  CP = '企业',
  SA = '超级管理员',
}

export type USER_ROLE_TYPE = `${USER_ROLE_ENUM}`

export type USER_ROLE_TYPE_KEY = keyof typeof USER_ROLE_ENUM
