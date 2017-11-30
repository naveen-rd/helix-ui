import { POSITION } from './constants/position';
import { reposition } from './modifiers/reposition';
import { getOffsetsObject, getOffScreenValidationObject } from './utils';

/**
 * @function
 * @argument {Element} offsetElement - the element to get offsets for
 * @argument {Element} targetElement - the element that is being offset from
 * @argument {POSITION} position - (Optional) the position of the offset element
 * @returns {Object} the offsets object, containing position
 */
function getOffsets (offsetElement, targetElement, position = POSITION.BOTTOM_RIGHT) {
    let offsets = getOffsetsObject(position, offsetElement, targetElement);
    let offscreen = getOffScreenValidationObject(offsetElement, offsets);

    //If the element is offscreen, reposition the element
    if (offscreen.anywhere) {
        let newPosition = reposition(position, offscreen);
        let newOffsets = getOffsetsObject(newPosition, offsetElement, targetElement);

        //If the repositioned element is no longer offscreen,
        //use the new repositioned element offsets
        offscreen = getOffScreenValidationObject(offsetElement, newOffsets);
        if (!offscreen.anywhere) {
            offsets = newOffsets;
        }
    }

    return offsets;
}

export { getOffsets };
