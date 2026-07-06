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
    const [show, setShow] = useState(false);
    const [deleteCartIndex, setDeleteCartIndex] = useState(null)
    const dispatch = useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = (productId) => {
        setShow(true);
        setDeleteCartIndex(productId)
    }

    const handleDeleteCart = () => {
        dispatch(deleteCart(deleteCartIndex))
        toast.success("Cart Item Deleted Successfull")
        setShow(false);
        setDeleteCartIndex(null);

    }
    const cartQuantityInreament = (productId) => {
        dispatch(increamentCartQantity(productId))
    }
    const cartQuantitydereament = (productId) => {
        dispatch(decreamentCartQantity(productId))
    }
    const totalPrice = cartItems ?.reduce((total, item) => {
        total += item.quantity * item.productPrice;
        return total
    }, 0)

    const totalQuantity = cartItems?.reduce((total,items)=>{
        total+= items.quantity
        return total
    },0)

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

                                    <th>Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((product, i) => (
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
                                            <Button onClick={() => handleShow(product.id)}>
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