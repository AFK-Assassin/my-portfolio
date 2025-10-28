import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const maxParticles = 80;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track mouse
    const handleMouseMove = (e) => {
      mouse.current.targetX = e.clientX;
      mouse.current.targetY = e.clientY;

      particles.current.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 4 + 1.5,
        opacity: 1,
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
      });

      if (particles.current.length > maxParticles) particles.current.shift();
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth follow for cursor dot
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.15;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.15;

      // Particles trail
      particles.current.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.opacity -= 0.015;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${p.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "cyan";
        ctx.fill();
      });

      // Smooth glowing cursor dot
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 255, 255, 1)";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "cyan";
      ctx.fill();

      // Remove invisible particles
      particles.current = particles.current.filter((p) => p.opacity > 0);

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
}
