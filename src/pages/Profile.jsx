import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { BsCameraFill } from "react-icons/bs";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
function Profile() {

  const fileRef = useRef();

  const { user } = useSelector((state) => state.userState);
  console.log(user);
  

  const [image, setImage] = useState("");

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <div
          style={{
            position: "relative",
            width: "150px",
            height: "150px",
            margin: "auto",
          }}
        >
          

          <button
            type="button"
            onClick={() => fileRef.current.click()}
            style={{
              position: "absolute",
              bottom: "5px",
              right: "5px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "#0d6efd",
              color: "white",
              cursor: "pointer",
            }}
          >
            <BsCameraFill />
          </button>

          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileRef}
            onChange={handleImage}
          />
        </div>

        <div className="text-center mt-4">
           <h1>{user?.fullName ?? null}</h1>
                                <p> ID :{user?.id ?? ""}</p>
                                 <h3>{user?.email ?? ""}</h3>
                                <h3>{user?.role ?? ""}</h3>

                                <Button
                                    variant="dark"
                                   ><Nav.Link as={Link} to={"/"}>Close</Nav.Link></Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;


//   import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap"
// import {  useSelector } from "react-redux"
// import { useParams } from "react-router-dom"

// function Profile(){
//      const { user } = useSelector((state) => state.userState)
//     const { id } = useParams()
   



//     return(
//         <>
      

 
   
   
//             <Container className="mt-5">
//                 <Card className="shadow p-4 border-0">
//                     {user ? (<Row>
//                         <Col md={5}>
//                             <img src={user?.productPhoto}
//                                 style={{
//                                     width: "100%",
//                                     height: "400px",
//                                     objectFit: "cover"
//                                 }}
//                                 alt="" />
//                         </Col>

//                         <Col md={7}>

//                             <Card.Body>
//                                 <h1>{user?.fullName ?? null}</h1>
//                                 <p>{user?.id ?? ""}</p>
//                                 <h3>{user?.email ?? ""}</h3>
//                                 <h3>{user?.role ?? ""}</h3>

//                                 <Button
//                                     variant="dark"
//                                     ><Nav.Link as={Link} to={"/"}>Close</Nav.Link></Button>
                                      
//                             </Card.Body>


//                         </Col>
//                     </Row>) : (
//                         <Row>
//                             <Col className="text-center">
//                                 <h4>
//                                     profile not found</h4></Col>
//                         </Row>
//                     )}

//                 </Card>
//             </Container>
//         </>
//     )


    
// }
// export default Profile
