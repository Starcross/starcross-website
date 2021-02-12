/*
	Draw a starfield by creating a canvas object inside a given container
    Adapted from http://www.codeproject.com/Articles/642499/Learn-JavaScript-Part-Create-a-Starfield
*/

//  Initialise starfield on load
window.addEventListener('load', () => {
    const container = document.getElementById('starfield')
    const starfield = new Starfield(container)
    starfield.start()
})


//  Create a starfield by adding a new canvas object to the supplied container parameter
class Starfield {

    constructor(container) {
        this.fps = 15
        this.deltaTime = 1 / this.fps;
        this.canvas = null
        this.minVelocity = 1
        this.maxVelocity = 5
        this.numStars = 100
        this.intervalId = 0

        this.width = window.innerWidth
        this.height = window.innerHeight

        //  Create the canvas
        const canvas = document.createElement('canvas');
        container.appendChild(canvas)
        this.canvas = canvas
        this.canvas.width = this.width
        this.canvas.height = this.height
        //  Get the drawing context.
        this.ctx = this.canvas.getContext("2d");

        //  Update on window resize
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight
            this.canvas.width = this.width
            this.canvas.height = this.height
            this.draw()
        })

    }

    start() {
        //  Initialise stars
        this.stars = []
        for (let i = 0; i < this.numStars; i++) {
            this.stars[i] = new Star(Math.random() * this.width, Math.random() * this.height,
                (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity)
        }

        //  Start the timer
        this.intervalId = setInterval(() => {
            this.update()
            this.draw()
        }, 1000 / this.fps)
    }

    stop() {
        clearInterval(this.intervalId)
    }

    update() {
        //  Move stars
        for (let i = 0; i < this.numStars; i++) {
            const star = this.stars[i]
            star.y += this.deltaTime * star.velocity;
            //	If the star has moved beyond the screen, respawn it
            if (star.y > this.height) {
                this.stars[i] = new Star(Math.random() * this.width, 0,
                    (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity)
            }
        }
    }

    draw() {
        //  Draw the background
        this.ctx.fillStyle = '#111'
        this.ctx.fillRect(0, 0, this.width, this.height)

        //  Draw stars
        for (let i = 0; i < this.stars.length; i++) {
            const star = this.stars[i]
            this.ctx.fillStyle = star.color
            this.ctx.fillRect(star.x, star.y, star.size, star.size)
        }
    }

}


//  Store an individual star
class Star {

    constructor(x, y, velocity) {
        const colours = ['#888', '#008D8D', '#8D8D00', '#8D0000'] //  ZX Spectrum inspired colours
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 2 // 2-5
        this.color = colours[Math.floor(Math.random() * colours.length)]
        this.velocity = velocity
    }

}
