/* eslint-disable react-hooks/exhaustive-deps */

import { Stack, Typography, ListItem, List, ListItemAvatar, Avatar, ListItemText, ListItemButton, Button, IconButton } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { disabledUserNotification, getUserByFirebaseId, watchedUserNotification } from '../../redux/features/users/usersGetSlice';
import SideBar from '../SideBar/SideBar';
import style from './notification.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { DateTime } from "luxon";
import { useAuth } from "../../context/";

const Notification = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.users.currentUser);
    const userNotification = useSelector((state)=> state.users.userNotifications);
    const { userFirebase } = useAuth();

    useEffect(()=> {
        dispatch(getUserByFirebaseId(userFirebase.uid))
     },[]);

   const handleWatched = () => {
       if(userNotification){
           userNotification.forEach((el)=>{
               dispatch(watchedUserNotification(el.id))
           });
       };
   };

   const handleDelete = () => {
       if(userNotification){
           userNotification.forEach((el)=> {
               dispatch(disabledUserNotification(el.id))
           });
       };
   };

    
  return (
 <>
    <div className={style.divContainer}>
    <Stack direction="row">
    <div className={style.background}></div>
    <div style={{ minWidth: "266px"  }}>
    <SideBar />
    </div>
    <div className={style.container}>
        <Typography
         variant="h2"
         component="h1"
         sx={{ fontWeight: "600", color: "white", paddingTop: "20px" }}
        >
        Notifications.
        </Typography>
        <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            sx={{ marginTop: "13px" }}
          >
        <div className={style.containerDescription}>
            <>
        {
            userNotification.length > 0 ? (
                     userNotification?.map((user)=> {
                      //console.log("user", user)
                    let data = JSON.parse(user?.title)
                    //console.log("data", data);
                    return (
                        <>
                        
                          <List 
                            key={user.id} 
                            className={style.list} 
                            sx={{width: '100%'}}>
                            <ListItemButton
                            >
                            <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar sx={{ width: 54, height: 54 }}
                            alt="avatar.." 
                            src={data?.img} />
                             </ListItemAvatar>
                             <ListItemText
                               component="div"
                                primary={
                               <>     
                                <Typography
                                   sx={{ display: 'inline', fontSize: 18, fontWeight: 800, marginLeft: 2 }}
                                   component="p"
                                   variant="body2"
                                   color="#9e9e9e"
                                   >
                                   {data?.name} {!user.watched ? '' : <span className={style.watched}>watched</span> }
                                   </Typography>
                               </>
                                       }
   
                                secondary={
                               <>
                                   <Typography
                                    sx={{ display: 'inline', fontSize: 16,  fontWeight: 550, marginLeft: 2 }}
                                       component="span"
                                       variant="subtitle1"
                                       color="#757575"
                                       spacing={2}>

                                       {data?.post}: <Link to={user.content}>
                                       <Button  href="#text-buttons" variant='outlined' sx={{ padding:0, margin:0, color: '#c4c4c4', fontSize: 12, fontWeight: 20, }} onClick={()=> handleWatched()}>Post</Button>
                                       </Link>

                                   </Typography>
                                   <Stack direction="row">
                                   <IconButton aria-label="delete" size="large" color="primary" sx={{ marginLeft: 150, color: 'white' }} onClick={()=> handleDelete()}>
                                      <DeleteIcon fontSize="inherit"/>
                                    </IconButton>
                                     </Stack>
                                   <Typography 
                                    sx={{ display: 'inline', fontSize: 13, marginLeft: 150 }}
                                   component="span"
                                   variant="body2"
                                   color="#757575" >

                                   {DateTime.fromISO(user.date).toFormat('ff')} 
                                   
                                   </Typography>
                                   
                                         
                               </>
                                           }
                            /> 
                            
                           </ListItem>
                           </ListItemButton>
                           </List>
                           </>
                           )
                        })) : (<div className={style.divNotNotification}><h2>You don't have any notification.</h2></div> )

          }
        </>
       </div>
       </Stack>
    </div>
    </Stack>
    </div>
 </>
  )
}

export default Notification;