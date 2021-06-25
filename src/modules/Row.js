import React from 'react';
import { v4 as uuidv4 } from 'uuid';

class Row extends React.Component {
    render() {
        const squares = [];

        for (let col = 0; col < this.props.colCount; col++) {
            const squareIndex = this.props.row * this.props.rowCount + col;

            squares.push(
                <Square
                    key={uuidv4()}
                    value={this.props.squares[squareIndex]}
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
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Row;