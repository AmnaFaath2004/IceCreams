import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addCartItem } from "../Redux/CartSlice"
import { toast } from "react-toastify"

function Single({ cart, setCart }) {
    const { products } = useSelector((state) => state.productState)
    const { id } = useParams()
    const single = products.find((p) => p.id === Number(id))
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userState);

    const isOwnProduct =
    user?.role === "Seller" && single?.sellerId === user?.id;

    // const handleAddCart = () => {

    // console.log("User:", user);
    // console.log("Product:", single);

    //     if (isOwnProduct) {
    //         toast.error("You can't add your own product to the cart.");
    //         return;
    //     }
    //     // setCart(cart+1)

    // console.log("Sending to cart:", cartProduct);
    //     dispatch(addCartItem({
    //         ...single,
    //         cartUserId: user.id

    //     }

    //     ))
    //     toast.success("Product added to cart successfully")
    // }

    const handleAddCart = () => {

    console.log("User:", user);
    console.log("Product:", single);

    if (isOwnProduct) {
        toast.error("You can't add your own product to the cart.");
        return;
    }

    const cartProduct = {
        ...single,
        cartUserId: user.id
    };

    console.log("Sending to cart:", cartProduct);

    dispatch(addCartItem(cartProduct));

    toast.success("Product added to cart successfully");
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
                                    onClick={handleAddCart}

                                >

                                    Add to cart</Button>
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