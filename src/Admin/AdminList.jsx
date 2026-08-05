import { Button, Col, Container, Image, Modal, Row, Table } from "react-bootstrap"
import {  useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./ListProducts.css"
import { useState } from "react"

const  AdminList = () => {
    const { products } = useSelector((state) => state.productState)
    

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
                                    <th>Seller ID</th>
                                    <th>Seller Name</th>
                                    <th>Product Price</th>
                                    <th>Delete</th> 
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
                                        <td>{product?.sellerId ?? ""}</td>
                                        <td>{product?.sellerName}</td>
                                        <td>{product?.productPrice ?? ""}</td>                    
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Row>
            
        </Container>
    )
}
export default AdminList