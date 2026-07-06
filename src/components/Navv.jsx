import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CgProfile } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userOut } from '../Redux/userSlice';
function Naav() {
  const dispatch = useDispatch()
  const {cartItems} = useSelector((state)=>state.cartState)

  const { isAuthenticated } = useSelector((state) => state.userState);


  const handeLogOut = () => {
    toast.success("User Logged out sucssessfully")
    dispatch(userOut())
  }
  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: "#1f2937" }} data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Royald IceCream</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
              <Nav.Link as={Link} to={"/products"}>products</Nav.Link>

              {!isAuthenticated &&
                (<Nav.Link as={Link} to={"/Login"}>Login</Nav.Link>)}

              {isAuthenticated && (<Nav.Link
               as={Link}
                to={"/cart-list"} 
                className='position-relative'>
                  Booking
                
                <span className='booking'>{cartItems.length}</span>
              </Nav.Link>)}


              {isAuthenticated && (<NavDropdown title="Profile " id="basic-nav-dropdown">

                <NavDropdown.Item as={Link} to={"/List-Products"} >

                  List Products

                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/Admin/list-users"} >list Users</NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item onClick={handeLogOut}
                  as={Link}
                  to="/"
                  onClick={handeLogOut}>

                  Logout  <CgProfile size={22} />


                </NavDropdown.Item>

              </NavDropdown>)}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
export default Naav