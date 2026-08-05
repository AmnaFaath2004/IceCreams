import { Container, Row, Col, Table, Button, Image, Modal, InputGroup, Form } from "react-bootstrap"
import { CiEdit } from "react-icons/ci"
import { MdDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { decreamentCartQantity, deleteCart, increamentCartQantity } from "../Redux/CartSlice"
import { useState } from "react"
import { toast } from "react-toastify"

function CartList() {
    const { cartItems } = useSelector((state) => state.cartState)
    const { user } = useSelector((state) => state.userState);
    const [show, setShow] = useState(false);
    const [deleteCartIndex, setDeleteCartIndex] = useState(null)
    const dispatch = useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = (productId) => {
        setShow(true);
        setDeleteCartIndex(productId)
    }

    const userCart = cartItems.filter(
    (item) => item.cartUserId === user.id
);

    const handleDeleteCart = () => {
        dispatch(deleteCart({
            id:deleteCartIndex,
            cartUserId: user.id

        }))
        toast.success("Cart Item Deleted Successfull")
        setShow(false);
        setDeleteCartIndex(null);

    }
    const cartQuantityInreament = (productId) => {
        console.log("Increment id:", productId);
    console.log("User id:", user.id);

        dispatch(increamentCartQantity({
            id:productId,
         cartUserId: user.id}))
    }
    const cartQuantitydereament = (productId) => {
        dispatch(decreamentCartQantity({
            id:productId,
            cartUserId: user.id
        }))
    }
    const totalPrice = userCart ?.reduce((total, item) => {
        total += item.quantity * item.productPrice;
        return total
    }, 0)

   const totalQuantity = userCart.reduce(
    (total, item) => total + Number(item.quantity),
    0
);


    console.log("Logged in user:", user);
console.log("All cart items:", cartItems);
console.log("User cart:", userCart);
    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col >
                        <h4>Cart List</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Produts Photo</th>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Quantity</th>
                                    <th>Proceed</th>

                                    <th>Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {userCart.map((product, i) => (
                                    <tr key={i}>
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td><Image className="imgstl"
                                            src={product?.productPhoto ?? null} alt={product?.productName ?? ""} /> </td>
                                        <td>{product?.productName ?? ""}</td>
                                        <td>{product?.productPrice ?? ""}</td>
                                        <td>

                                            <InputGroup className="mb-3" >
                                                <Button
                                                    variant="outline-secondary"
                                                    id="button-addon1"
                                                    disabled={product.quantity < 2 ? true : false}
                                                    onClick={() => cartQuantitydereament(product.id)}>
                                                    -
                                                </Button>

                                                <Form.Control
                                                    style={{ flex: "none", width: "60px" }}

                                                    aria-label="Example text with button addon"
                                                    aria-describedby="basic-addon1"
                                                    value={product?.quantity}
                                                    readOnly

                                                />
                                                
                                                <Button variant="outline-secondary"
                                                    id="button-addon1"
                                                    onClick={() => cartQuantityInreament(product.id)}>
                                                    +
                                                </Button>

                                            </InputGroup>
                                        </td>
                                        <td>
                                            <Link to={`/payment/${product.id}`}>
                                            
                                            <Button variant="success">Pay</Button>
                                            
                                            </Link></td>
 

                                        <td>
                                            <Button variant="danger" onClick={() => handleShow(product.id)}>
                                                <MdDelete />
                                            </Button></td>
                                    </tr>

                                ))}
                                <tr>
                                     <td colSpan={6} className="text-end">
                                        <h4>
                                        Total Quantity :{totalQuantity}
                                        </h4>
                                        </td>
                                </tr>
                                <tr>
                                   
                                    <td colSpan={6} className="text-end">
                                        <h4>Total Price :{totalPrice}</h4>

                                    </td>
                                </tr>

                            </tbody>


                        </Table>

                    </Col>

                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove Cart </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you are really want to delete the cart item!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleDeleteCart}>
                            Remove Cart
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container></>
    )



} export default CartList