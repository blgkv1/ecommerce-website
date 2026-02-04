import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <ul className="footer-links">
        <li>
          <a href="/about">About Us</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/privacy">Privacy Policy</a>
        </li>
        <li>
          <a href="/terms">Terms of Service</a>
        </li>
      </ul>
      <p>
        &copy; {new Date().getFullYear()} blgkv1 E-commerce Site. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
