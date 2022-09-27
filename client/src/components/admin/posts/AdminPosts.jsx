import { Box } from '@mui/material'
import React from 'react'
import style from "./adminPosts.module.css"
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


const AdminPosts = () => {
    
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  return (
  <Box className={style.adminPostsContainer}>
    <Box className={style.divMobileStepper}>
        <MobileStepper 
      variant="dots"
      position={"top"}
      steps={6}
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      className={style.carousel}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
          Next
          {/* {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )} */}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
         {/*  {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}*/}
          Back 
        </Button>
      }
    /></Box>


    </Box>
  )
}

export default AdminPosts