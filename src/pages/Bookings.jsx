import { Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';


function Bookings(){
    const {payment}=useSelector((state)=>state.paymentState)
    return(
        <>
         <Container className="mt-3">
            <Row>
                <Col className="d-flex justify-content-between ">
                    <h4>List of Bookings</h4>
                    
                </Col>
                <Row>
                    <Col>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>P-Name</th>
          <th>C-Name </th>
           <th>Email</th>
          <th>address</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {payment.map((custumer, i) => (
                                    <tr key={i}>
                                        <td>
                                            {i + 1}
                                        </td>
                                      <td>{custumer.productName}</td>
                                        <td>{custumer?.fullName ?? ""}</td>
                                        <td>{custumer?.email ?? ""}</td>
                                        <td>{custumer?.address ?? ""}</td>
                                        <td>{custumer.productPrice?? ""}</td>
                                        <td>{custumer.quantity}</td>
                                      
                                        

                                       
                                    </tr>

                                ))}
      </tbody>
    </Table>
    </Col>
                </Row>

            </Row>
             </Container>


        </>
    )
}
export default Bookings