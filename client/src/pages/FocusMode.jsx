import React, { useState, useEffect } from "react";
import { Sidebar, Alert } from "../components";

const FocusMode = () => {
    const [time, setTime] = useState(0); // Total elapsed time in seconds
    const [isPaused, setIsPaused] = useState(true);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [intervalId, setIntervalId] = useState(null); // Stores the interval ID

    const formatTime = (seconds) => {
        if (isNaN(seconds) || seconds < 0) return "0:00:00"; // Fallback

        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hrs}:${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const startTimer = () => {
        if (isPaused) {
            setIsPaused(false);
            const id = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
            setIntervalId(id); // Store the interval ID
        }
    };

    const pauseTimer = () => {
        setIsPaused(true);
        clearInterval(intervalId); // Stop the interval
        setIntervalId(null);
    };

    const resetTimer = () => {
        setTime(0);
        setIsPaused(true);
        clearInterval(intervalId);
        setIntervalId(null);
    };

    const enterFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen(); // Firefox
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(); // Safari
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen(); // IE/Edge
        }
    };

    const exitFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if (document.webkitFullscreenElement) {
            document.webkitExitFullscreen();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isFocusMode) {
                setIsFocusMode(false);
                exitFullscreen();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isFocusMode]);

    const toggleFocusMode = () => {
        if (!isFocusMode) {
            setIsFocusMode(true);
            enterFullscreen(); // Enter fullscreen
        } else {
            setIsFocusMode(false);
            exitFullscreen(); // Exit fullscreen
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-center p-8 gap-8">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Timer Display */}
                <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <div className="rounded-full border-8 border-blue-500 bg-blue-100 text-blue-700 text-4xl font-bold shadow-lg w-48 h-48 flex items-center justify-center">
                        {formatTime(time)}
                    </div>

                    {/* Controls */}
                    <div className="mt-4 flex gap-4 flex-wrap justify-center">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow focus:outline-none"
                            onClick={isPaused ? startTimer : pauseTimer}
                        >
                            {isPaused && time === 0 ? "Start" : isPaused ? "Resume" : "Pause"}
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow focus:outline-none"
                            onClick={resetTimer}
                        >
                            Reset
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow focus:outline-none"
                            onClick={toggleFocusMode}
                        >
                            {isFocusMode ? "Exit Focus Mode" : "Focus Mode"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Focus Mode Fullscreen */}
            {isFocusMode && (
                <div className="fixed inset-0 bg-gray-900 text-white flex flex-col items-center justify-center z-50 p-8">
                    <div className="text-6xl font-bold mb-8">{formatTime(time)}</div>
                    <div className="flex gap-6">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded shadow text-lg focus:outline-none"
                            onClick={isPaused ? startTimer : pauseTimer}
                        >
                            {isPaused ? "Resume" : "Pause"}
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded shadow text-lg focus:outline-none"
                            onClick={resetTimer}
                        >
                            Reset
                        </button>
                        <button
                            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded shadow text-lg focus:outline-none"
                            onClick={toggleFocusMode}
                        >
                            Exit Focus (ESC)
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default FocusMode;