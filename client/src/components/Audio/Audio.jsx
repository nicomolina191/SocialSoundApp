import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import s from './Audio.module.css'
import './Player.css'

export default function Audio({song, artist}) {

  return (
    <div className={s.playerContainer}>
      <img src='https://bajao.pk/theme/images/default-square-dark.jpg' alt="not found" />  
      <div className={s.songInfo}>
        <h3>{song.title}</h3>
        <h4>{artist?.name}</h4>  
        <AudioPlayer
            style={{ borderRadius: "1rem"}}
            autoPlay={false}
            // layout="horizontal"
            src={song.content}
            onPlay={(e) => console.log("onPlay")}
            showSkipControls={false}
            showJumpControls={true}
        />
      </div>
    </div>
  );
}
