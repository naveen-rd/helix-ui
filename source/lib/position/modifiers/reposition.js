import { ORIENTATION } from '../constants/orientation';
import { shift } from './shift';

/**
 * @function
 * @argument {POSITION} position - the current position
 * @argument {Object} offscreen - the offscreen validation object
 * @returns {POSITION} the new position
 */
function reposition (position, offscreen) {
    if (offscreen.top || offscreen.bottom) {
        position = shift(ORIENTATION.VERTICAL, position);
    }

    if (offscreen.left || offscreen.right) {
        position = shift(ORIENTATION.HORIZONTAL, position);
    }

    return position;
}

export { reposition };
