const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArr = [];
hue = 0;

window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

// ctx.fillStyle = "lightPink";
// ctx.strokeStyle = "red";
// ctx.lineWidth = 5;
// ctx.beginPath();
// ctx.arc(100, 100, 50, 0, Math.PI * 2);
// ctx.stroke();
// ctx.fill();
// console.log(ctx);

const mouse = {
	x: undefined,
	y: undefined,
};

canvas.addEventListener("click", function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
	for (let i = 0; i < 20; i++) {
		particlesArr.push(new Particle());
	}
});

canvas.addEventListener("mousemove", function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
	for (let i = 0; i < 1; i++) {
		particlesArr.push(new Particle());
	}
});

class Particle {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		// this.x = Math.random() * canvas.width;
		// this.y = Math.random() * canvas.height;
		this.size = Math.random() * 10 + 1;
		this.speedX = Math.random() * 6 - 1.5;
		this.speedY = Math.random() * 6 - 1.5;
		this.color = `hsl(${hue}, 100%, 65%, 0.4)`;
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		this.size += 0.7;
	}
	draw() {
		const gradient = ctx.createRadialGradient(
			this.x,
			this.y,
			this.size / 20,
			this.x,
			this.y,
			this.size + this.size / 4
		);
		gradient.addColorStop(0.1, "white");
		gradient.addColorStop(0.25, this.color);
		gradient.addColorStop(0.7, "transparent");
		// ctx.fillStyle = this.color;
		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

// function init() {
// 	for (let i = 0; i < 100; i++) {
// 		particlesArr.push(new Particle());
// 	}
// }
// init();

function handleParticles() {
	for (let i = 0; i < particlesArr.length; i++) {
		particlesArr[i].update();
		particlesArr[i].draw();
		if (particlesArr[i].size >= 30) {
			particlesArr.splice(i, 1);
			i--;
		}
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillStyle = "rgba(0,0,0,0.02)";
	// ctx.fillRect(0, 0, canvas.width, canvas.height);
	handleParticles();
	hue += 5;
	requestAnimationFrame(animate);
}
animate();
