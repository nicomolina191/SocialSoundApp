import * as React from 'react';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { MenuItem, Select, OutlinedInput, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import s from './Upload.module.css'
import { storage } from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'


export default function Upload() {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [postData, setPostData] = React.useState({
        title: '',
        description: '',
        content: '',
        cover: null,
        type: '',
        genres: []
    })

    const uploadFile = (file) => {
      setLoading(true)
      const fileRef = ref(storage, `cover/${file.name + Math.random()}`)
      return uploadBytes(fileRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref)
      })
      .then((url) => {
        setLoading(false)
        return url
      })
      .catch(err => console.log(err))
    }

    const uploadMusic = (file) => {
      setLoading(true)
      const fileRef = ref(storage, `content/${file.name + Math.random()}`)
      return uploadBytes(fileRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref)
      })
      .then((url) => {
        setLoading(false)
        return url
      })
    }

    const handleChange = async (event) => {
        const {
          target: { value, name },
        } = event;
        name === 'cover'
        ? setPostData({...postData, [name]: await uploadFile(event.target.files[0])})
          : name === 'content'
          ? setPostData({...postData, [name]: await uploadMusic(event.target.files[0]), type: event.target.files[0].type.split('/')[0]}) 
            : name === 'genres'
            ? setPostData({...postData,
            genres: typeof value === 'string' ? value.split(',') : value,
            })
              : setPostData({...postData, [name]: value})
    };

    async function handleSubmit(e){
      e.preventDefault()
      
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        mode: 'dark'
        },
    },
    };

    const genres = ["Blues","Classic Rock","Country","Dance","Disco","Funk","Grunge",
    "Hip-Hop","Jazz","Metal","New Age","Oldies","Other","Pop","R&B",
    "Rap","Reggae","Rock","Techno","Industrial","Alternative"]

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>New Post...</Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"New Post"}</DialogTitle>
            <form onSubmit={(e)=>handleSubmit(e)}>

                <DialogContent className={s.content} id='content'>
                    <ul className={s.formInputs}>
                        <li><TextField required value={postData.title} name='title' onChange={handleChange} id="standard-basic" label="Song name" variant="standard" /></li>
                        <li><TextField required value={postData.description} name='description' onChange={handleChange} id="outlined-multiline-static" label="Add a description" multiline rows={8}/></li>
                        <li>
                            <Select className={s.selectGenres} name="genres" multiple displayEmpty value={postData.genres} onChange={handleChange} input={<OutlinedInput />} renderValue={(selected) => {
                                if (selected.length === 0) {
                                return <em>Select Genres</em>;
                                }
                                return selected.join(', ')}}
                                MenuProps={MenuProps}
                                inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem disabled value=""><em>Placeholder</em></MenuItem>
                                {genres.map((genre) => (
                                    <MenuItem key={genre}value={genre}>{genre}</MenuItem>
                                  ))}
                            </Select>
                        </li>
                        <li>Upload a cover for your song<input disabled={loading} onChange={(e) => handleChange(e)} type="file" accept='image/*' name="cover"/></li>
                        <li>Upload a Song<input disabled={loading} onChange={(e)=>handleChange(e)} type="file" name="content" accept='audio/mp3, video/mp4'/> </li>
                    </ul>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleClose}>Cancel</Button>
                <input disabled={!postData.title || !postData.cover || !postData.content || loading} type="submit" value="Post"/>
                </DialogActions>
                                    {console.log(postData)}
            </form>
      </Dialog>
    </div>
  );
}


