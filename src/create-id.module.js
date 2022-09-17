
export const createId = () => {
   let count = 1;

    const id = (Math.random() * 1000 + count).toFixed(4);
    count++;

    return id;
}