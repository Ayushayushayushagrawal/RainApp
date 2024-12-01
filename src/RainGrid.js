import React, { useState, useEffect } from 'react';

const RainGrid = ({ rows, cols }) => {
    const [streams, setStreams] = useState([]);
    const [currentColor, setCurrentColor] = useState('#00ff00');

    const colors = ['#00ff00', '#0000ff', '#ff0000', '#800080', '#00ffff', '#ff00ff', '#ffff00'];

    useEffect(() => {
        // Color change interval
        const colorInterval = setInterval(() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setCurrentColor(randomColor);
        }, 5000); // 5 seconds

        return () => clearInterval(colorInterval);
    }, []);

    useEffect(() => {
        // Initialize streams for each column
        setStreams(Array(cols).fill(null).map((_, index) => ({
            col: index,
            active: Math.random() < 0.5,
            head: -Math.floor(Math.random() * 5),
            length: Math.floor(Math.random() * 5) + 3,
            speed: Math.random() * 0.5 + 0.5
        })));
    }, [cols]);

    useEffect(() => {
        const interval = setInterval(() => {
            setStreams(prevStreams => {
                return prevStreams.map(stream => {
                    // Update stream position
                    let newHead = stream.head + stream.speed;
                    
                    // Reset stream when it goes off screen
                    if (newHead - stream.length > rows) {
                        return {
                            ...stream,
                            head: -Math.floor(Math.random() * 5),
                            length: Math.floor(Math.random() * 5) + 3,
                            active: Math.random() < 0.8,
                            speed: Math.random() * 0.5 + 0.5
                        };
                    }

                    return {
                        ...stream,
                        head: newHead
                    };
                });
            });
        }, 50);

        return () => clearInterval(interval);
    }, [rows]);

    return (
        <div style={{
            position: 'relative',
            width: cols * 20,
            height: rows * 20,
            backgroundColor: '#000',
            padding: '10px'
        }}>
            {streams.map((stream, streamIndex) => (
                stream.active && [...Array(stream.length)].map((_, i) => {
                    const yPos = Math.floor(stream.head) - i;
                    if (yPos >= 0 && yPos < rows) {
                        return (
                            <div
                                key={`${streamIndex}-${i}`}
                                style={{
                                    position: 'absolute',
                                    left: stream.col * 20,
                                    top: yPos * 20,
                                    width: '20px',
                                    height: '20px',

                                    backgroundColor: currentColor,
                                    opacity: i === 0 ? 1 : (1 - i / stream.length) * 0.8,


                                    boxShadow: i === 0 ? `0 0 8px ${currentColor}` : 'none',
                                    transition: 'all 0.05s linear'
                                }}
                            />
                        );
                    }
                    return null;
                })
            ))}
        </div>
    );
};

export default RainGrid;
