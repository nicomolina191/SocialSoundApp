import React from 'react'
import s from './SideBar.module.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logoicon.png'
import Upload from '../Upload/Upload'


const SideBar = () => {
  return (
        <div className={s.sidebar}>
            <ul className={s.routescontainer}>
                <img width='70px'  src={logo} />
                <li className={s.profileItem}><img className={s.profilePic} width='40px' src="https://png.pngitem.com/pimgs/s/678-6785829_my-account-instagram-profile-icon-hd-png-download.png"/> <button>...</button></li>
                <li className={s.routeItem}> <Link to='/home'>Home</Link> </li>
                <li className={s.routeItem}> <Link to='/home/explore'>Explore</Link> </li>
            </ul>
            <ul className={s.optionsContainer}>
                <h4 className={s.titleItem}>MY COLLECTION</h4>
                <li className={s.optionItem}> <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2563 3.23123C12.5979 2.92292 13.1519 2.92292 13.4936 3.23123L14.0354 3.72014C16.6549 6.08384 16.6549 9.91616 14.0354 12.2799L13.4936 12.7688C13.1519 13.0771 12.5979 13.0771 12.2563 12.7688C11.9146 12.4605 11.9146 11.9606 12.2563 11.6523L12.7981 11.1634C14.7342 9.41629 14.7342 6.58371 12.7981 4.83663L12.2563 4.34772C11.9146 4.03941 11.9146 3.53954 12.2563 3.23123Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.74375 12.7688C7.40207 13.0771 6.84811 13.0771 6.50644 12.7688L5.96462 12.2799C3.34513 9.91616 3.34513 6.08384 5.96462 3.72014L6.50644 3.23123C6.84811 2.92292 7.40207 2.92292 7.74375 3.23123C8.08542 3.53954 8.08542 4.03941 7.74375 4.34772L7.20193 4.83663C5.26578 6.58371 5.26578 9.41629 7.20192 11.1634L7.74375 11.6523C8.08542 11.9606 8.08542 12.4605 7.74375 12.7688Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1984 0.264394C15.4901 -0.057389 15.9967 -0.0899961 16.33 0.191564C21.2233 4.32532 21.2233 11.6747 16.33 15.8084C15.9967 16.09 15.4901 16.0574 15.1984 15.7356C14.9068 15.4138 14.9406 14.9247 15.2739 14.6432C19.437 11.1263 19.437 4.87371 15.2739 1.35684C14.9406 1.07528 14.9068 0.586177 15.1984 0.264394Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.80158 15.7356C4.50994 16.0574 4.00333 16.09 3.67003 15.8084C-1.22335 11.6747 -1.22334 4.32532 3.67003 0.191565C4.00333 -0.0899962 4.50994 -0.0573886 4.80158 0.264394C5.09322 0.586177 5.05944 1.07528 4.72614 1.35684C0.563021 4.8737 0.56302 11.1263 4.72614 14.6432C5.05944 14.9247 5.09322 15.4138 4.80158 15.7356Z" fill="white"/>
                    <path d="M11 8C11 8.55228 10.5523 9 10 9C9.44772 9 9 8.55228 9 8C9 7.44772 9.44772 7 10 7C10.5523 7 11 7.44772 11 8Z" fill="white"/>
                    </svg> Liked Songs </li>
                <li className={s.optionItem}> <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 1.5V14.5H18.5V1.5H1.5ZM1 0C0.447715 0 0 0.447715 0 1V15C0 15.5523 0.447716 16 1 16H19C19.5523 16 20 15.5523 20 15V1C20 0.447715 19.5523 0 19 0H1Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 8L8 4L8 12L14 8ZM11.2958 8L9.5 6.80278L9.5 9.19722L11.2958 8Z" fill="white"/>
                    </svg> Liked Music Videos </li>
            </ul>
            <ul className={s.optionsContainer}>
                <h4 className={s.titleItem}>ME</h4>
                <li className={s.optionItem}> <Upload/> </li>
            </ul>
        </div>
  )
}

export default SideBar