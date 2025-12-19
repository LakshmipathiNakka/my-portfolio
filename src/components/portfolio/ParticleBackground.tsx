import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
}

export const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Responsive particle count
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 20 : 35;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize particles
        const initParticles = () => {
            particlesRef.current = Array.from({ length: particleCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.1, // Slower
                vy: (Math.random() - 0.5) * 0.1, // Slower
                size: Math.random() * 1.5 + 0.5, // Smaller dots
                opacity: Math.random() * 0.2 + 0.05, // Lower opacity
            }));
        };
        initParticles();

        // Throttled mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        if (!prefersReducedMotion && !isMobile) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Update position
                if (!prefersReducedMotion) {
                    // Constant slow movement
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    // Subtle mouse parallax (offset, not force)
                    if (!isMobile) {
                        const dx = (mouseRef.current.x - canvas.width / 2) * 0.01;
                        const dy = (mouseRef.current.y - canvas.height / 2) * 0.01;

                        // We use a temporary draw position for parallax to not affect actual position
                        const drawX = particle.x + dx;
                        const drawY = particle.y + dy;

                        // Draw particle with parallax
                        ctx.beginPath();
                        ctx.arc(drawX, drawY, particle.size, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(251, 146, 60, ${particle.opacity})`;
                        ctx.fill();

                        // Connection logic using drawX/drawY
                        particlesRef.current.forEach((otherParticle) => {
                            const odx = (mouseRef.current.x - canvas.width / 2) * 0.01;
                            const ody = (mouseRef.current.y - canvas.height / 2) * 0.01;
                            const oDrawX = otherParticle.x + odx;
                            const oDrawY = otherParticle.y + ody;

                            const distDx = drawX - oDrawX;
                            const distDy = drawY - oDrawY;
                            const distance = Math.sqrt(distDx * distDx + distDy * distDy);

                            if (distance < 100) {
                                ctx.beginPath();
                                ctx.moveTo(drawX, drawY);
                                ctx.lineTo(oDrawX, oDrawY);
                                ctx.strokeStyle = `rgba(251, 146, 60, ${(1 - distance / 100) * 0.05})`;
                                ctx.lineWidth = 0.5;
                                ctx.stroke();
                            }
                        });
                    } else {
                        // Mobile / No Mouse: Simple render
                        ctx.beginPath();
                        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(251, 146, 60, ${particle.opacity})`;
                        ctx.fill();
                    }

                    // Wrap around edges
                    if (particle.x < 0) particle.x = canvas.width;
                    if (particle.x > canvas.width) particle.x = 0;
                    if (particle.y < 0) particle.y = canvas.height;
                    if (particle.y > canvas.height) particle.y = 0;
                }
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        if (!prefersReducedMotion) {
            animate();
        } else {
            // Static render for reduced motion
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesRef.current.forEach((particle) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(251, 146, 60, ${particle.opacity * 0.5})`;
                ctx.fill();
            });
        }

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (!prefersReducedMotion && !isMobile) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        />
    );
};
