import React from "react";
import LeftLoginCard from "../components/login/LeftLoginCard";
import RightLoginForm from "../components/login/RightLoginForm";

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6a7cff, #8f8bff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    gap: "40px",
  },
};

const Loginpage = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <LeftLoginCard />
        <RightLoginForm />
      </div>
    </div>
  );
};

export default Loginpage;
