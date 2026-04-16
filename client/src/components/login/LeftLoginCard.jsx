import React from "react";
import logo from '../../assets/logo itsm.png'

const styles = {
  card: {
    width: "420px",
    background: "rgba(217, 218, 255, 0.7)", // same color, glass effect
    padding: "40px",
    borderRadius: "24px",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: `
      0 20px 50px rgba(0,0,0,0.15),
      inset 0 1px 0 rgba(255,255,255,0.3)
    `,
    position: "relative",
    overflow: "hidden",
  },

  // 🔵 soft background glow
  glow1: {
    position: "absolute",
    width: "180px",
    height: "180px",
    background: "#6a7cff",
    borderRadius: "50%",
    filter: "blur(100px)",
    opacity: 0.25,
    top: "-40px",
    left: "-40px",
  },

  glow2: {
    position: "absolute",
    width: "160px",
    height: "160px",
    background: "#6a7cff",
    borderRadius: "50%",
    filter: "blur(100px)",
    opacity: 0.2,
    bottom: "-40px",
    right: "-40px",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "50px",
    zIndex: 2,
    position: "relative",
  },

  logo: {
    width: "80px", // unchanged
    transition: "transform 0.3s ease",
  },

  brandTitle: {
    fontSize: "26px",
    fontWeight: 600,
    color: "#ffffff",
    lineHeight: "22px",
    marginBottom: "4px",
  },

  brandSubTitle: {
    fontSize: "22px",
    color: "#ffffff",
    letterSpacing: "1px",
    opacity: 0.9,
  },

  title: {
    fontSize: "36px",
    fontWeight: 600,
    color: "#222",
    marginBottom: "12px",
    zIndex: 2,
    position: "relative",
  },

  highlight: {
    background: "linear-gradient(90deg, #6a7cff, #4a5cff)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    fontWeight: 700,
  },

  accentLine: {
    width: "60px",
    height: "4px",
    background: "#6a7cff",
    borderRadius: "10px",
    margin: "10px 0 20px",
  },

  text: {
    marginTop: "10px",
    color: "#444",
    lineHeight: 1.7,
    fontStyle: "italic",
    opacity: 0.75,
    zIndex: 2,
    position: "relative",
  },
};

const LeftLoginCard = () => {
  return (
    <div style={styles.card}>
      
      {/* 🔥 Background Glow Effects */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <div style={styles.header}>
        <img
          src={logo}
          alt="ITSM Logo"
          style={styles.logo}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />

        <div>
          <div style={styles.brandTitle}>ITSM Platform</div>
          <div style={styles.brandSubTitle}>IT SERVICE MANAGEMENT</div>
        </div>
      </div>

      <h1 style={styles.title}>
        <span style={styles.highlight}>login</span> to your ITSM account
      </h1>

      {/* 💎 Accent Line */}
      <div style={styles.accentLine}></div>

      <p style={styles.text}>
        “Simplifying IT operations by turning complexity into clarity.”
      </p>
    </div>
  );
};

export default LeftLoginCard;