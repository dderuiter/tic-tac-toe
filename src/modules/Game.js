import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                moveNumber: 0,
                row: null,
                col: null
            }],
            displayedMoveIndex: 0,
            xIsNext: true,
            isSortAsc: true,
            isGameOver: false,
            winner: null,
            winningSquares: Array(3).fill(null)
        };
    }

    handleClick(i) {
        let displayedMoveIndex = this.state.displayedMoveIndex;

        const history = this.state.history.slice();
        const current = history[displayedMoveIndex];
        const squares = current.squares.slice();

        // Check if game is over or square already contains a value
        if (this.state.isGameOver || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        // Check if player won
        const winningSquares = isGameWon(squares);
        if (winningSquares) {
            console.log("GAME OVER!");

            this.setState({
                isGameOver: true,
                winner: squares[i],
                winningSquares: winningSquares
            });
        // Check if game is a draw
        } else if (isGameDraw(squares)) {
            this.setState({
                isGameOver: true
            })
        }

        const newHistoryEntry = {
            squares: squares,
            moveNumber: current.moveNumber + 1,
            row: Math.floor(i / 3),
            col: i % 3
        };

        for (let i = 0; i < history.length; i++) {
            // Check if history entries need to be removed
            if (history[i].moveNumber === newHistoryEntry.moveNumber) {
                if (this.state.isSortAsc) {
                    // Delete history entries from end of array
                    history.splice(i);
                    break;
                } else {
                    // Delete history entries from start of array
                    history.splice(0, i + 1);
                    break;
                }
            }
        }

        // Add new history entry to start or end of array
        if (this.state.isSortAsc) {
            history.push(newHistoryEntry)
            displayedMoveIndex = history.length - 1;
        } else {
            history.unshift(newHistoryEntry);
            displayedMoveIndex = 0;
        }

        this.setState({
            history: history,
            displayedMoveIndex: displayedMoveIndex,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            displayedMoveIndex: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleSort() {
        const history = this.state.history;
        const totalMoveCount = history.length - 1;

        this.setState({
            history: history.slice().reverse(),
            displayedMoveIndex: totalMoveCount - this.state.displayedMoveIndex,
            isSortAsc: !this.state.isSortAsc
        })
    }

    render() {
        const history = this.state.history;
        const displayedMoveIndex = this.state.displayedMoveIndex
        const current = history[displayedMoveIndex];

        const moves = history.map((arrElement, arrIndex) => {
            const moveNumber = arrElement.moveNumber;
            const isDisplayedMove = displayedMoveIndex === arrIndex;

            const desc = moveNumber === 0 ?
                'Go to game start' :
                `Go to move #${moveNumber} (col: ${arrElement.col}, row: ${arrElement.row})`;

            return (
                <ul key={uuidv4()}>
                    <button
                        style={{ fontWeight: isDisplayedMove ? 'bold' : 'normal' }}
                        onClick={() => this.jumpTo(arrIndex)}>
                        {desc}
                    </button>
                </ul>
            );
        });

        const nextPlayer = this.state.xIsNext ? 'X' : 'O';
        const sortBtnText = this.state.isSortAsc ? 'Sort Moves Desc' : 'Sort Moves Asc';

        let status;
        if(this.state.isGameOver) {
            const winner = this.state.winner;
            status = winner ? 'Winner: ' + winner : `It's a DRAW!`
        } else {
            status = 'Next player: ' + nextPlayer;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winningSquares={this.state.winningSquares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.handleSort()}>{sortBtnText}</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function isGameWon(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }

    return null;
}

function isGameDraw(squares) {
    return !squares.includes(null);
}

export default Game;