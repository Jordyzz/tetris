import React, { Component } from 'react';

import Cube from './Cube';
import ControlPanel from './ControlPanel';
import Scoreboard from './Scoreboard';
import { BlockTypes } from './../blocks/BlockTypes';
import { BlockRotation } from './../blocks/BlockRotation';
import { tetrisState } from './../constants/StateMachine';
import './../styles.css'

class Board extends Component {
    state = {
        board: Array(16).fill().map(() => Array(10).fill(0)),
        currentBlock: {
            id: 1,
            type: "Cube",
            coords: [],
        },
        isGameOver: false,
        level: 1,
        score: 0,
    };

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleUserClick);
        clearInterval(this._intervalHandler);
    }

    renderBoard = () => {
        const { board } = this.state;
        return board.map((column, cIndex) => {
            return column.map((row, rIndex) => {
                return <Cube key={cIndex + ' ' + rIndex} 
                             id={board[cIndex][rIndex]} 
                             />
            })
        });
    }

    tick = () => {
        let { currentBlock, board } = JSON.parse(JSON.stringify(this.state));
        if (this.nextTickValid()) {
            for (let i = currentBlock.coords.length - 1; i >= 0; i--) {
                board[currentBlock.coords[i][0]][currentBlock.coords[i][1]] = 0;
                ++currentBlock.coords[i][0];
                board[currentBlock.coords[i][0]][currentBlock.coords[i][1]] = currentBlock.id;
            }
 
            this.setState({
                board: board,
                currentBlock: currentBlock,
            });
        } else {
            clearInterval(this._intervalHandler);
            this.generateShape();
        }
    }

    nextTickValid = () => {
        let { board, currentBlock } = JSON.parse(JSON.stringify(this.state));
        board = this.removeBlockFromBoard(board, currentBlock);
        const nextBlockPosition = this.reflectNextDownPosition();
        for (let i = 0; i < nextBlockPosition.coords.length; i++) {
            if (nextBlockPosition.coords[i][0] > board.length - 1 
                || board[nextBlockPosition.coords[i][0]][nextBlockPosition.coords[i][1]] > 0 
            )  {
                console.log("false");
                return false;
            }
        }

        return true;
    }

    reflectNextDownPosition = () => {
        let { currentBlock } = JSON.parse(JSON.stringify(this.state));
        for (let i = 0; i < currentBlock.coords.length; i++) {
            ++currentBlock.coords[i][0];
        }

        return currentBlock;
    }

    generateRandomBlock = () => {
        const blockArray = Object.values(BlockTypes); 
        return blockArray[blockArray.length * Math.random() << 0];
    }

    generateShape = () => {
        this.checkCompletedRows();
        const { board, isGameOver } = JSON.parse(JSON.stringify(this.state));
        const newBlock = this.generateRandomBlock();

        board[newBlock.coords[0][0]][newBlock.coords[0][1]] = newBlock.id;
        board[newBlock.coords[1][0]][newBlock.coords[1][1]] = newBlock.id;
        board[newBlock.coords[2][0]][newBlock.coords[2][1]] = newBlock.id;
        board[newBlock.coords[3][0]][newBlock.coords[3][1]] = newBlock.id;

        if (isGameOver || this.checkIsGameOver(newBlock)) {
            this.setState({
                isGameOver: true,
                currentBlock: newBlock,
                board: board
            });

            document.removeEventListener('keydown', this.handleUserClick);
            this._tetrisState = tetrisState.END;
            return;
        }

        this.setState({
            board: board,
            currentBlock: newBlock
        });

        this._intervalHandler = setInterval(() => {
            this.tick();
        }, this._speed);
    }

    checkIsGameOver = (nextBlock) => {
        const { board } = JSON.parse(JSON.stringify(this.state));
        let newBlock = Object.assign({}, nextBlock);
        for (let i = 0; i < newBlock.coords.length; i++) {
            if (board[newBlock.coords[i][0]][newBlock.coords[i][1]] > 0) {
                console.log("Game over");
                return true;
            }
        }

        return false;
    }

    start = () => {
        if (this._tetrisState === tetrisState.START || this._tetrisState === tetrisState.PAUSE) {
            return;
        }

        document.addEventListener('keydown', this.handleUserClick);
        this.reset();
        this._tetrisState = tetrisState.START;
        this._speed = 500;
        this.generateShape();
    }

    pause = () => {
        if (this._tetrisState !== tetrisState.START) 
            return;

        this._tetrisState = tetrisState.PAUSE;
        clearInterval(this._intervalHandler);
    }

    resume = () => {
        if (this._tetrisState !== tetrisState.PAUSE)
            return;

        this._tetrisState = tetrisState.START;
        this._intervalHandler = setInterval(() => {
            this.tick();
        }, this._speed);
    }

    reset = () => {
        clearInterval(this._intervalHandler);
        this.setState({
            board: Array(16).fill().map(() => Array(10).fill(0)),
            isGameOver: false,
            level: 1,
            score: 0
        });

        this._tetrisState = tetrisState.END;
    }

    handleUserClick = (event) => {
        switch (event.key) {
            case "ArrowLeft":
                this.moveBlockLeft();
                break;
            case "ArrowRight":
                this.moveBlockRight();
                break;
            case "ArrowUp":
                this.rotateBlock();
                break;
            case "ArrowDown":
                this.tick();
                break;
            default:    
                break;
        }
    }

    rotateBlock = () => {
        let { board, currentBlock } = JSON.parse(JSON.stringify(this.state));
        if (this.isRotateValid()) {
            board = this.removeBlockFromBoard(board, currentBlock);
            currentBlock = BlockRotation[currentBlock.id].rotation[currentBlock.state](currentBlock);
            
            for (let i = currentBlock.coords.length - 1; i >= 0; i--) {
                board[currentBlock.coords[i][0]][currentBlock.coords[i][1]] = currentBlock.id;
            }

            this.setState({
                board: board,
                currentBlock: currentBlock,
            });
        }
    }

    isRotateValid = () => {
        let { board, currentBlock } = JSON.parse(JSON.stringify(this.state));
        board = this.removeBlockFromBoard(board, currentBlock);
        let rotatedBlock = Object.assign({}, currentBlock);
        rotatedBlock = BlockRotation[rotatedBlock.id].rotation[rotatedBlock.state](rotatedBlock);

        for (let i = rotatedBlock.coords.length - 1; i >= 0; i--) {
            if (this.isOutOfBounds(rotatedBlock.coords[i])
                || board[rotatedBlock.coords[i][0]][rotatedBlock.coords[i][1]] > 0) {
                    console.log(board[rotatedBlock.coords[i][0]][rotatedBlock.coords[i][1]] > 0)
                    console.log(this.isOutOfBounds(rotatedBlock.coords[i]));
                    return false;
                }
        }

        return true;
    }

    isOutOfBounds = (coords) => {
        if (coords[0] < 0 || coords[0] > 14 
            || coords[1] < 0 || coords[1] > 9)
        return true;

        return false;
    }

    moveBlockLeft = () => {
        let { board, currentBlock } = JSON.parse(JSON.stringify(this.state));
        if (this.moveLeftValid()) {
            board = this.removeBlockFromBoard(board, currentBlock);
            for (let i = currentBlock.coords.length - 1; i >= 0; i--) {
                --currentBlock.coords[i][1];
                board[currentBlock.coords[i][0]][currentBlock.coords[i][1]] = currentBlock.id;
            }
            this.setState({
                board: board,
                currentBlock: currentBlock,
            });
        }
    }

    moveLeftValid = () => {
        let { board, currentBlock } = JSON.parse(JSON.stringify(this.state));
        board = this.removeBlockFromBoard(board, currentBlock);
        const nextBlockPosition = this.reflectNextLeftPosition();
        for (let i = 0; i < nextBlockPosition.coords.length; i++) {
            if (nextBlockPosition.coords[i][1] < 0 
                || board[nextBlockPosition.coords[i][0]][nextBlockPosition.coords[i][1]] > 0 
            )  {
                return false;
            }
        }

        return true;
    }

    reflectNextLeftPosition = () => {
        let { currentBlock } = JSON.parse(JSON.stringify(this.state));
        for (let i = 0; i < currentBlock.coords.length; i++) {
            --currentBlock.coords[i][1];
        }

        return currentBlock;
    }

    moveBlockRight = () => {
        let { board, currentBlock } = JSON.parse(JSON.stringify(this.state));
        if (this.moveRightValid()) {
            board = this.removeBlockFromBoard(board, currentBlock);
            for (let i = currentBlock.coords.length - 1; i >= 0; i--) {
                ++currentBlock.coords[i][1];
                board[currentBlock.coords[i][0]][currentBlock.coords[i][1]] = currentBlock.id;
            }
            this.setState({
                board: board,
                currentBlock: currentBlock,
            });
        } 
    }

    moveRightValid = () => {
        let { board, currentBlock } = JSON.parse(JSON.stringify(this.state));
        board = this.removeBlockFromBoard(board, currentBlock);
        const nextBlockPosition = this.reflectNextRightPosition();
        for (let i = 0; i < nextBlockPosition.coords.length; i++) {
            if (nextBlockPosition.coords[i][1] > board[0].length - 1 
                || board[nextBlockPosition.coords[i][0]][nextBlockPosition.coords[i][1]] > 0
            )  {
                return false;
            }
        }

        return true;
    }

    reflectNextRightPosition = () => {
        let { currentBlock } = JSON.parse(JSON.stringify(this.state));
        for (let i = 0; i < currentBlock.coords.length; i++) {
            ++currentBlock.coords[i][1];
        }

        return currentBlock;
    }

    removeBlockFromBoard = (board, currentBlock) => {
        board[currentBlock.coords[0][0]][currentBlock.coords[0][1]] = 0;
        board[currentBlock.coords[1][0]][currentBlock.coords[1][1]] = 0;
        board[currentBlock.coords[2][0]][currentBlock.coords[2][1]] = 0;
        board[currentBlock.coords[3][0]][currentBlock.coords[3][1]] = 0;

        return board;
    }

    checkCompletedRows = () => {
        let { board } = JSON.parse(JSON.stringify(this.state));
        for (let i = 0; i < board.length; ++i) {
            if (board[i].every(value => value > 0)) {
                this.removeCompletedRow(board, i);
                console.log("removed row");
            }
        }
    }

    removeCompletedRow = (board, index) => {
        const { score, level } = this.state;
        const newLevel = this.checkLevelUp(score + 10, level);

        board.splice(index, 1);
        board.unshift(Array(10).fill(0));
        this.setState({
            board,
            score: score + 10,
            level: newLevel
        });

        
    }

    checkLevelUp = (newScore, level) => {
        const newLevel = Math.floor(newScore / 100) + 1

        if (newLevel > level) {
            this.speedUp();
        }

        return newLevel;
    }

    speedUp = () => {
        this._speed -= 50;
    }

    render() {
        const { score, level, isGameOver } = this.state; 
        return (
            <div className="tetris">
                <div className="tetris-info">
                    <ControlPanel start={this.start} resume={this.resume} pause={this.pause} reset={this.reset} />
                    <Scoreboard score={score} level={level} gameover={isGameOver}/>    
                </div>
                <div className="tetris-board">
                    {this.renderBoard()}
                </div>
            </div>
        );
    }
}
 
export default Board;