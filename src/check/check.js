import * as React from 'react';
import { useState,useEffect,useRef,useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import Forward5Icon from '@mui/icons-material/Forward5';
import Replay5Icon from '@mui/icons-material/Replay5';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import DataContext from '../HomePage/Home';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import "../check/check.css";
import axios from 'axios';
import Popover from '@mui/material/Popover';
import { ToastContainer, toast } from 'react-toastify';


const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 215,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(179, 129, 255, 0.39)' : 'rgba(179, 129, 255, 0.39)',
  backdropFilter: 'blur(40px)',
}));

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});


export default function MusicPlayerSlider({value}) {
    const theme = useTheme();
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [position, setPosition] = useState(32);
    const [paused, setPaused] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [duration, setDuration] = useState(0);
    const[songInfo, setSongInfo]=useState([]);
    const[oneSongInfo,setOneSongInfo]=useState([]);
    const sName = value.songName;
    const[url,setUrl]=useState("");
    
    useEffect(() => {
      FetchAudio();
    }, [sName]);
   
    const SongDetails = () => {
      axios
        .get("https://localhost:7049/api/Audio")
        .then((response) => {
          setSongInfo(response.data);
          // console.log("info of the song:", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    useEffect(() => {
      SongDetails();
    }, []);
  
    useEffect(() => {
      // Find the data when songInfo or sName changes
      const SongDetail = songInfo.find((item) => item.songName === sName);
      setOneSongInfo(SongDetail); 
      // console.log("found data :", SongDetail);
      console.log("songdetail: ", oneSongInfo);
    }, [sName]);


    const FetchAudio = () => {
      setUrl(value.imageURL);
      setPaused(false);
       // Replace this with the appropriate song name from the API
      fetch(`https://localhost:7049/api/Audio/${sName}.mp3`)
        .then((response) => response.blob())
        .then((blob) => {
          setAudioBlob(blob);
        })
        .catch((error) => console.error('Error fetching audio:', error));
    };

    
    const sample=(e)=>{
        const audio = audioRef.current;
        audio.currentTime = e.target.value;
            const check= (_, value) => (setPosition(value)
            );
            setCurrentTime(e.target.value);
            setDuration(audioRef.current.duration);
    }  

    useEffect(() => {
      if (audioBlob) {
        const audio = audioRef.current;
        audio.src = URL.createObjectURL(audioBlob);
        // setCurrentTime(audioRef.current.currentTime);
        // Play audio
        audio.play().then(() => setIsPlaying(true)).catch((error) => console.error('Error playing audio:', error));
      }

    }, [audioBlob]);

    const[currentTime,setCurrentTime]=useState(0);
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      }
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
      };
      const handlePlay=()=>{
        
        const audio = audioRef.current;
        if(!isPlaying){
            audio.play();
        }
        setIsPlaying(!isPlaying);
        // alert(isPlaying);
      }
    
      const handlePause=()=>{
        
        const audio=audioRef.current;
        if(isPlaying){
            audio.pause();
        }
        // alert(isPlaying);
        setIsPlaying(false);
      }

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = Math.floor(value - minute * 60);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
      }
      const plustime = () => {
        if (currentTime) {
          const audio = audioRef.current;
          if (audio.currentTime + 5 < audio.duration) {
            audio.currentTime += 5;
            setCurrentTime(audio.currentTime);
          }
        }
      };


      const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


      const minustime = () => {
        if (currentTime) {
          const audio = audioRef.current;
          if (audio.currentTime - 5 > 0) {
            audio.currentTime -= 5;
            setCurrentTime(audio.currentTime);
          }
        }
      };
      const [volume, setVolume] = useState(100);
      // Function to handle the volume change
      const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        if (audioRef.current) {
          audioRef.current.volume = newValue / 100;
        }
      };
    
      useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = volume / 100;
        }
      }, [volume]);
    
    const mainIconColor = theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : '#fff';
    const lightIconColor = theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.4)';
  
  return (
    <div className='Music'>
    <ToastContainer/>
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Widget>
        <Box sx={{ display: 'flex'}}>
          <Box sx={{ ml: 1.5, minWidth: 0,}}>
          <InfoOutlinedIcon aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose} sx={{float:'right',marginLeft:'15px'}}/>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
         opacity:0.9
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {oneSongInfo?(
          <div>
        <Typography sx={{ p: 1 }} >Album:{oneSongInfo.album}</Typography>
        <Typography sx={{ p: 1 }} >Year:{oneSongInfo.year}</Typography>
        <Typography sx={{ p: 1 }} >Composer:{oneSongInfo.composers}</Typography>
        </div>
        ):(
        <div>
        <Typography  sx={{ p: 1 }}> No information available at the moment</Typography>
        </div>)}
          </Popover>
          {/* <br></br> */}
              <img src={url}  width={140} height={120} style={{marginLeft:23}}/>
              
            <Typography sx={{marginLeft:-2}}>
              <b>{sName}</b>
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={currentTime}
          min={0}
          step={1}
          max={duration}
          // onClick={sample}
          onChange={sample}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(currentTime)}</TinyText>
          <TinyText>-{formatDuration(duration - currentTime)}</TinyText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song">
            <Replay5Icon fontSize="large" onClick={minustime} htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: '3rem' }}
                htmlColor={mainIconColor}
                onClick={handlePlay}
              />
            ) : (
              <PauseRounded onClick={handlePause} sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <Forward5Icon fontSize="large" onClick={plustime} htmlColor={mainIconColor} />
          </IconButton>
        </Box>
        <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
        aria-label="Volume"
        value={volume}
        onChange={handleVolumeChange}
        sx={{
          color: "#fff",
          '& .MuiSlider-track': {
            border: "none",
          },
          '& .MuiSlider-thumb': {
            width: 24,
            height: 24,
            backgroundColor: "#fff",
            '&:before': {
              boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
            },
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
              boxShadow: "none",
            },
          },
        }}
      />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack>
      </Widget>
      <audio ref={audioRef} 
      onTimeUpdate={handleTimeUpdate}
    //   onLoadedMetadata={handleLoadedMetadata}
    />
    </Box>
    </div>
  );
}
