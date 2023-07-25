
let count = 0;

/**
 * Generate unique ID
 * @returns {number}
 */
export const createId = () => {
    count++;

    return count;
}