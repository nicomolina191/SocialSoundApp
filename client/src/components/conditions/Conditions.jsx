import { Box } from "@mui/system";
import React from "react";
import style from "./conditions.module.css";

const Conditions = ({ showConditions, setShowConditions }) => {
  return (
    <Box
      onClick={() => setShowConditions(false)}
      className={style.modalContainer}
    >
      <Box className={style.modal}>
        <h1 style={{ padding: "40px" }}>
          The purpose of the application is to upload your own content. We are
          not responsible for the content that is uploaded on our page
        </h1>
      </Box>
    </Box>
  );
};

export default Conditions;
