/*
 * @Author: Sameer Ahmed 
 * @Date: 2018-02-24 13:54:00
 * @Last Modified by: Sameer Ahmed
 * @Last Modified time: 2018-02-25 02:13:17
 */

import { BigDecimal } from "bigdecimal"

export const RoundingMode = {
    ROUND_HALF_UP: BigDecimal.ROUND_HALF_UP,
    ROUND_HALF_DOWN: BigDecimal.ROUND_HALF_DOWN,
    ROUND_HALF_EVEN: BigDecimal.ROUND_HALF_EVEN,
    ROUND_DOWN: BigDecimal.ROUND_DOWN,
    ROUND_UP: BigDecimal.ROUND_UP,
    ROUND_CEILING: BigDecimal.ROUND_CEILING,
    ROUND_FLOOR: BigDecimal.ROUND_FLOOR,
}

export const convertToUnit = ({amount = '', scale, roundingMode = BigDecimal.ROUND_DOWN}) => {
    
    if (isNaN(amount)) {
        throw new Error('Should be a valid number')
    }

    const number = Number(amount)

    const ONE = 1
    const ONE_THOUSAND = 1000 * ONE
    const ONE_LAKH = 100 * ONE_THOUSAND
    const ONE_CRORE = 100 * ONE_LAKH

    const UNIT_ONE = " "
    const UNIT_CRORE = " cr"
    const UNIT_LAKH = " lakh"
    const UNIT_THOUSAND = " thousand"

    let divisor
    let unit
    if (number >= ONE_CRORE) {
        divisor = ONE_CRORE
        unit = UNIT_CRORE
    } else if (number >= ONE_LAKH) {
        divisor = ONE_LAKH
        unit = UNIT_LAKH
    } else if (number >= ONE_THOUSAND) {
        divisor = ONE_THOUSAND
        unit = UNIT_THOUSAND
    } else {
        divisor = ONE
        unit = UNIT_ONE
    }
    
    let bigDecimal = BigDecimal(number)
    bigDecimal = bigDecimal.divide(BigDecimal(divisor))

    if (typeof scale !== 'undefined') {
        bigDecimal = bigDecimal.setScale(scale, roundingMode)
    }
    return `₹ ${bigDecimal}${unit}`
}