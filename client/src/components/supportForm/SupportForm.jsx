import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import style from './supportForm.module.css'
import logo from '../../images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { getUserByFirebaseId } from '../../redux/features/users/usersGetSlice';
import { Link } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { useAuth } from '../../context';
import { Arrow } from '../componentsIcons';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SupportForm() {
    const dispatch = useDispatch()
    const [area, setArea] = useState('');
    const [detail, setDetail] = useState('');
    const user = useSelector(state => state.users.currentUser)
    const [open, setOpen] = React.useState(false);
    const { userFirebase } = useAuth();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        dispatch(getUserByFirebaseId(userFirebase.uid))
    }, [userFirebase])

    const handleSelectChange = (event) => {
        setArea(event.target.value);
    };

    const handleInputChange = (event) => {
        setDetail(event.target.value);
    };

    return (
        <Grid container direction="column" className={style.supportForm} p={`1%`} alignItems="center">
            <Grid item container pl={`2%`} className={style.back}>
                <Link to='/home'>
                    <Arrow />
                </Link>
            </Grid>
            <Grid item container className={style.supportLogo}>
                <img src={logo} alt="" width="854" height="276" />
            </Grid>
            <Grid item p={`4%`}>
                <Typography variant='h4' className={style.text}>
                    Did an error occur or do you want to leave us a suggestion?
                </Typography>
                <Typography variant='h4' className={style.text}>
                    Help us improve Social Sound.
                </Typography>
            </Grid>
            <Grid item className={style.form}>
                <form action="https://formsubmit.co/7209873a505fa805d588ba7a9486f6b9" method="POST">
                    <Grid container direction="column" spacing={2} alignItems="center">
                        <Grid item container>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Area</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    label="Area"
                                    value={area}
                                    onChange={handleSelectChange}
                                    className={style.select}
                                    name='Area'>

                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='Login'>Login</MenuItem>
                                    <MenuItem value='Sign up'>Sign up</MenuItem>
                                    <MenuItem value='Users'>Users</MenuItem>
                                    <MenuItem value='Audio/video upload'>Audio/video upload</MenuItem>
                                    <MenuItem value='Home'>Home</MenuItem>
                                    <MenuItem value='Posts'>Posts</MenuItem>
                                    <MenuItem value='Explore'>Explore</MenuItem>
                                    <MenuItem value='Filters'>Filters</MenuItem>
                                    <MenuItem value='Chat'>Chat</MenuItem>
                                    <MenuItem value='Premium'>Premium</MenuItem>
                                    <MenuItem value='Other'>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item className={style.input}>
                            <TextField id="standard-multiline-static" label="Details" variant="standard" multiline rows={6} className={style.input} name='detail' value={detail} onChange={handleInputChange} />
                        </Grid>
                        <div item style={{ display: 'none' }}>
                            <input name='name' value={user && user.name} />
                            <input name='plan' value={user && user.plan} />
                            <input name='email' value={user && user.email} />
                            <input name='username' value={user && user.username} />
                            <input type="hidden" name="_subject" value="Support Social Sound" />
                            <input type="hidden" name="_next" value="http://localhost:3000/support" />
                            <input type="hidden" name="_autoresponse" value="Your message was sent successfully!" />
                        </div>
                        <Grid item>
                            <Button variant="contained" type='submit' onClick={handleClick} className={style.send}>Send</Button>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    Your message was sent successfully!
                                </Alert>
                            </Snackbar>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}
