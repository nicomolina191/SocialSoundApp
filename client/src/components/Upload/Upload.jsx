import * as React from 'react';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { MenuItem, Select, OutlinedInput, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import s from './Upload.module.css'
import { storage } from '../../firebase.js'
import { ref, uploadBytes } from 'firebase/storage'


export default function Upload() {
    const [open, setOpen] = React.useState(false);
    const [postData, setPostData] = React.useState({
        title: '',
        description: '',
        content: '',
        cover: null,
        type: '',
        genres: [],
        userId: 5
    })
    const uploadImage = () => {
      if(!postData.cover) return
      const coverRef = ref(storage, `images/${postData.cover.name + Math.random()}`)
      uploadBytes(coverRef, postData.cover).then(() => {
        alert('image uploaded')
      })

    }
    const handleChange = (event) => {
        const {
          target: { value, name },
        } = event;
        name === 'genres'
        ? setPostData({...postData,
          genres: typeof value === 'string' ? value.split(',') : value,
          })
        : name === 'cover'
         ? setPostData({...postData, [name]: event.target.files[0]})
         : setPostData({...postData, [name]: value})
     };
    const theme = useTheme('dark');
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
    const handleSubmit = (e) => {
      e.preventDefault()
    }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>New Post...</Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"New Post"}</DialogTitle>
            <form onSubmit={handleSubmit}>

                <DialogContent className={s.content} id='content'>
                    <ul className={s.formInputs}>
                        <li><TextField name='title' onChange={handleChange} id="standard-basic" label="Song name" variant="standard" /></li>
                        <li><TextField name='description' onChange={handleChange} id="outlined-multiline-static" label="Add a description" multiline rows={8}/></li>
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
                        <li><input onChange={handleChange} type="file" name="cover"/> <button onClick={uploadImage}>Confirm</button></li>
                    </ul>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose} autoFocus>Post</Button>
                </DialogActions>
                                    {console.log(postData)}
            </form>
      </Dialog>
    </div>
  );
}


