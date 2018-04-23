'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertToUnit = exports.getUnitAndNumberMap = exports.UNITS = exports.ONE_CRORE = exports.ONE_LAKH = exports.ONE_THOUSAND = exports.ONE = exports.RoundingMode = undefined;

var _bigdecimal = require('bigdecimal');

var RoundingMode = exports.RoundingMode = {
    ROUND_HALF_UP: _bigdecimal.BigDecimal.ROUND_HALF_UP,
    ROUND_HALF_DOWN: _bigdecimal.BigDecimal.ROUND_HALF_DOWN,
    ROUND_HALF_EVEN: _bigdecimal.BigDecimal.ROUND_HALF_EVEN,
    ROUND_DOWN: _bigdecimal.BigDecimal.ROUND_DOWN,
    ROUND_UP: _bigdecimal.BigDecimal.ROUND_UP,
    ROUND_CEILING: _bigdecimal.BigDecimal.ROUND_CEILING,
    ROUND_FLOOR: _bigdecimal.BigDecimal.ROUND_FLOOR
}; /*
    * @Author: Sameer Ahmed 
    * @Url https://github.com/sameer-ahmed/inr-utils
    */

var ONE = exports.ONE = 1;
var ONE_THOUSAND = exports.ONE_THOUSAND = 1000 * ONE;
var ONE_LAKH = exports.ONE_LAKH = 100 * ONE_THOUSAND;
var ONE_CRORE = exports.ONE_CRORE = 100 * ONE_LAKH;

var UNITS = exports.UNITS = {
    CRORE: {
        key: 'CRORE',
        title: 'Crore',
        prefix: 'cr',
        divisor: ONE_CRORE
    },
    LAKH: {
        key: 'LAKH',
        title: 'Lakh',
        prefix: 'lakh',
        divisor: ONE_LAKH
    },
    THOUSAND: {
        key: 'THOUSAND',
        title: 'Thousand',
        prefix: 'thousand',
        divisor: ONE_THOUSAND
    },
    ONE: {
        key: 'ONE',
        title: 'none',
        prefix: '',
        divisor: ONE
    }
};

var getUnitAndNumberMap = exports.getUnitAndNumberMap = function getUnitAndNumberMap(_ref) {
    var _ref$amount = _ref.amount,
        amount = _ref$amount === undefined ? '' : _ref$amount,
        _ref$scale = _ref.scale,
        scale = _ref$scale === undefined ? 2 : _ref$scale,
        _ref$roundingMode = _ref.roundingMode,
        roundingMode = _ref$roundingMode === undefined ? _bigdecimal.BigDecimal.ROUND_DOWN : _ref$roundingMode;

    if (isNaN(amount)) {
        throw new Error('Should be a valid number');
    }

    var number = Number(amount);

    var divisor = void 0;
    var unitKey = void 0;
    var unit = void 0;
    if (number >= ONE_CRORE) {
        divisor = ONE_CRORE;
        unit = UNITS.CRORE;
    } else if (number >= ONE_LAKH) {
        divisor = ONE_LAKH;
        unit = UNITS.LAKH;
    } else if (number >= ONE_THOUSAND) {
        divisor = ONE_THOUSAND;
        unit = UNITS.THOUSAND;
    } else {
        divisor = ONE;
        unit = UNITS.ONE;
    }

    var bigDecimal = (0, _bigdecimal.BigDecimal)(number);
    bigDecimal = bigDecimal.divide((0, _bigdecimal.BigDecimal)(divisor));

    if (typeof scale !== 'undefined') {
        bigDecimal = bigDecimal.setScale(scale, roundingMode);
    }

    return { number: Number(bigDecimal), unit: unit };
};

var convertToUnit = exports.convertToUnit = function convertToUnit(_ref2) {
    var _ref2$amount = _ref2.amount,
        amount = _ref2$amount === undefined ? '' : _ref2$amount,
        _ref2$scale = _ref2.scale,
        scale = _ref2$scale === undefined ? 2 : _ref2$scale,
        _ref2$roundingMode = _ref2.roundingMode,
        roundingMode = _ref2$roundingMode === undefined ? _bigdecimal.BigDecimal.ROUND_DOWN : _ref2$roundingMode;

    var _getUnitAndNumberMap = getUnitAndNumberMap({ amount: amount, scale: scale, roundingMode: roundingMode }),
        number = _getUnitAndNumberMap.number,
        unit = _getUnitAndNumberMap.unit;

    return '\u20B9 ' + number + ' ' + unit.prefix;
};