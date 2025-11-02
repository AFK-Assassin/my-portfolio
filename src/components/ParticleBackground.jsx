import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 100;
    const colors = [
      "rgba(255,255,255,0.7)",
      "rgba(103,216,250,0.6)", // optional: add pastel colors
      "rgba(255,182,193,0.6)",
      "rgba(144,238,144,0.6)",
    ];

    // Particle class → defines position, speed, radius, color, alpha (twinkle), draw & update methods
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;   //this 2 line used to generate particle at random in x/y axis
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 1; // random size between 1-4px
        this.color = colors[Math.floor(Math.random() * colors.length)];  // selects a colour in random
        this.speedx = (Math.random() - 0.5) * 0.5;
        this.speedy = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.5 + 0.3; // for twinkling effect
      }

      // draw particle on canvas
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 10; // glow effect
        ctx.shadowColor = this.color;
        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`; // twinkle
        ctx.fill();
      }

      // update particle position and alpha
      update() {
        this.x += this.speedx;
        this.y += this.speedy;

        // wrap particles around canvas edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // twinkling effect: slight alpha changes
        this.alpha += (Math.random() - 0.5) * 0.02; // alpha changes a little each frame
        if (this.alpha > 0.8) this.alpha = 0.8;
        if (this.alpha < 0.3) this.alpha = 0.3;

        this.draw();
      }
    }

    // create particle array
    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    // resize canvas & recreate particles on window resize
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    // draw lines connecting close particles (optional network effect)
    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // animation loop → clears canvas, updates particles, draws connecting lines
    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      connectParticles(); // optional network effect
      animationId = requestAnimationFrame(animate);
    }
    animate();

    // cleanup → remove event listener & cancel animation
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute w-full h-full top-0 left-0 pointer-events-none z-0"
    />
  );
}

/* 
Usage Notes:
- useRef → get a reference to the canvas element.
- useEffect → setup particles, animate them, handle resizing, cleanup.
- Particle class → defines particle properties, movement, twinkle, and draw method.
- createParticles() → initializes all particles when canvas resizes or loads.
- handleResize() → updates canvas size and recreates particles.
- animate() → clears canvas each frame and updates particles.
- connectParticles() → optional: draws lines between nearby particles for network effect.
- alpha property → gives twinkling effect.
*/
