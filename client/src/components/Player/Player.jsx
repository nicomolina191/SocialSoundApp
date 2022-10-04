import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { togglePlay } from '../../redux/features/player/playerGetSlice';
import s from './Player.module.css';
import defaultImg from './default.png'
import { motion } from 'framer-motion/dist/framer-motion'
import Queue from './Queue/Queue';

function Player() {
  const dispatch = useDispatch();
  const isPlaying = useSelector(state => state.player.isPlaying);
  const tracks = useSelector(state => state.player.tracks);
  const playerRef = useRef();
  const location = useLocation();


  useEffect(() => {
    isPlaying ? playerRef.current.audio.current.play() : playerRef.current.audio.current.pause()
  }, [isPlaying]);

  const handlePlay = () => {
    !isPlaying && dispatch(togglePlay())
  };

  const handlePause = () => {
    isPlaying && dispatch(togglePlay())
  };

  const [musicTracks, setMusicTracks] = useState([])

  useEffect(() => {
    setMusicTracks(tracks)
    setTrackIndex(0)
  }, [tracks])

  const [trackIndex, setTrackIndex] = useState(0);

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
    );
  };

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0
    );
  };

  
  return (
    <div className={s.container}>
      {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/home/sucess' && !location.pathname.includes('admin') &&
        <motion.div
          drag
          dragConstraints={{top: -750,
          right: 1000,
          bottom: 0,
          left: 0}}
          className={location.pathname !== '/' ? s.playerContainer : s.playerNone}>
          <img src={musicTracks?.length && musicTracks[trackIndex]?.cover ? musicTracks[trackIndex].cover : defaultImg} alt="not found" />
          <div className={s.songInfo}>
            <Queue tracks={musicTracks} setTrackIndex={setTrackIndex} trackIndex={trackIndex}/>
            <h3>{musicTracks?.length ? musicTracks[trackIndex].title : ''}</h3>
            <AudioPlayer
              className='player-a'
              ref={playerRef}
              key={'23dg26ah21'}
              style={{ borderRadius: "1rem"}}
              autoPlay={isPlaying}
              src={musicTracks?.length && musicTracks[trackIndex].content}
              showSkipControls={true}
              showJumpControls={false}
              onClickPrevious={handleClickPrevious}
              onClickNext={handleClickNext}
              onPlay={handlePlay}
              onPause={handlePause}
            />
          </div>
      </motion.div>
      }
    </div>
  )
}

export default Player