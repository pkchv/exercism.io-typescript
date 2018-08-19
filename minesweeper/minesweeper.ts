
type BoardStringsArray = string[]
type Coordinates = [number, number]

enum SquareTypes {
    Nothing,
    Mine,
    Number,
    BadSquare = -1
}

class Square {
    type: SquareTypes
    value?: number

    constructor(type: SquareTypes, value?: number) {
        this.type = type
        this.value = value
    }

    public toString(): string {
        switch (this.type) {
            case SquareTypes.Mine:
                return '*'
            case SquareTypes.Nothing:
                return ' '
            case SquareTypes.BadSquare:
                return '!'
            case SquareTypes.Number:
                return (this.value || 0).toString()
        }
    }

    public static fromChar(char: string): Square {
        if (!/[0-9 *]{1}/.test(char)) {
            return new Square(SquareTypes.BadSquare)
        }
        
        if (char === '*') {
            return new Square(SquareTypes.Mine)
        }

        if (char === ' ') {
            return new Square(SquareTypes.Nothing)
        }

        return new Square(SquareTypes.Number, parseInt(char, 10))
    }

    public deepCopy(): Square {
        return new Square(this.type, this.value)
    }
}


class BoardController {
    public static cartesianProduct(xArray: number[], yArray: number[]): Coordinates[] {
        return ([] as Coordinates[]).concat(...xArray.map(x => yArray.map((y): Coordinates => [x, y])))
    }

    public static getAdjacentSquaresCoordinates(board: Board, [x, y]: Coordinates): Coordinates[] {
        const adjacentShifts = [0, 1, -1]
        const identity = ([x, y]: Coordinates) => x === 0 && y === 0

        return BoardController
            .cartesianProduct(adjacentShifts, adjacentShifts)
            .filter(v => !identity(v))
            .map(([dX, dY]): Coordinates => [x + dX, y + dY])
            .filter((position) => board.isValidSquare(position))
    }

    public static annotate(board: Board): Board {
        const boardCopy = board.deepCopy()

        for (let x = 0; x < board.sizeX; ++x) {
            for (let y = 0; y < board.sizeY; ++y) {
                const squareCoordinates: Coordinates = [x, y]
                if (board.get(squareCoordinates).type === SquareTypes.Nothing) {
                    const adjacentSquares = BoardController
                        .getAdjacentSquaresCoordinates(board, squareCoordinates)
                        .map((position) => board.get(position))
                    
                    const adjacentMineCount = adjacentSquares
                        .filter((square) => square.type === SquareTypes.Mine).length
                    if (adjacentMineCount > 0) {
                        boardCopy.set(squareCoordinates, new Square(SquareTypes.Number, adjacentMineCount))
                    }
                }
            }
        }

        return boardCopy
    }
}

class Board {

    boardData: Square[][]
    sizeX: number
    sizeY: number

    constructor(boardData:  Square[][]) {

        if (!this.isValidBoard(boardData)) {
            throw Error('Malformed board')
        }

        this.boardData = boardData
        this.sizeX = boardData.length
        this.sizeY = (boardData[0] || []).length
    }

    private isValidBoard(board: Square[][]): boolean {
        if (board.length === 0) {
            return true
        }

        return board.every(row => row.length === board[0].length)
    }

    public static parse(input: BoardStringsArray): Board {
        return new Board(input.reduce((acc: Square[][], boardString) => {
            return acc.concat([boardString.split('').map(Square.fromChar)])
        }, []))
    }

    public deepCopy(): Board {
        const boardDataCopy = this.boardData
            .map((row: Square[]) => [...row].map((square: Square): Square => square.deepCopy()))
        return new Board(boardDataCopy)
    }

    public isValidSquare([x, y]: Coordinates) {
        return x >= 0 && y >= 0 && x < this.sizeX && y < this.sizeY
    }

    public get([x, y]: Coordinates) {
        if (!this.isValidSquare([x, y])) {
            throw Error('Out of bounds board access.')
        }

        return this.boardData[x][y]
    }

    public set([x, y]: Coordinates, square: Square) {
        if (!this.isValidSquare([x, y])) {
            throw Error('Out of bounds board access.')
        }

        this.boardData[x][y] = square
    }

    public toArrayOfStrings(): BoardStringsArray {
        return this.boardData.reduce((board: BoardStringsArray, row: Square[]) => {
            return board.concat(row.reduce((rowAsString: string, square: Square) => {
                return rowAsString + square.toString()
            }, ''))
        }, [])
    }
}

class Minesweeper {
    public annotate(input: BoardStringsArray): BoardStringsArray {
        const board = Board.parse(input)
        const annotatedBoard = BoardController.annotate(board)
        return annotatedBoard.toArrayOfStrings()
    }
}

export default Minesweeper
