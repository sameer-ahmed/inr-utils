/**
 * @author Sameer Ahmed
 * @email me@sameerahmed.in
 * @create date 2018-04-04 05:59:51
 * @modify date 2018-04-04 06:00:17
 * @desc [description]
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

export const UNITS = {
    CARORE: {
        key: 'CARORE',
        title: 'Carore',
        prefix: ' cr',
    },
    LAKH: {
        key: 'LAKH',
        title: 'Lakh',
        prefix: ' lakh',
    },
    THOUSAND: {
        key: 'THOUSAND',
        title: 'Thousand',
        prefix: ' thousand',
    },
    ONE: {
        key: 'ONE',
        title: 'none',
        prefix: ' ',
    }
}

export const ONE = 1
export const ONE_THOUSAND = 1000 * ONE
export const ONE_LAKH = 100 * ONE_THOUSAND
export const ONE_CRORE = 100 * ONE_LAKH

export const getUnitAndNumberMap = ({ amount = '', scale = 2, roundingMode = BigDecimal.ROUND_DOWN }) => {
    if (isNaN(amount)) {
        throw new Error('Should be a valid number')
    }

    const number = Number(amount)

    let divisor
    let unitKey
    if (number >= ONE_CRORE) {
        divisor = ONE_CRORE
        unit = UNITS.CARORE
    } else if (number >= ONE_LAKH) {
        divisor = ONE_LAKH
        unit = UNITS.LAKH
    } else if (number >= ONE_THOUSAND) {
        divisor = ONE_THOUSAND
        unit = UNITS.THOUSAND
    } else {
        divisor = ONE
        unit = UNITS.ONE
    }

    let bigDecimal = BigDecimal(number)
    bigDecimal = bigDecimal.divide(BigDecimal(divisor))

    if (typeof scale !== 'undefined') {
        bigDecimal = bigDecimal.setScale(scale, roundingMode)
    }

    return { number: Number(bigDecimal), unit }
}

export const convertToUnit = ({ amount = '', scale = 2, roundingMode = BigDecimal.ROUND_DOWN }) => {
    const { number, unit } = getUnitAndNumberMap({ amount, scale, roundingMode })
    return `₹ ${number}${unit.prefix}`
}
