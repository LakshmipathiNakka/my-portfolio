import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export const DarkVeilShader = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme, systemTheme } = useTheme();
    const animationFrameRef = useRef<number>();
    const glRef = useRef<WebGLRenderingContext | null>(null);
    const programRef = useRef<WebGLProgram | null>(null);
    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        // Check if mobile
        const isMobile = window.innerWidth < 768;
        if (isMobile) return;

        // Initialize WebGL
        const gl = canvas.getContext("webgl", {
            alpha: true,
            antialias: false,
            depth: false,
            stencil: false,
            premultipliedAlpha: true,
        });

        if (!gl) {
            console.warn("WebGL not supported");
            return;
        }

        glRef.current = gl;

        // Vertex shader - simple fullscreen quad
        const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

        // Fragment shader - atmospheric noise with theme colors
        const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_baseColor;
      uniform vec3 u_accentColor;
      uniform float u_isDark;

      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        
        // Very slow time progression for calm effect
        float time = u_time * 0.05;
        
        // Multi-octave noise for atmospheric texture
        float noise = 0.0;
        float amplitude = 1.0;
        float frequency = 1.0;
        vec2 p = uv * 2.0;
        
        // Layer 1 - Large scale movement
        noise += snoise(p * frequency + time * 0.1) * amplitude * 0.3;
        
        // Layer 2 - Medium detail
        frequency *= 2.0;
        amplitude *= 0.5;
        noise += snoise(p * frequency + time * 0.15) * amplitude * 0.3;
        
        // Layer 3 - Fine detail
        frequency *= 2.0;
        amplitude *= 0.5;
        noise += snoise(p * frequency - time * 0.08) * amplitude * 0.2;
        
        // Normalize noise to 0-1 range
        noise = noise * 0.5 + 0.5;
        
        // Very subtle vignette for depth
        float vignette = 1.0 - length(uv - 0.5) * 0.3;
        noise *= vignette;
        
        // Mix base color with subtle accent tint
        vec3 color = u_baseColor;
        
        // In dark mode, add very subtle accent influence
        if (u_isDark > 0.5) {
          color = mix(color, u_accentColor, noise * 0.03);
        } else {
          // In light mode, even more subtle
          color = mix(color, u_accentColor, noise * 0.01);
        }
        
        // Add noise variation to create texture
        color += (noise - 0.5) * 0.02;
        
        // Very low opacity for subtlety
        float alpha = u_isDark > 0.5 ? 0.4 : 0.2;
        
        gl_FragColor = vec4(color, alpha);
      }
    `;

        // Compile shaders
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);

        // Create program
        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        programRef.current = program;

        // Set up fullscreen quad
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Get uniform locations
        const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        const timeLocation = gl.getUniformLocation(program, "u_time");
        const baseColorLocation = gl.getUniformLocation(program, "u_baseColor");
        const accentColorLocation = gl.getUniformLocation(program, "u_accentColor");
        const isDarkLocation = gl.getUniformLocation(program, "u_isDark");

        // Function to get theme colors from CSS variables
        const getThemeColors = () => {
            const currentTheme = theme === "system" ? systemTheme : theme;
            const isDark = currentTheme === "dark";

            // Get computed style from root
            const root = document.documentElement;
            const styles = getComputedStyle(root);

            // Parse HSL values from CSS variables
            const parseHSL = (hslString: string): [number, number, number] => {
                const values = hslString.trim().split(/\s+/);
                return [
                    parseFloat(values[0]) / 360, // H: 0-1
                    parseFloat(values[1]) / 100, // S: 0-1
                    parseFloat(values[2]) / 100, // L: 0-1
                ];
            };

            // Convert HSL to RGB
            const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
                let r, g, b;

                if (s === 0) {
                    r = g = b = l;
                } else {
                    const hue2rgb = (p: number, q: number, t: number) => {
                        if (t < 0) t += 1;
                        if (t > 1) t -= 1;
                        if (t < 1 / 6) return p + (q - p) * 6 * t;
                        if (t < 1 / 2) return q;
                        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                        return p;
                    };

                    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    const p = 2 * l - q;
                    r = hue2rgb(p, q, h + 1 / 3);
                    g = hue2rgb(p, q, h);
                    b = hue2rgb(p, q, h - 1 / 3);
                }

                return [r, g, b];
            };

            const bgHSL = parseHSL(styles.getPropertyValue("--background"));
            const accentHSL = parseHSL(styles.getPropertyValue("--accent"));

            const baseColor = hslToRgb(...bgHSL);
            const accentColor = hslToRgb(...accentHSL);

            return { baseColor, accentColor, isDark };
        };

        // Resize handler
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2); // Cap at 2x for performance
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        resize();
        window.addEventListener("resize", resize);

        // Animation loop
        let isActive = true;

        const render = () => {
            if (!isActive || !gl || !programRef.current) return;

            const { baseColor, accentColor, isDark } = getThemeColors();
            const time = (Date.now() - startTimeRef.current) / 1000;

            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
            gl.uniform1f(timeLocation, time);
            gl.uniform3f(baseColorLocation, ...baseColor);
            gl.uniform3f(accentColorLocation, ...accentColor);
            gl.uniform1f(isDarkLocation, isDark ? 1.0 : 0.0);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            animationFrameRef.current = requestAnimationFrame(render);
        };

        render();

        // Pause when tab is inactive
        const handleVisibilityChange = () => {
            isActive = !document.hidden;
            if (isActive) {
                startTimeRef.current = Date.now() - (startTimeRef.current % 1000000);
                render();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Cleanup
        return () => {
            isActive = false;
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener("resize", resize);
            document.removeEventListener("visibilitychange", handleVisibilityChange);

            if (gl && programRef.current) {
                gl.deleteProgram(programRef.current);
            }
        };
    }, [theme, systemTheme]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ mixBlendMode: "normal" }}
        />
    );
};
