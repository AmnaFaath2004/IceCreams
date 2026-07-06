import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { userRegister } from '../Redux/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addProducts } from '../Redux/ProductSlice';
import Products from '../pages/products';

function AddProduct() {
  const { Formik } = formik;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const schema = yup.object().shape({
    productName: yup.string().required("Enter your Product name"),
    productPrice: yup.number().required("Enter your Product Price"),
    productDiscription: yup.string().required("Enter your Product discription"),
    productPhoto: yup.string().required("Enter your Product Price"),

  });
  const handleAddProduct = (values) => {
    values.id = Date.now()

    

    dispatch(addProducts(values))//name of action
    toast.success("Product added seccessfully")
    navigate("/list-products")
  }


  return (

    <Container className='min-vh-100  min- d-flex justify-content-center align-items-center '>
      <Row className='justify-content-center'>
        <Col md={4} className='w-100' >
          <Row>
            <Col>
              <h4>Add Product</h4>
            </Col>
          </Row>
        </Col>

        <Col>
          <Formik
            validationSchema={schema}
            onSubmit={handleAddProduct}
            initialValues={{
              productName: '',
              productPrice: 0,
              productDiscription: '',
              productPhoto: ''
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="productName"
                      value={values.productName}
                      onChange={handleChange}
                      isValid={touched.productName && !errors.productName}
                      isInvalid={touched.productName && !!errors.productName}
                    />

                    <Form.Control.Feedback type='invalid'>
                      {errors.productName}
                      {/* only show when error occurs */}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label>product Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="productPrice"
                      value={values.productPrice}
                      onChange={handleChange}
                      isValid={touched.productPrice && !errors.productPrice}
                      isInvalid={touched.productPrice && !!errors.productPrice}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.productPrice}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label>product Discription</Form.Label>
                    <Form.Control
                      as={'textarea'}
                      name="productDiscription"
                      value={values.productDiscription}
                      onChange={handleChange}
                      isValid={touched.productDiscription && !errors.productDiscription}
                      isInvalid={touched.productDiscription && !!errors.productDiscription}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.productDiscription}
                      {/* only show when error occurs */}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label>Product Photo</Form.Label>
                    <Form.Control
                      type="text"
                      name="productPhoto"
                      value={values.productPhoto}
                      onChange={handleChange}
                      isValid={touched.productPhoto && !errors.productPhoto}
                      isInvalid={touched.productPhoto && !!errors.productPhoto}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.productPhoto}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Button type="submit" className='mt-3' >Add Product</Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>

    </Container>
  );
}

export default AddProduct;


