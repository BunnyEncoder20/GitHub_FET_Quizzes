import React, { useState, useEffect, useRef } from 'react'

const Timer = ({ duration, onTimeEnd }) => {

    const [Time, setTime] = useState(duration);
    const timerId = useRef();

    useEffect(() => {
        setTime(duration);

        timerId.current = setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    clearInterval(timerId.current);
                    onTimeEnd();
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerId.current);
    }, [duration, onTimeEnd])

    const formatTime = (time) => {
        const seconds = time % 60;
        return `00:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return (
        <>
            {formatTime(Time)}
        </>
    )
}

export default Timer