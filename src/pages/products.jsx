import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function Products(){
    const {products}=useSelector((state)=>state.productState)
    return(
        <>
        
        <Container className='mt-5'>
            <h1 className='text-center mb-5'>Royal flavors</h1>

            <Row>
                {products.map((ice)=>(
                    <Col 
                    lg={4}
                    md={6}
                    sm={12}
                    className='mb-4'
                    key={ice.id}>

                        <Card className='shadom h-100 border-0'>
      <Card.Img  
      variant="top"
       src={ice.productPhoto} 
       height='250px'
       style={{objectFit:"cover"}}/>
      <Card.Body  className='text-center'>
        <Card.Title className='text-center'>{ice.productName}</Card.Title>
        <Card.Text className='text-center'>
          {ice.productDescription}
        </Card.Text>
        <Card.Text className='text-center'>
         ${ice.productPrice}
        </Card.Text>
        <Link to={`/single/${ice.id}`}>
        <Button variant="primary" className='text-center'>View Product</Button>
        </Link>
      </Card.Body>
    </Card>  
                    
                    </Col>
                    
                ))}
                

            </Row>


        </Container>






        
        </>
    )
}
export default Products