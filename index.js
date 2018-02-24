/*
 * @Author: Sameer Ahmed 
 * @Date: 2018-02-24 13:54:00
 * @Last Modified by: Sameer Ahmed
 * @Last Modified time: 2018-02-24 19:34:20
 */

import { Bigdecimal } from "bigdecimal"

export const convertToUnit = ({amount = '', scale = 0, roundingMode = RoundingMode.DOWN}) = {
    
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
        
        const bigDecimal = BigDecimal(number)
        bigDecimal = bigDecimal.divide(BigDecimal(divisor))
        bigDecimal = bigDecimal.setScale(scale, roundingMode)
        return `₹ ${bigDecimal}${unit}`
    }