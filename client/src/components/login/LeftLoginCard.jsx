import React from "react";
import logo from '../../assets/logo itsm.png'
const styles = {
  card: {
    width: "420px",
    background: "#D9DAFF",
    padding: "40px",
    borderRadius: "24px",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "40px",
  },

  logo: {
    width: "80px",
  },

  brandTitle: {
    fontSize: "26px",
    fontWeight: 600,
    color: "#ffffff",
    lineHeight: "22px",
    marginBottom:"4px",
  },

  brandSubTitle: {
    fontSize: "22px",
    color: "#ffffff",
    letterSpacing: "1px",
  },

  title: {
    fontSize: "36px",
    fontWeight: 600,
    color: "#222",
  },

  highlight: {
    color: "#6a7cff",
  },

  text: {
    marginTop: "20px",
    color: "#444",
    lineHeight: 1.6,
  },
};

const LeftLoginCard = () => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <img src={logo} alt="ITSM Logo" style={styles.logo} />

        <div>
          <div style={styles.brandTitle}>ITSM Platform</div>
          <div style={styles.brandSubTitle}>IT SERVICE MANAGEMENT</div>
        </div>
      </div>

      <h1 style={styles.title}>
        <span style={styles.highlight}>login</span> to your ITSM account
      </h1>

      <p style={styles.text}>
        “Simplifying IT operations by turning complexity into clarity.”
      </p>
    </div>
  );
};

export default LeftLoginCard;
