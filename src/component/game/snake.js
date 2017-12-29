import Point from './point.js'
import Map from './map.js'
import { getCanvas } from './util.js'

class Snake {
	constructor () {
		this.dx = 1
		this.dy = 0
		this.bodyList = []
		this.drawId = null
		this.drawCtx = getCanvas().getContext('2d')
		this.timeId = null
		this.init()
	}

	init () {
		this.bodyList.push(new Point(12, 10))
		this.bodyList.push(new Point(11, 10))
		this.bodyList.push(new Point(10, 10))
		this.registerActions()
	}

	registerActions () {
		document.addEventListener('keydown', (event) => {
			if (event.keyCode == 38 || event.keyCode == 	87) { // user press 'arrow up' or 'W'
				if (this.dy != 1) {
					this.dx = 0
					this.dy = -1
				}
			} else if (event.keyCode == 40 || event.keyCode == 83) { // user press 'arrow down' or 'S'
				if (this.dy != -1) {
					this.dx = 0
					this.dy = 1
				}
			} else if (event.keyCode == 37 || event.keyCode == 65) { // user press 'arrow left' or 'A'
				if (this.dx != 1) {
					this.dx = -1
					this.dy = 0
				}
			} else if (event.keyCode == 39 || event.keyCode == 100) { // user press 'arrow right' or 'D'
				if (this.dx != -1) {
					this.dx = 1
					this.dy = 0
				}
			}
		})
	}

	start () {
		this.timerId = window.setInterval(() => {
			if (this.move()) {
			} else {
				console.log('Game Over')
				window.cancelAnimationFrame(this.drawId)
				window.clearInterval(this.timerId)
			}
		}, 1000)
	}

	move () {
		let newPoint =  new Point(this.bodyList[0].posX + this.dx,
			this.bodyList[0].posY + this.dy)
		if (newPoint.posX > Map.WIDTH - 1 || newPoint.posX < 0 ||
			newPoint.posY > Map.HEIGHT - 1 || newPoint.posY < 0) {
			return false
		} else {
			this.bodyList.unshift(newPoint)
			this.bodyList.pop()
			this.draw()
			return true
		}
	}

	draw () {
		this.drawCtx.clearRect(0, 0, Map.WIDTH * 	Map.UNIT, Map.HEIGHT * Map.UNIT)
		for (let point of this.bodyList) {
			this.drawCtx.fillStyle = point.color
			this.drawCtx.fillRect(point.posX * Map.UNIT, point.posY * Map.UNIT,
				Map.UNIT, Map.UNIT)
		}
	}
}

export default Snake