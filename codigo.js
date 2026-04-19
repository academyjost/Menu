const canvas = document.getElementById('meteorCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let particles = [];

class Meteor {
    constructor() { this.reset(); }

    reset() {
        this.x = Math.random() * canvas.width + 500;
        this.y = Math.random() * -canvas.height;
        this.size = Math.random() * 4 + 1; 
        this.speed = Math.random() * 10 + 5;
        this.length = Math.random() * 250 + 100;
        // Colores aleatorios para los meteoritos
        const colors = ['#ff0055', '#00bfff', '#ffffff', '#8a2be2'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x -= this.speed;
        this.y += this.speed;
        if (this.y > canvas.height || this.x < 0) this.reset();
    }

    draw() {
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length, this.y - this.length);
        ctx.stroke();
        ctx.restore();
    }
}

// Crear meteoritos
for (let i = 0; i < 40; i++) { particles.push(new Meteor()); }

function animate() {
    // Estela de rastro (efecto motion blur)
    ctx.fillStyle = 'rgba(5, 7, 10, 0.2)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

animate();