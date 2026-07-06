import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../Redux/userSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { editProducts } from '../Redux/ProductSlice';
import { updateCartProduct } from '../Redux/CartSlice';

function EditProducts() {
  const { Formik } = formik;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {products}= useSelector((state)=>state.productState)

  const {id}= useParams()
  const product = products.find((pr)=>pr.id === Number(id))

  const schema = yup.object().shape({
    productName: yup.string().required("Enter your  product name"),
    productPrice: yup.number().required("Enter your Price"),
    productDiscription: yup.string().required("Enter your Product Discription"),
    productPhoto:yup.string().required("Add your Product Photo"),
  });


  const handleEditProduct = (values) => {   
    values.id = Number(id)
    

    dispatch(editProducts(values))//name of action
    dispatch(updateCartProduct(values))
    toast.success("Product Updated seccessfully")
    navigate("/list-Products")
  }


  return (

    <Container className='min-vh-100  min- d-flex justify-content-center align-items-center '>
       {product &&(
          <Row className='justify-content-center'>
        <Col md={4} className='w-100' >
          <Row>
            <Col>
              <h4>Edit Products</h4>
            </Col>
          </Row>
        </Col>

        <Col>
       
          <Formik
            validationSchema={schema} 
            onSubmit={handleEditProduct}
            initialValues={{
              productName: product.productName,
              productPrice:product.productPrice ,
              productDiscription:product.productDiscription ,
              productPhoto:product.productPhoto

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
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control
                      type="text"
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
                    <Form.Label>Product Discription</Form.Label>
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
                      type='text'
                      name="productPhoto"
                      value={values.productPhoto}
                      onChange={handleChange}
                      isValid={touched.productPhoto && !errors.productPhoto}
                      isInvalid={touched.productPhoto && !!errors.productPhoto}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.productPhoto}
                      {/* only show when error occurs */}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Button type="submit" className='mt-3' >Update Product</Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
        )}
      

    </Container>
  );
}

export default EditProducts;


