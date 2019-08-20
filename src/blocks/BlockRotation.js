const blockTwo0 = (currentBlock) => {
    currentBlock.coords[0][0] += 1;
    currentBlock.coords[0][1] += 1;
    currentBlock.coords[2][0] -= 2;
    currentBlock.coords[3][0] -= 1;
    currentBlock.coords[3][1] -= 1; 

    currentBlock.state = 1;

    return currentBlock;
}

const blockTwo1 = (currentBlock) => {
    currentBlock.coords[0][0] -= 1;
    currentBlock.coords[1][0] -= 1;
    currentBlock.coords[2][0] += 1;
    currentBlock.coords[2][1] += 1;
    currentBlock.coords[3][0] += 1; 
    currentBlock.coords[3][1] += 1; 

    currentBlock.state = 2;

    return currentBlock;
}

const blockTwo2 = (currentBlock) => {
    currentBlock.coords[0][0] += 1;
    currentBlock.coords[0][1] -= 1;
    currentBlock.coords[1][0] += 1;
    currentBlock.coords[1][1] -= 1;
    currentBlock.coords[2][1] += 1; 
    currentBlock.coords[3][1] += 1; 

    currentBlock.state = 3;

    return currentBlock;
}

const blockTwo3 = (currentBlock) => {
    currentBlock.coords[0][0] -= 1;
    currentBlock.coords[1][1] += 1;
    currentBlock.coords[2][0] += 1;
    currentBlock.coords[2][1] -= 2; 
    currentBlock.coords[3][1] -= 1; 


    currentBlock.state = 0;

    return currentBlock;
}

const blockThree0 = (currentBlock) => {
    currentBlock.coords[0][0] += 1;
    currentBlock.coords[0][1] += 1;
    currentBlock.coords[2][0] -= 1;
    currentBlock.coords[2][1] -= 1;
    currentBlock.coords[3][1] -= 2; 

    currentBlock.state = 1;

    return currentBlock;
}

const blockThree1 = (currentBlock) => {
    currentBlock.coords[0][0] -= 1;
    currentBlock.coords[0][1] -= 1;
    currentBlock.coords[1][0] -= 1;
    currentBlock.coords[1][1] -= 1;
    currentBlock.coords[2][1] += 1;
    currentBlock.coords[3][1] += 1; 

    currentBlock.state = 2;

    return currentBlock;
}

const blockThree2 = (currentBlock) => {
    currentBlock.coords[0][1] += 1;
    currentBlock.coords[1][0] += 1;
    currentBlock.coords[2][1] += 1;
    currentBlock.coords[3][0] -= 1; 

    currentBlock.state = 3;

    return currentBlock;
}

const blockThree3 = (currentBlock) => {
    currentBlock.coords[0][1] -= 1;
    currentBlock.coords[1][1] += 1;
    currentBlock.coords[2][0] += 1;
    currentBlock.coords[2][1] -= 1;
    currentBlock.coords[3][0] += 1; 
    currentBlock.coords[3][1] += 1; 

    currentBlock.state = 0;

    return currentBlock;
}

const blockFour0 = (currentBlock) => {
    currentBlock.coords[0][0] += 1;
    currentBlock.coords[0][1] += 1;
    currentBlock.coords[1][0] += 2;
    currentBlock.coords[2][0] -= 1;
    currentBlock.coords[2][1] += 1;

    currentBlock.state = 1;

    return currentBlock;
}

const blockFour1 = (currentBlock) => {
    currentBlock.coords[0][0] -= 1;
    currentBlock.coords[0][1] -= 1;
    currentBlock.coords[1][0] -= 2;
    currentBlock.coords[2][0] += 1;
    currentBlock.coords[2][1] -= 1;

    currentBlock.state = 0;

    return currentBlock;
}

const blockFive0 = (currentBlock) => {
    currentBlock.coords[0][1] += 2;
    currentBlock.coords[1][0] += 1;
    currentBlock.coords[1][1] += 1;
    currentBlock.coords[3][0] += 1;
    currentBlock.coords[3][1] -= 1;

    currentBlock.state = 1;

    return currentBlock;
}

const blockFive1 = (currentBlock) => {
    currentBlock.coords[0][1] -= 2;
    currentBlock.coords[1][0] -= 1;
    currentBlock.coords[1][1] -= 1;
    currentBlock.coords[3][0] -= 1;
    currentBlock.coords[3][1] += 1;

    currentBlock.state = 0;

    return currentBlock;
}


const blockSix0 = (currentBlock) => {
    currentBlock.coords[1][0] += 1;
    currentBlock.coords[1][1] -= 1;
    currentBlock.coords[2][0] += 2;
    currentBlock.coords[2][1] -= 2;
    currentBlock.coords[3][0] += 3;
    currentBlock.coords[3][1] -= 3;

    currentBlock.state = 1;

    return currentBlock;
}

const blockSix1 = (currentBlock) => {
    currentBlock.coords[1][0] -= 1;
    currentBlock.coords[1][1] += 1;
    currentBlock.coords[2][0] -= 2;
    currentBlock.coords[2][1] += 2;
    currentBlock.coords[3][0] -= 3;
    currentBlock.coords[3][1] += 3;

    currentBlock.state = 0;

    return currentBlock;
}

const blockSeven0 = (currentBlock) => {
    currentBlock.coords[0][0] += 1;
    currentBlock.coords[0][1] += 1;
    currentBlock.coords[1][0] -= 1;
    currentBlock.coords[1][1] += 1;
    currentBlock.coords[3][0] += 1;
    currentBlock.coords[3][1] -= 1;

    currentBlock.state = 1;

    return currentBlock;
}

const blockSeven1 = (currentBlock) => {
    currentBlock.coords[1][0] += 1;
    currentBlock.coords[2][1] -= 1;

    currentBlock.state = 2;

    return currentBlock;
}

const blockSeven2 = (currentBlock) => {
    currentBlock.coords[0][0] -= 1;
    currentBlock.coords[0][1] -= 1;

    currentBlock.state = 3;

    return currentBlock;
}

const blockSeven3 = (currentBlock) => {
    currentBlock.coords[1][1] -= 1;
    currentBlock.coords[2][1] += 1;
    currentBlock.coords[3][0] -= 1;
    currentBlock.coords[3][1] += 1;

    currentBlock.state = 0;

    return currentBlock;
}


export const BlockRotation = {
    1: {
        states: 0,
        rotation: [(currentBlock) => { return currentBlock}]
    },
    2: {
        states: 4,
        rotation: [blockTwo0, blockTwo1, blockTwo2, blockTwo3]
    },
    3: {
        states: 4,
        rotation: [blockThree0, blockThree1, blockThree2, blockThree3]
    },
    4: {
        states: 2,
        rotation: [blockFour0, blockFour1]
    },
    5: {
        states: 2,
        rotation: [blockFive0, blockFive1]
    },
    6: {
        states: 2,
        rotation: [blockSix0, blockSix1]
    },
    7: {
        states: 4,
        rotation: [blockSeven0, blockSeven1, blockSeven2, blockSeven3]
    }
}

