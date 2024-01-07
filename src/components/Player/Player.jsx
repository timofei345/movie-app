import { useState, useRef, useEffect } from "react";
import cn from "classnames";
import "./player.css";

import fullscreen from "./assets/fs.svg";
import play from "./assets/play.svg";
import stop from "./assets/stop.svg";
import setting from "./assets/setting.svg";
import volumeIcon from "./assets/volume.svg";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hideCenterBtn, setHideCenterBtn] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const videoRef = useRef(null);
    const playerContainerRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipTime, setTooltipTime] = useState("00:00");
    const [tooltipPosition, setTooltipPosition] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [subtitles, setSubtitles] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [showSubtitles, setShowSubtitles] = useState(false);

    const showTooltip = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const progressTime = (x / rect.width) * duration;
        const tooltipTimeFormatted = formatTime(progressTime);

        setTooltipVisible(true);
        setTooltipTime(tooltipTimeFormatted);
        setTooltipPosition(x);
    };

    const hideTooltip = () => {
        setTooltipVisible(false);
    };

    const seekToMousePosition = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newTime = (x / rect.width) * videoRef.current.duration;
        videoRef.current.currentTime = newTime;
    };
    const togglePlay = () => {
        const video = videoRef.current;
        if (video) {
            if (isPlaying) {
                setHideCenterBtn(false);
                video.pause();
            } else {
                setHideCenterBtn(true);
                video.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    const formatTime = (seconds) => {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, "0");

        return `${hh.toString().padStart(2, "0")}:${mm
            .toString()
            .padStart(2, "0")}:${ss}`;
    };

    const handleProgressChange = (e) => {
        const newProgress = e.target.value;
        videoRef.current.currentTime =
            (videoRef.current.duration / 100) * newProgress;
        setProgress(newProgress);
    };

    const toggleFullscreen = () => {
        const playerContainer = playerContainerRef.current;

        if (!document.fullscreenElement) {
            if (playerContainer.requestFullscreen) {
                playerContainer.requestFullscreen();
            } else if (playerContainer.webkitRequestFullscreen) {
                playerContainer.webkitRequestFullscreen();
            } else if (playerContainer.msRequestFullscreen) {
                playerContainer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };

    const parseVTT = (data) => {
        const lines = data.split("\n");
        const cues = [];
        let currentCue = null;

        for (const line of lines) {
            const timecodeMatch = line.match(
                /(\d{2}:\d{2}:\d{2}[.,]\d{3}) --> (\d{2}:\d{2}:\d{2}[.,]\d{3})/
            );
            if (timecodeMatch) {
                if (currentCue) cues.push(currentCue);
                currentCue = {
                    start: timecodeMatch[1],
                    end: timecodeMatch[2],
                    text: "",
                };
            } else if (
                line.trim() &&
                currentCue &&
                !line.trim().match(/^\d+$/)
            ) {
                if (currentCue.text) currentCue.text += "\n";
                currentCue.text += line.trim();
            }
        }

        if (currentCue) cues.push(currentCue);

        return cues;
    };

    useEffect(() => {
        const torrentId = JSON.parse(localStorage.getItem("movie")).magnet;
        const video = videoRef.current;
        const handleAddTorrent = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:3001/add-torrent",
                    { torrentId }
                );
                const videoUrl = response.data.url;

                video.src = videoUrl;
                video.load();
            } catch (error) {
                console.error("Ошибка при добавлении торрента:", error);
            }
        };

        const fetchSubtitles = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/subtitle/${encodeURIComponent(
                        torrentId
                    )}`
                );
                const parsedSubtitles = parseVTT(response.data); // You'll need a parser function for VTT format
                setSubtitles(parsedSubtitles);
            } catch (error) {
                console.error("Error fetching subtitles:", error);
            }
        };

        handleAddTorrent();
        fetchSubtitles();

        const updateProgress = () => {
            setProgress((video.currentTime / video.duration) * 100);
        };
        const updateTime = () => {
            setCurrentTime(video.currentTime);
            setDuration(video.duration);
        };
        const handleProgress = () => {
            if (video.buffered.length) {
                const bufferedEnd = video.buffered.end(
                    video.buffered.length - 1
                );
                const duration = video.duration;
                if (duration > 0) {
                    setBuffered((bufferedEnd / duration) * 100); // percentage of video that's been buffered
                }
            }
        };

        video.addEventListener("progress", handleProgress);
        video.addEventListener("timeupdate", updateProgress);
        video.addEventListener("timeupdate", updateTime);
        return () =>
            video.removeEventListener(
                "timeupdate",
                updateTime,
                updateProgress,
                handleProgress
            );
    }, [videoRef]);

    const getCurrentSubtitle = () => {
        const currentTime = videoRef.current?.currentTime; // Get the current time of the video
        if (!currentTime) return null;

        const result = subtitles.find(
            (sub) =>
                convertTimeToSeconds(sub.start) <= currentTime &&
                convertTimeToSeconds(sub.end) >= currentTime
        );

        return result;
    };

    const convertTimeToSeconds = (timeString) => {
        const [hours, minutes, seconds] = timeString.split(":");
        return (
            parseInt(hours) * 3600 +
            parseInt(minutes) * 60 +
            parseFloat(seconds)
        );
    };

    const sub = getCurrentSubtitle();

    return (
        <div className='player' ref={playerContainerRef}>
            <video preload='auto' ref={videoRef} onClick={togglePlay}></video>

            <img
                className={cn("play_center", { hide: hideCenterBtn })}
                onClick={togglePlay}
                src={isPlaying ? stop : play}
                alt='playBtn'
            />

            <div className='controls'>
                {showSubtitles && sub && (
                    <div className='subtitles'>{sub.text}</div>
                )}
                <div className='progress_main'>
                    {tooltipVisible && (
                        <div
                            className='tooltip'
                            style={{ left: `${tooltipPosition}px` }}
                        >
                            {tooltipTime}
                        </div>
                    )}
                    <div
                        className='progressed'
                        style={{ width: `${progress}%` }}
                    />
                    <div
                        className='buffered'
                        style={{ width: `${buffered}%` }}
                    />
                    <input
                        type='range'
                        min='0'
                        max='100'
                        value={progress}
                        onMouseMove={showTooltip}
                        onMouseLeave={hideTooltip}
                        onClick={seekToMousePosition}
                        onChange={handleProgressChange}
                        className='progress_bar'
                    />
                </div>
                <div className='control_left'>
                    <img
                        src={isPlaying ? stop : play}
                        className='play_btn'
                        onClick={togglePlay}
                    />
                    <div className='volume'>
                        <img src={volumeIcon} alt='' />
                        <input
                            type='range'
                            min='0'
                            max='1'
                            step='0.01'
                            value={volume}
                            onChange={handleVolumeChange}
                            className='volume_bar'
                        />
                    </div>
                    <div className='time'>
                        <div className='time_bar start'>
                            {formatTime(currentTime)}
                        </div>
                        /
                        <div className='time_bar end'>
                            {duration ? formatTime(duration) : "00:00:00"}
                        </div>
                    </div>
                </div>

                <div className='control_right'>
                    <img
                        src={setting}
                        alt=''
                        onClick={() => setShowSettings((prev) => !prev)}
                    />
                    <ul
                        className={cn("setting_block", {
                            setting_show: showSettings,
                        })}
                    >
                        <li
                            onClick={() => {
                                setShowSubtitles((prev) => !prev);
                            }}
                        >
                            Subtitles
                        </li>
                    </ul>
                    <img
                        src={fullscreen}
                        onClick={toggleFullscreen}
                        className='fullscreen_btn'
                    />
                </div>
            </div>
        </div>
    );
};
