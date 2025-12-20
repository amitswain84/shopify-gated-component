"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface FlickeringGridProps {
    squareSize?: number;
    gridGap?: number;
    flickerChance?: number;
    color?: string;
    width?: number;
    height?: number;
    className?: string;
    maxOpacity?: number;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
    squareSize = 4,
    gridGap = 6,
    flickerChance = 0.3,
    color = "rgb(0, 0, 0)",
    width,
    height,
    className,
    maxOpacity = 0.3,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [memoizedColor, setMemoizedColor] = useState(color);

    const setupCanvas = useCallback(
        (canvas: HTMLCanvasElement) => {
            const containerMaxWidth = containerRef.current?.clientWidth ?? 0;
            const containerMaxHeight = containerRef.current?.clientHeight ?? 0;

            // Use explicit width/height if provided, else fill container
            const canvasWidth = width || containerMaxWidth;
            const canvasHeight = height || containerMaxHeight;
            const dpr = window.devicePixelRatio || 1;

            canvas.width = canvasWidth * dpr;
            canvas.height = canvasHeight * dpr;
            canvas.style.width = `${canvasWidth}px`;
            canvas.style.height = `${canvasHeight}px`;

            const cols = Math.floor(canvasWidth / (squareSize + gridGap));
            const rows = Math.floor(canvasHeight / (squareSize + gridGap));

            const squares = new Float32Array(cols * rows);
            for (let i = 0; i < squares.length; i++) {
                squares[i] = Math.random() * maxOpacity;
            }

            return { cols, rows, squares, dpr };
        },
        [squareSize, gridGap, width, height, maxOpacity],
    );

    const updateSquares = useCallback(
        (squares: Float32Array, cols: number, rows: number) => {
            for (let i = 0; i < squares.length; i++) {
                if (Math.random() < flickerChance) {
                    squares[i] = Math.random() * maxOpacity;
                }
            }
        },
        [flickerChance, maxOpacity],
    );

    const drawGrid = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            width: number,
            height: number,
            cols: number,
            rows: number,
            squares: Float32Array,
            dpr: number,
        ) => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "transparent";
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const opacity = squares[i * rows + j];
                    ctx.fillStyle = `${memoizedColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`; // fast hex alpha

                    // Fallback if color isn't hex:
                    // ctx.globalAlpha = opacity;
                    // ctx.fillStyle = color;
                    // For now, assume color is passed as hex or implement proper parsing.
                    // But to be safe lets use globalAlpha and fillRect.

                    ctx.globalAlpha = opacity;
                    ctx.fillStyle = memoizedColor;
                    ctx.fillRect(
                        i * (squareSize + gridGap) * dpr,
                        j * (squareSize + gridGap) * dpr,
                        squareSize * dpr,
                        squareSize * dpr,
                    );
                }
            }
        },
        [memoizedColor, squareSize, gridGap],
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let gridParams: any; // Setup result

        const init = () => {
            gridParams = setupCanvas(canvas);
        };
        init();

        // Check visibility
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
        });
        if (containerRef.current) observer.observe(containerRef.current);

        // Color parsing... simplify to just use passed color string.
        setMemoizedColor(color);

        let lastTime = 0;
        const animate = (time: number) => {
            if (!isInView) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            const deltaTime = time - lastTime;
            // Cap at ~30fps or similar for performance? Or just run.
            // 0.05 flicker chance is essentially "update every 20 frames on avg".
            // Lets run update every frame but use chance.

            if (gridParams) {
                updateSquares(gridParams.squares, gridParams.cols, gridParams.rows);
                drawGrid(
                    ctx,
                    canvas.width,
                    canvas.height,
                    gridParams.cols,
                    gridParams.rows,
                    gridParams.squares,
                    gridParams.dpr,
                );
            }

            lastTime = time;
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        const handleResize = () => {
            init();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, [setupCanvas, updateSquares, drawGrid, width, height, isInView, color]);

    return (
        <div ref={containerRef} className={`w-full h-full ${className}`}>
            <canvas
                ref={canvasRef}
                className="pointer-events-none"
                style={{
                    width: width ? `${width}px` : "100%",
                    height: height ? `${height}px` : "100%",
                }}
            />
        </div>
    );
};
