import React, { useEffect, useState } from "react";
import "../HomePage/Home.css";
import MusicPlayerSlider from "../check/check";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { Button, Grid } from "@mui/material";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import DataContext from "../DataContext";
import { useLocation } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Audio } from 'react-loader-spinner';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
    const [songDetails, setSongDetails] = useState([]);
    const [name, setName] = useState([]);
    const [playlistNames, setPlaylistNames] = useState([]);
    const [uPlaylistName, setUPlaylistName] = useState('');
    const DataContext = React.createContext();
    const [viewSongs, setViewSongs] = useState(true);
    const [searchTerm, setSearchSong] = useState('');
    const [data, setSong] = useState([]);
    const [viewPlaylistSongs, setViewPlaylistSongs] = useState(false);
    const [isClick, setClick] = useState(false);
    // const UName=props.value;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const UserID = searchParams.get("ID");

    useEffect(() => {
        getData();
        fetchSong();
    }, []);

    const fetchSong = async () => {
        try {
            const response = await axios.get('https://localhost:7049/api/Audio');
            setSong(response.data); // Assuming the API returns an array of objects
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleInputChange = (event) => {
        setSearchSong(event.target.value);
    };
    const filteredData = data.filter((item) =>
  (item.songName?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
  (item.composers?.join(', ')?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
  (item.album?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
);






    const getData = () => {
        console.log("name is " + UserID);
        axios
            .get("https://localhost:7049/api/Songs")
            .then((response) => {
                setSongDetails(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const[deletePlaylistId,setDeletePlaylistId]=useState('');
    const [open3, setOpen3] = React.useState(false);

    const handleOpen3 = ({sPlaylistData}) => {

        setDeletePlaylistId(sPlaylistData[0].playlist);
        setOpen3(true)

    };

        const handleClose3= () => setOpen3(false);

        const Delete=()=>{
            console.log("the id of the paylist to delete is "+sPlaylistData[0].playlist);
            axios.delete(`https://localhost:7049/api/Playlists/${deletePlaylistId}`)
            .then((resp)=>{
                toast.success(sPlaylistData[0].playlistName+" is Deleted Successfully!");
                goBack();
                setOpen3(false);
            })
            .catch((err)=>{
                console.error(err);
            })
        }



    const[addStoPlaylist,setAddStoPlaylist]=useState([]);
    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = ({songItem}) => {
        setOpen1(true);
        setAddStoPlaylist(songItem);
    };
    const handleClose1 = () => setOpen1(false);

    const AddtoPlaylist=({PlaylistsName})=>{
        console.log("playlistId is "+PlaylistsName.playlistId)
        const AddingData={
            "playlistId":PlaylistsName.playlistId,
            "songId":addStoPlaylist.songId
        };

        axios.post("https://localhost:7049/api/PlaylistTracks",AddingData)
        .then((res)=>{
            toast.success("added");
            handleClose1();
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    const CreatePlaylist = () => {
        const playlistData = {
            "playlistName": uPlaylistName,
            "userId": UserID
        };
        axios.post("https://localhost:7049/api/Playlists", playlistData)
            .then((resp) => {
                // console.log(resp.data);
                toast.success("Created a Playlist");
                handleClose();
                setUPlaylistName("");
            })
            .catch((err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        getPlaylist();
    }, [playlistNames]);

    const getPlaylist = () => {

        // console.log("id is " + UserID)
        axios.get(`https://localhost:7049/api/Playlistnames?id=${UserID}`)
            .then((response) => {
                setPlaylistNames(response.data);
                // console.log("playlist name: "+playlistNames.userName);
                // console.log("hello from response")
            })
            .catch((err) => {
                // console.log("hii")
                console.error(err);
            })
    }

    const [sPlaylistData, setSPlaylistData] = useState([]);

    const sendPlaylistData = async ({ PlaylistsName }) => {
        setViewSongs(false);
        setState(false);
        // viewPlaylistSongs(true);
        console.log(PlaylistsName);
        const selectedPlaylistID = PlaylistsName.playlistId;
        console.log("id of the playlist is" + selectedPlaylistID);
        try {
            const response1 = await fetch(
                `https://localhost:7049/api/PlaylistDetails/${selectedPlaylistID}`
            );
            const data = await response1.json();
            console.log("playlist data", data);
            setSPlaylistData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const sendSong1=({songItem})=>{
        setSearchSong("");
        const SendingInformation=songDetails.find((item)=>item.songName===songItem.songName);
        // console.log(SendingInformation.imageURL);
        setName(SendingInformation);
    }
    const sendSong = ({ songItem }) => {
        setName(songItem);
        //   console.log(name.songName);
        //   console.log("URL "+name.imageURL);
    };

    const[removingSDetail,setRemovingSdetail]=useState([]);
    const [removingFinal,setRemovingFinal]=useState([]);

    useEffect(()=>{
        RemInfo();
    },[removingSDetail]);

    const RemInfo=()=>{
          axios.get("https://localhost:7049/api/PlaylistTracks")
          .then((resp)=>{
            setRemovingSdetail(resp.data);
          })

          .catch((err)=>{
            console.error(err);
          })
          
        //   console.log("Hello "+removingSDetail);
    };

    const RemoveSong = async ({ songItem }) => {
        const rSongId = songItem.songid;
        const rPlaylistId = songItem.playlist;
        console.log("song id is : " + rSongId);
        console.log("playlist id is : " + rPlaylistId);
          

          // Move the code that depends on the fetched data inside the await block
          const removingSInfo = removingSDetail.find((item1) => item1.songId === rSongId && item1.playlistId === rPlaylistId);
        //   console.log("hii "+removingSInfo.songId)
      
          if (removingSInfo) {
            setRemovingFinal(removingSInfo);
            console.log("the id of the song to be removed is " + removingSInfo.id);
      
            await axios.delete(`https://localhost:7049/api/PlaylistTracks/${removingSInfo.id}`)
            .then((res)=>{
                toast.success("Song removed from " + sPlaylistData[0].playlistName);
                
            })
            .catch((err)=>{
                console.error(err);
            })
            
          } 
      };
      


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px'
    };

    const goBack=()=>{
        setViewSongs(true);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl(null);
  };

  const handleLogout=()=>{
    window.location.replace("/");
  }

  const open2 = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

    const style1={position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white !important", // Add !important to override any conflicting styles
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
    p: 4,
    borderRadius: "10px",};



    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 145, 1)' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const [state, setState] = React.useState(false);

    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    return (
    <div className="All">
         <ToastContainer />
        <div>

            <div className="overview">
                <TextField
                    type="text"
                    placeholder="Search by song/album/composers..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    InputProps={{
                    startAdornment: <SearchIcon />,
                    style: { color: "white" }, // Set the color of the placeholder text to white
                    }}
                    sx={{ backdropFilter: 'blur(70px)', width: '60%', marginTop: "30px", marginLeft: -20,zIndex:1 }}
                />
                <div style={{display:'flex'}}>
                    <div className="search">
                        {searchTerm && (
                            <ul className="search-results" style={{ listStyleType: 'none', padding: 0 }}>
                                <Stack>
                                    {filteredData.map((item) => (
                                    <div key={item.id} style={{ marginBottom: '0px'}}>
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: 'rgba(0, 0, 60, 0.93)', width: '60%',marginLeft:-180 }}
                                            onClick={() => sendSong1({ songItem: item })}
                                        >
                                            {item.songName} {/* Make sure to use the correct property for the song name */}
                                        </Button>
                                    </div>
                                    ))}
                                </Stack>
                            </ul>
                        )}
                    </div>

                    <div>
                        <div>
                        {['left'].map((anchor) => (
                        <React.Fragment key={anchor}>
                            <Button onClick={toggleDrawer(anchor, true)}>

                                <IconButton onClick={handleClick2} >
                                    <Avatar sx={{ backgroundColor: 'rgba(0, 0, 140, 0.93)',marginLeft:38,marginTop:-10, width: 45, height: 45,position:'fixed' }}></Avatar>
                                </IconButton>
                            </Button>
                            <Drawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                                className="drawer"
                                >
                                    <div className="playlist-container">
                                    <h1 style={{fontFamily: 'monospace'}}>Your Playlists
                                    <br></br>
                                        <IconButton onClick={handleOpen} className="tooltip" sx={{ml:21}}>

                                            <AddIcon sx={{color:'white'}} />
                                                <span className="tooltiptext">Create a Playlist</span>
                                        </IconButton></h1>

                                        <Modal
                                         open={open}
                                         onClose={handleClose}
                                         aria-labelledby="modal-modal-title"
                                         aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <IconButton onClick={handleClose} sx={{ float: 'right' }} >
                                                    <CloseIcon />
                                                </IconButton>
                                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
                                                    Enter a name for your Playlist
                                                </Typography>
                                                <TextField
                                                id="outlined-basic"
                                                label="Playlist Name"
                                                variant="filled"
                                                sx={{ margin: '5%', marginLeft: '23%' }}
                                                value={uPlaylistName}
                                                onChange={(e) => setUPlaylistName(e.target.value)} />
                                                <Button sx={{ margin: '1%', marginLeft: '38%' }} variant="contained" onClick={CreatePlaylist}>
                                                    Create
                                                </Button>
                                            </Box>
                                        </Modal>
                                        <Stack sx={{paddingBottom:25}}>
                                            {playlistNames &&
                                            playlistNames.map((PlaylistsName,index) => (
                                            <Button
                                                key={index}
                                                variant="contained"
                                                sx={{ width: '75%', marginLeft: '10%', marginTop: '5%', opacity: 0.7, fontFamily: 'monospace' }}
                                                onClick={() => sendPlaylistData({ PlaylistsName })}
                                            >
                                                {PlaylistsName.playlist}
                                            </Button>
                                            ))}
                                        </Stack>
                                        <Divider style={{height:1,marginTop:15,backgroundColor:'white'}}/>
                                        <Button
                                        variant="contained"
                                        
                                        sx={{color:'white',backgroundColor:'brown',marginTop:'50px',marginLeft:6}}
                                        onClick={handleLogout}
                                        >
                                            Log Out
                                        </Button>
                                        <Divider/>

                                    </div>

                                    <Divider/>
            
                                

                            </Drawer>
                        </React.Fragment>))}
                        </div>
                    </div>

                </div>
            </div>
        </div>

            <div className="overall-container">

                {viewSongs && (<div className="song-container">
                <Box className="musics" sx={{ width: '80%' }}>
                        <Grid container spacing={3}>
                            {songDetails.map((songItem, index) => (
                                <Grid key={index} className="grid" item xs={3}>
                                  <Card className="card" sx={{ width: 170, marginTop: "2%", marginBottom: 1, display: "flex", backgroundColor: 'rgba(147, 42, 204, 0.42)', color: 'white', height:230 }}>

                                    <Button onClick={() => sendSong({ songItem })} sx={{width:250,marginLeft:0,marginRight:-2,marginTop:-15,marginBottom:-5}} >
                                        <CardActionArea>
                                                <CardMedia
                                                    sx={{ height: 140,width:170,marginTop:6.6,marginLeft:-1 }}
                                                    image={songItem.imageURL}
                                                // title="green iguana"
                                                />
                                                <CardContent>
                                                    <Typography className="btnandtext" sx={{ fontWeight: 'bolder', fontFamily: 'monospace',color:'white' }} gutterBottom component="div">
                                                        {songItem.songName}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary"></Typography>
                                                </CardContent>
                                            </CardActionArea>

                                    </Button>
                                    <br></br>
                                    
                                    <IconButton onClick={()=>handleOpen1({songItem})}  sx={{ marginTop: 25 }}>
                                        <AddIcon sx={{color:'white'}}/>
                                    </IconButton>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </div>)}
                <Modal
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style1}>
                        <IconButton onClick={handleClose1} sx={{ float: "right" }}>
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ textAlign: "center" }}
                        >
                        Select the Playlist to add the song:

                        </Typography>
                        <Stack sx={{ marginTop: '5%' }}>
                            {playlistNames.map((PlaylistsName, index) => (

                                <Button key={index}
                                    variant="contained"
                                    sx={{ width: '75%', marginLeft: '10%', marginTop: '5%',padding:'3%' }}
                                    onClick={()=>AddtoPlaylist({PlaylistsName})}
                                >
                                    {PlaylistsName.playlist}
                                </Button>

                            ))}
                        </Stack>
                    </Box>
                </Modal>

                {!viewSongs && sPlaylistData && sPlaylistData.length > 0 &&<div className="song-container">
                    <IconButton  onClick={goBack}>
                    <ArrowBackIcon sx={{color:'white',marginRight:74,position:'fixed'}}/>
                    </IconButton>
                    <IconButton onClick={()=>handleOpen3({sPlaylistData})}>
                        <DeleteIcon sx={{color:'white',marginRight:-70}}/>
                    </IconButton>
                    <h1 style={{ marginRight: '150px', color: 'white', fontFamily: 'monospace', fontSize: '40px' }}>{sPlaylistData[0].playlistName}</h1>
                    <Box className="musics" sx={{ width: '80%' }}>
                        <Grid container spacing={2}>
                            {sPlaylistData.map((songItem, index) => (
                                <Grid key={index} className="grid" item xs={4}>

                                        <Card className="card" sx={{ width: 170, marginTop: "2%", marginBottom: 1, display: "flex", backgroundColor: 'rgba(147, 42, 204, 0.42)', color: 'white', height:230 }}>
                                        <IconButton onClick={() => sendSong({ songItem })} sx={{width:250,marginLeft:0,marginRight:-2,marginTop:-15,marginBottom:-5}} >
                                            <CardActionArea>
                                                <CardMedia
                                                    sx={{ height: 140,width:170,marginTop:6.6,marginLeft:-1 }}
                                                    image={songItem.imageURL}
                                                // title="green iguana"
                                                />
                                                <CardContent>
                                                    <Typography className="btnandtext" sx={{ fontWeight: 'bolder', fontFamily: 'monospace',color:'white',marginLeft:-3,width:160}} gutterBottom component="div">

                                                        {songItem.songName}

                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary"></Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            </IconButton>

                                        </Card>
                                        <IconButton onClick={()=>RemoveSong({songItem})}>
                                                <RemoveCircleOutlineIcon sx={{color:'white',marginLeft:-7}}/>
                                        </IconButton>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                </div>}
                <Modal
                    open={open3}
                    onClose={handleClose3}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style1}>
                        <IconButton onClick={handleClose3} sx={{ float: "right" }}>
                            <CloseIcon />
                        </IconButton>
                        <h2>Do you want to DELETE this Playlist</h2>
                        <Button variant="contained" color="error" onClick={Delete} sx={{marginLeft:18}}>
                            DELETE
                        </Button>

                    </Box>
                </Modal>





                {name && <div className="player-container">
                    {/* <h1 style={{fontFamily: 'monospace',fontSize:'37px'}}>Now Playing...</h1> */}
                    <div className="player">
                        {/* <DataContext.Provider value={name}> */}
                        <MusicPlayerSlider value={name} />
                        {/* </DataContext.Provider> */}
                    </div>
                </div>}
            </div>
            <Audio
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
            />
</div>
    )
}
export default Home;
