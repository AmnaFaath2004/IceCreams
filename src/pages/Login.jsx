import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import { userLogin } from '../Redux/userSlice';

function Login() {
  const { Formik } = formik;
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const { users } = useSelector((state) => state.userState);
  // also: const users = useSelector((state)=>state.userState.users)
  console.log("users------->", users);


  const schema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Enter your Email "),
    password: yup.string().required("Enter your Password"),

  });

  const handleLogin = (values) => {
    const user = users.find((u) => u.email === values.email);
    if (!user) {
      toast.error("User not found")
      return
    }
    if (user.password !== values.password){

      toast.error("Wrong Password")
    return
    }

    if(user.status === false){
      toast.error("You are innactivated by ADMIN!!!")
      return
    }

    dispatch(userLogin(user));
  toast.success("Login Successfull!");
  navigate("/")
  }
 

    



  return (
    <Container className='min-vh-100 min-d-flex justify-content-center align-items-center'>
      <Row className='justify-content-center'>

        <Col md={4} className='w-100'>
          <Row>
            <Col>
              <h4>User Login</h4></Col>
          </Row>

          <Row>
            <Col>

              <Formik
                validationSchema={schema}
                onSubmit={handleLogin}
                initialValues={{
                  email: '',
                  password: '',

                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="validationFormik01">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          isValid={touched.email && !errors.email}
                          isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.email}
                //only shows when errror occurs
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Row className='mb-4'>
                      <Form.Group as={Col} controlId="validationFormik02">
                        <Form.Label>password</Form.Label>
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
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <div className='d-grid'>
                      <Button type="submit">Submit form</Button>
                    </div>


                  </Form>
                )}
              </Formik>

            </Col>
          </Row>
        </Col>

      </Row>

      <Row>
        <Col className='mt-3 text-center'>
          if you don't have an account, <Link to={'/registration'}>Register Now</Link>
        </Col>
      </Row>



    </Container>
  );
}

export default Login;

