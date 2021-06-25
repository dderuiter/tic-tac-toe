import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Row from './Row';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.rowCount = 3;
        this.colCount = 3;
    }

    render() {
        const rows = [];

        for (let row = 0; row < this.rowCount; row++) {
            rows.push(
                <Row
                    key={uuidv4()}
                    squares={this.props.squares}
                    row={row}
                    rowCount={this.rowCount}
                    colCount={this.colCount}
                    onClick={(i) => this.props.onClick(i)}
                />);
        }

        return (
            <div>{rows}</div>
        );
    }
}

export default Board;