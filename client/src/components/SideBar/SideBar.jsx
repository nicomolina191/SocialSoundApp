import React from 'react'
import s from './SideBar.module.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logoicon.png'
import songs from '../../images/svg/songs.svg'
import videos from '../../images/svg/videos.svg'
import Upload from '../Upload/Upload'


const SideBar = () => {
  return (
    <div className={s.testcontainer}>
        <div className={s.filter}>
        <div className={s.sidebar}>
            <ul className={s.routescontainer}>
                <img width='70px'  src={logo} />
                <li className={s.profileItem}><img className={s.profilePic} width='40px' src="https://png.pngitem.com/pimgs/s/678-6785829_my-account-instagram-profile-icon-hd-png-download.png"/> <button>...</button></li>
                <li className={s.routeItem}> <Link to='/home'>Home</Link> </li>
                <li className={s.routeItem}> <Link to='/home'>Explore</Link> </li>
            </ul>
            <ul className={s.optionsContainer}>
                <h4 className={s.titleItem}>MY COLLECTION</h4>
                <li className={s.optionItem}> <img src={songs}/> Liked Songs </li>
                <li className={s.optionItem}> <img src={videos}/> Liked Music Videos </li>
            </ul>
            <ul className={s.optionsContainer}>
                <h4 className={s.titleItem}>ME</h4>
                <li className={s.optionItem}> <Upload/> </li>
            </ul>
        </div>
        </div>
    </div>
  )
}

export default SideBar