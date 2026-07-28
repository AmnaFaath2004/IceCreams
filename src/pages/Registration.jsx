import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../Redux/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const { Formik } = formik;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {users}= useSelector((state)=>state.userState);     // to avoid multiple registration in same email id
  console.log("users----------->",users);
  

  const schema = yup.object().shape({
    fullName: yup.string().required("Enter your name"),
    email: yup.string().email("Enter a valid email ").required("Enter your Email"),
    password: yup.string().required("Enter your password"),

  });
  const handleRegister = (values) => {
    values.id = Date.now()
    values.role = "User";
    values.status = true;
    //console.log("values-------->", values);

    const user = users.find((u)=>u.email ===values.email)
    if(user){
      toast.error("Email already exists!!!");
      return;

    }

    dispatch(userRegister(values))//name of action
    toast.success("User Registered seccessfully")
    navigate("/Login")
  }


  return (

    <Container className='min-vh-100  min- d-flex justify-content-center align-items-center '>
      <Row className='justify-content-center'>
        <Col md={4} className='w-100' >
          <Row>
            <Col>
              <h4>User Register</h4>
            </Col>
          </Row>
        </Col>

        <Col>
          <Formik
            validationSchema={schema}
            onSubmit={handleRegister}
            initialValues={{
              fullName: '',
              email: '',
              password: '',

            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>FullName</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={values.fullName}
                      onChange={handleChange}
                      isValid={touched.fullName && !errors.fullName}
                      isInvalid={touched.fullName && !!errors.fullName}
                    />

                    <Form.Control.Feedback type='invalid'>
                      {errors.fullName}
                      {/* only show when error occurs */}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.password}
                      {/* only show when error occurs */}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Button type="submit" className='mt-3' >Register</Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>

    </Container>
  );
}

export default Registration;


