import type { FORM_DATA_MODEL } from '~/model'

/**
 * @description: 表单校验方法
 * @param {FORM_DATA_MODEL} formData 待检验表单
 * @param {Map} elMap 表单节点关系字典
 * @return {*}
 */
export const formVerify = (formData: FORM_DATA_MODEL, elMap: Map<string, HTMLElement>) => {
  let nullFlag = false
  Object.keys(formData).forEach((element) => {
    const arrayFlag = Array.isArray(formData[element])
    if (arrayFlag) {
      if (!formData[element] || formData[element].length === 0) {
        nullFlag = true
        anime({ targets: elMap.get(element), color: '#ff4757', round: 1, easing: 'linear', duration: 300 })
      }
    }
    else {
      if (!formData[element] || formData[element] === '') {
        nullFlag = true
        anime({ targets: elMap.get(element), color: '#ff4757', round: 1, easing: 'linear', duration: 300 })
      }
    }
  })
  return nullFlag
}
