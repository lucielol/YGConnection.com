import { Link } from "react-router-dom";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <header className="header">
        <div className="header-left">
          {/* <button className="sidebar-open" onClick={() => onOpen()}>
            <Iconify icon="ion:menu" width={24} />
          </button> */}
          <Link to="/" className="logo">
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <button onClick={logout} className="logout">
          Log out
        </button>
      </header>
    </div>
  );
}

export default Navbar;
