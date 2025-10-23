import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const maxParticles = 60;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas to window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse move event
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      particles.current.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 5 + 2,
        opacity: 1,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
      });

      if (particles.current.length > maxParticles) {
        particles.current.shift();
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.current.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.opacity -= 0.02;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${p.opacity})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "cyan";
        ctx.fill();
      });

      // Draw main cursor dot
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 255, 255, 1)";
      ctx.shadowBlur = 25;
      ctx.shadowColor = "cyan";
      ctx.fill();

      // Remove faded particles
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
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
      />
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
