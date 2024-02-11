const Footer = () => {
  return <footer style={styles}>Copyright 2024 &copy;</footer>;
};

const styles = {
  color: "var(--white-color)",
  fontSize: "1rem",
  letterSpacing: '1px',
  backgroundColor: "var(--fav-3-color)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "70px",
};

export default Footer;