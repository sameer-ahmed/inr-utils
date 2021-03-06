/*
 * @Author: Sameer Ahmed 
 * @Url https://github.com/sameer-ahmed/inr-utils
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

export const ONE = 1
export const ONE_THOUSAND = 1000 * ONE
export const ONE_LAKH = 100 * ONE_THOUSAND
export const ONE_CRORE = 100 * ONE_LAKH

export const UNITS = {
    THOUSAND: {
        key: 'THOUSAND',
        title: 'Thousand',
        suffix: 'Thousand',
        divisor: ONE_THOUSAND,
    },
    LAKH: {
        key: 'LAKH',
        title: 'Lac',
        suffix: 'Lac',
        divisor: ONE_LAKH,
    },
    CRORE: {
        key: 'CRORE',
        title: 'Crore',
        suffix: 'Cr',
        divisor: ONE_CRORE,
    },
    ONE: {
        key: 'ONE',
        title: 'none',
        suffix: '',
        divisor: ONE,
    }
}

var format = exports.format = function format(amount) {
    var x = amount.toString();
    var split = x.split('.')
    x = split[0]
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }
    var res = '' + otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + (typeof split[1] === 'undefined' ? '' : ('.' + split[1])) ;
    return res;
};

export const getUnitAndNumberMap = ({ amount = '', scale = 2, roundingMode = BigDecimal.ROUND_DOWN }) => {
    if (isNaN(amount)) {
        throw new Error('Should be a valid number')
    }

    const number = Number(amount)

    let divisor
    let unitKey
    let unit
    if (number >= ONE_CRORE) {
        divisor = ONE_CRORE
        unit = UNITS.CRORE
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

    if (typeof scale !== 'undefined' && bigDecimal.setScale) {
        bigDecimal = bigDecimal.setScale(scale, roundingMode)
    }

    return { number: Number(bigDecimal), unit }
}

export const convertToUnit = ({ amount = '', scale = 2, roundingMode = BigDecimal.ROUND_DOWN }) => {
    const { number, unit } = getUnitAndNumberMap({ amount, scale, roundingMode })
    return `₹ ${number} ${unit.suffix}`
}
