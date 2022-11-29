import React, { useState, useEffect } from "react"

const useAudio = (url) => {

    let bgMusic = new Audio(url)
    bgMusic.volume = .4
    bgMusic.loop = true

    const [audio] = useState(bgMusic)
    const [playing, setPlaying] = useState(false)

    const toggle = () => setPlaying(!playing)

    useEffect(() => {
        playing ? audio.play() : audio.pause()
    }, [playing])

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false))
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false))
        }
    }, [])

    return [playing, toggle]
}

const Player = ({ url }) => {
    const [playing, toggle] = useAudio(url)

    return (
        <div>
            <button onClick={toggle}>{playing ? "Pause Music" : "Play Music"}</button>
        </div>
    )
}

export default Player