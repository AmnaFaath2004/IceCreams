import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addCartItem } from "../Redux/CartSlice"

function Single({ cart, setCart }) {
    const { products } = useSelector((state) => state.productState)
    const { id } = useParams()
    const single = products.find((p) => p.id === Number(id))
    const dispatch = useDispatch()


    const handleAddCart = () => {
        // setCart(cart+1)
        dispatch(addCartItem(single))
    }
    return (
        <>
            <Container className="mt-5">
                <Card className="shadow p-4 border-0">
                    {single ? (<Row>
                        <Col md={5}>
                            <img src={single?.productPhoto}
                                style={{
                                    width: "100%",
                                    height: "400px",
                                    objectFit: "cover"
                                }}
                                alt="" />
                        </Col>

                        <Col md={7}>

                            <Card.Body>
                                <h1>{single?.productName ?? null}</h1>
                                <p>{single?.productDescription ?? ""}</p>
                                <h3>${single?.productPrice ?? ""}</h3>

                                <Button
                                    variant="dark"
                                    onClick={handleAddCart}>Add to Cart</Button>
                            </Card.Body>


                        </Col>
                    </Row>) : (
                        <Row>
                            <Col className="text-center">
                                <h4>
                                    Product not found</h4></Col>
                        </Row>
                    )}

                </Card>
            </Container>
        </>
    )
}
export default Single