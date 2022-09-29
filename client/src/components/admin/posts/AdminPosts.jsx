import { Box } from '@mui/material'
import React, { useState } from 'react'
import style from "./adminPosts.module.css"
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postsReported } from '../../../redux/features/post/postGetSlice';
import { Arrow } from '../../componentsIcons';
import { useNavigate } from 'react-router-dom';
import Post from "../../post/Post"


const AdminPosts = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(postsReported())
  }, [dispatch])

  const posts = useSelector(state => state.posts.reportedPosts)
  const [activeStep, setActiveStep] = useState(0);
  const [postSelected, setPostSelected] = useState({})
  const navigate = useNavigate()
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  

  
  return (
  <Box className={style.adminPostsContainer}>
    <Button onClick={() => navigate("/admin")} className={style.arrow}><Arrow/></Button>
    <Box className={style.divMobileStepper}>
        <MobileStepper 
      variant="dots"
      steps={6}
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      className={style.carousel}
      nextButton={
        <Button sx={{color: "black", fontWeight:"600"}} size="small" onClick={handleNext} disabled={activeStep === 5}>
          Next
          <KeyboardArrowRight/>
        </Button>
      }
      backButton={
        <Button sx={{color: "black", fontWeight:"600"}} size="small" onClick={handleBack} disabled={activeStep === 0}>
          <KeyboardArrowLeft/>
          Back
        </Button>
      }
    /></Box>
    <Box className={style.postsContainer}>
      <Box className={style.postsDiv}>
        {typeof posts === "string"? <h1>NotFound</h1> : posts?.map((post, i) => <Post key={i} post={post} comments={false} />)}
      </Box>
    </Box>
    </Box>
  )
}

export default AdminPosts