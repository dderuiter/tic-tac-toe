import React from 'react';
import { v4 as uuidv4 } from 'uuid';

class Row extends React.Component {
    render() {
        const squares = [];
        const winningSquares = this.props.winningSquares;

        for (let col = 0; col < this.props.colCount; col++) {
            const squareIndex = this.props.row * this.props.rowCount + col;
            const isWinningSquare = winningSquares && winningSquares.includes(squareIndex);

            squares.push(
                <Square
                    key={uuidv4()}
                    value={this.props.squares[squareIndex]}
                    style={{ color: isWinningSquare ? '#34cf63' : 'black' }}
                    onClick={() => this.props.onClick(squareIndex)}
                />
            );
        }

        return (
            <div className="board-row">{squares}</div>
        );
    }
}

function Square(props) {
    return (
        <button className="square" onClick={props.onClick} style={props.style}>
            {props.value}
        </button>
    );
}

export default Row;