import { Button, Col, Container, Image, Modal, Row, Table } from "react-bootstrap"
import { CiEdit } from "react-icons/ci"
import { MdDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./ListProducts.css"
import { useState } from "react"
import { deleteProduct } from "../Redux/ProductSlice"
import { toast } from "react-toastify"

const ListProducts = () => {
    const { products } = useSelector((state) => state.productState)
    console.log("Products----->", products);


    const [show, setShow] = useState(false);
    const [deleteProductIndex, setDeleteProductIndex] = useState(null)

    const dispatch = useDispatch()
    const handleClose = () => setShow(false);
    const handleShow = (productId) => {
        setShow(true);
        setDeleteProductIndex(productId)
    }

    const handleProductDelete = () => {
        dispatch(deleteProduct(deleteProductIndex));
        toast.success("Product deleted successfully!!!")
        setShow(false);
        setDeleteProductIndex(null)
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col className="d-flex justify-content-between ">
                    <h4>List Products</h4>
                    <Link className="btn btn-secondary" to={"/addProduct"} >Add Products</Link>
                </Col>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Produts Photo</th>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Discription</th>
                                    <th>Edit</th>
                                    <th>Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, i) => (
                                    <tr key={i}>
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td><Image className="imgstl"
                                            src={product?.productPhoto ?? null} alt={product?.productName ?? ""} /> </td>
                                        <td>{product?.productName ?? ""}</td>
                                        <td>{product?.productPrice ?? ""}</td>
                                        <td>
                                            {product?.productDiscription ?? ""}
                                        </td>
                                        <td>
                                            <Link
                                                to={`/edit-Product/${product.id}`}>
                                                <CiEdit />
                                            </Link>
                                        </td>

                                        <td>
                                            <Button onClick={() => handleShow(product.id)}>
                                                <MdDelete />
                                            </Button></td>
                                    </tr>

                                ))}


                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure? you want to delete the product !!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleProductDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
export default ListProducts