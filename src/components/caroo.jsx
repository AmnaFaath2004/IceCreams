import Carousel from 'react-bootstrap/Carousel';

import caroo1 from '../assets/images/caro1.webp'
import caroo2 from '../assets/images/caro2.jpg'
import caroo3 from '../assets/images/caro3.jpg'
import { object } from 'yup'
import { Container } from 'react-bootstrap';



function Caroo() {
  const styl = {
    objectFit: "cover",
    height: '500px',
    borderRadius: "20px"

  }
  return (
    <>
      <Container className="mt=4 mb-4">
        <Carousel fade>
          <Carousel.Item>

            <img
              className='d-block w-100'
              src={caroo3} alt="" style={styl} />
            <Carousel.Caption>
              <h3>Refreshing Fruit Ice Creams</h3>
              <p>Enjoy a burst of fruity flavors in every bite with our delicious mini ice creams.
                Made with vibrant fruit-inspired designs, they are perfect for kids and adults alike.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={caroo2} alt="" style={styl} />
            <Carousel.Caption>
              <h3>Cool Treats for Every Occasion</h3>
              <p>Whether it's a sunny afternoon or a special celebration, our mini ice creams bring happiness to every moment.
                Their fun shapes and refreshing taste make them irresistible.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={caroo1} alt="" style={styl} />
            <Carousel.Caption>

              <h3>Premium Taste, Mini Size</h3>
              <p>Experience rich flavor and creamy texture packed into delightful bite-sized ice creams.
                With a variety of fruit flavors, every pack offers a colorful and enjoyable treat.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

    </>
  )
}
export default Caroo