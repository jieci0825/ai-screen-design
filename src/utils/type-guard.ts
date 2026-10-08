/** 是否为字符串 */
export const isString = (value: unknown): value is string => typeof value === 'string'

/** 是否为数字 */
export const isNumber = (value: unknown): value is number => typeof value === 'number'

/** 是否为布尔值 */
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'

/** 是否为 undefined */
export const isUndefined = (value: unknown): value is undefined => value === undefined

/** 是否为 null */
export const isNull = (value: unknown): value is null => value === null

/** 是否为 symbol */
export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol'
