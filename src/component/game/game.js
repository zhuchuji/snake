import Snake from './snake.js'

class Game {
	constructor () {
		this.snake = new Snake()
	}

	start () {
		this.snake.start()
	}
}

export default Game