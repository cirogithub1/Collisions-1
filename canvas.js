// init global
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// mouse init
let mouse = {
	x: 20,
	y: 20,
}

// color palete
const colors = [
	'red',
	'blue',
	'pink',
	'orange',
]

// Event listeners
addEventListener('mousemove', function(event) {
	mouse.x = event.clientX
	mouse.y = event.clientY
})

addEventListener("resize", function() {
	canvas.width = innerWidth
	canvas.height = innerHeight

	init()
})

// utility functions
function randomRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)]
}

function getHypotenus(x1, y1, x2, y2) {
	const xDistance = x2 - x1
	const yDistance = y2 - y1

	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

// Objects
function Circle(x, y, radius, color) {
	this.x = x
	this.y = y
	this.radius = radius
	this.color = color

	this.update = function() {
		this.draw()
	}

	this.draw = function() {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		ctx.fillStyle = this.color
		ctx.fill()
		ctx.closePath()
	}
}

// Implement
let bigCircle 
let mouseCircle
function init() {
	bigCircle = new Circle(300, 300, 100, "black")
	mouseCircle = new Circle(undefined, undefined, 30, "red")
}

// Animate
function animate() {
	requestAnimationFrame(animate)
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	// ctx.fillText("HTML CANVAS", mouse.x, mouse.y)

	bigCircle.update()

	mouseCircle.x = mouse.x
	mouseCircle.y = mouse.y

	mouseCircle.update()

	if (getHypotenus(bigCircle.x, bigCircle.y, mouseCircle.x, mouseCircle.y) < (bigCircle.radius + mouseCircle.radius)) {
		bigCircle.color = "blue"
	} else {
		bigCircle.color = "red"
	}
}

init()
animate()