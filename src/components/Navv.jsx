import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CgProfile } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userOut } from '../Redux/userSlice';
import { Form, InputGroup } from 'react-bootstrap';

function Naav({ search, setSearch }) {

  const location = useLocation()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cartState)

  const { isAuthenticated, user } = useSelector((state) => state.userState);


  const handeLogOut = () => {
    toast.success("User Logged out sucssessfully")
    dispatch(userOut())
  }
  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: "#1f2937" }} data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Royald IceCream</Navbar.Brand>

          {
            location.pathname === "/products" && (
              <form className='d-flex ' style={{ width: "300px", marginLeft: "300px" }}>
                <InputGroup>
                  <Form.Control
                    type="search"
                    placeholder="search Flavours..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />



                </InputGroup>
              </form>
            )
          }
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
              <Nav.Link as={Link} to={"/products"}>products</Nav.Link>
             

              {!isAuthenticated &&
                (<Nav.Link as={Link} to={"/Login"}>Login</Nav.Link>)}

              {isAuthenticated && (user.role === "Admin" || user.role === "User") && (
                <Nav.Link
                as={Link}
                to={"/cart-list"}
                className='position-relative'>
                Cart
                <span className='booking' style={{marginLeft:"4px"}}>{cartItems.length}</span>

              </Nav.Link>)}
              {isAuthenticated &&
                (user.role === "Admin" || user.role === "Seller") && (
                  <Nav.Link as={Link} to={"/List-Products"}>  List Products</Nav.Link>)}
{isAuthenticated &&(user.role === "Admin" ||user.role === "Seller") &&(
  <Nav.Link as={Link} to={"bookings"}>Bookings</Nav.Link>
)}

              {isAuthenticated &&
                (user.role === "Admin") && (
                  <Nav.Link as={Link} to={"/Admin/list-users"}>  list Users</Nav.Link>)}

              {isAuthenticated &&
                (<Nav.Link onClick={handeLogOut}
                  as={Link}
                  to="/"
                  onClick={handeLogOut}>   Logout  <CgProfile size={22} /></Nav.Link>)}





            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
export default Naav




