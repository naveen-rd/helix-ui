import { getShiftMap } from '../utils/getShiftMap';

/**
 * @function
 * @argument {ORIENTATION} orientation - the current orientation
 * @argument {POSITION} position - the current position
 * @returns {POSITION} the newly shifted position
 */
function shift (orientation, position) {
    return getShiftMap()[orientation][position];
}

export { shift }
