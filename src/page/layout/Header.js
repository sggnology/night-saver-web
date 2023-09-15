import {Link} from "react-router-dom";

function Header(props) {
  return (
    <>
      <Link to="/">
        <h1>Night Saver</h1>
      </Link>
    </>
  )
}

export default Header;