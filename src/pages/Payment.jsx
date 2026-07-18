import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import * as formik from 'formik';
import { useState } from 'react';
import { addPaymentDetails } from "../Redux/Payment";
import * as yup from 'yup';




function Payment({ cart, setCart }) {

    const { Payment } = useSelector((state) => state.paymentState)
    const { Formik } = formik;
    const { cartItems } = useSelector((state) => state.cartState)
    const { id } = useParams()
    const single = cartItems.find((p) => p.id === Number(id))

    const total = single?.quantity * Number(single.productPrice);

const schema = yup.object().shape({
    fullName: yup.string().required("Enter your name"),
    email: yup.string().email("Enter a valid email ").required("Enter your Email"),
    address:yup.string().required("Enter your address"),
    password: yup.string().required("Enter your password"),

  });

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } 

        setValidated(true);
    };
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handlePayment = (values) => {
        dispatch(addPaymentDetails({
            ...values,
            ...single
        }))
        toast.success("Your payment is successful and your order is placed successfully.")
        navigate("/cart-list")

    }


    return (
        <>
            <Container className="mt-5">
                <Card className="shadow p-4 border-0">
                    <Row>
                        <Col md={5}>
                            {/* <img src={single?.productPhoto} */}

                            {/* style={{
                                    width: "100%",
                                    height: "400px",
                                    objectFit: "cover"
                                }}
                                alt="" /> */}
                            <img src={single?.productPhoto}
                                style={{
                                    width: "400px",
                                    height: "300px",
                                    objectFit: "cover",
                                    borderRadius: "20px"
                                }}
                                alt="" />
                            <Card.Body>
                                <h1>{single?.productName ?? null}</h1>
                                <h2>{single?.productDiscription ?? ""}</h2>
                                <h3>${single?.productPrice ?? ""}</h3>
                                <h3> Quantity:{single?.quantity ?? ""}</h3>
                                <h3>Total Price:{total}</h3>

                            </Card.Body>
                        </Col>

                        <Col md={7}>

                            <Card.Body>
                                <Formik
                                    validationSchema={schema}
                                    onSubmit={handlePayment}
                                    initialValues={{
                                        fullName: '',
                                        email: '',
                                        address:'',
                                        password: '',

                                    }}
                                >
                                     {({ handleSubmit, handleChange,  values, touched, errors }) => (

                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="validationCustom02" >
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control type="text" 
                                            
                      name="fullName"
                      value={values.fullName}
                      onChange={handleChange}
                      isValid={touched.fullName && !errors.fullName}
                      isInvalid={touched.fullName && !!errors.fullName}/>
                                            <Form.Control.Feedback type="invalid" >
                                                Please choose a Name.
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email"
                                            name="email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && !!errors.email}/>
                                            <Form.Control.Feedback type="invalid" >
                                                Please choose a Email.
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" >
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control as={"textarea"}
                                                rows={3}
                                               
                                                name="address"
                      value={values.address}
                      onChange={handleChange}
                      isValid={touched.address && !errors.address}
                      isInvalid={touched.address && !!errors.address}/>
                                            <Form.Control.Feedback type="invalid" >
                                                Please type your address.
                                            </Form.Control.Feedback>

                                            <Form.Group className="mb-3" controlId="validationCustom02" >
                                                <Form.Label> Pin Number</Form.Label>
                                                <Form.Control type="password" placeholder="Enter Full Name" required 
                                                name="password"
                      
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      isInvalid={touched.password && !!errors.password}/>
                                                <Form.Control.Feedback type="invalid" >
                                                    Please type your pin number
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                        </Form.Group>



                                        <Button variant="primary" type="submit" >
                                            pay

                                        </Button>
                                    </Form>
                                     )}
                                </Formik>

                            </Card.Body>


                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    )
}
export default Payment