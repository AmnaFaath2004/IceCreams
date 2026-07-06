import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { DeleteUser, userRoleChange, userStatusChange } from "../Redux/userSlice";
import { Link } from "react-router-dom";

const ListUsers = () => {
    const { users } = useSelector((state) => state.userState);
    const dispatch = useDispatch()





    const [deletUserIndex, setDeleteUserIndex] = useState(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (userId) => {
        setShow(true);
        setDeleteUserIndex(userId)
    }

    const deleteUser = () => (
        dispatch(DeleteUser(deletUserIndex),
            toast.success("Deleting User is successfull"),
            setShow(false),
            setDeleteUserIndex(null))
    )

    const handleUserStateChange=(payload)=>{
        dispatch(userStatusChange(payload))
        toast.success("user status updated")

    }
        const handleUserRoleChange=(payload)=>{
            dispatch(userRoleChange(payload))
            toast.success("User Role Updated")
        
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col>

                    <h4>List of Users</h4>
                </Col>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>index</th>


                                    <th>Users Name</th>
                                    <th> Email</th>
                                    <th>status</th>
                                    <th>Role</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((users, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>

                                        <td>{users?.fullName ?? null}</td>
                                        <td>{users?.email ?? ""} </td>
                                        {/* <td>{users?.status ?? ""}</td> */}
                                        <td> <Form.Check // prettier-ignore
                                            type="switch"
                                            id="custom-switch"
                                            label={users.status? "Active" : "Inactive"}
                                            onChange={()=>handleUserStateChange(users.id)}
                                            defaultChecked={users.status}
                                        /></td>
                                        <td>
                                            <Form.Select onChange={(event) =>
                                                handleUserRoleChange({ id: users.id, role: event.target.value })}

                                                defaultValue={users?.role}
                                                aria-label="Default select example">
                                                <option value="Admin">Admin</option>
                                                <option value="User">User</option>
                                                <option value="Seller">Seller</option>
                                            </Form.Select>
                                        </td>
                                        <td><Link to={`/Admin/Edit-users/${users.id}`}>
                                            <CiEdit size={25} />
                                        </Link>
                                        </td>
                                        <td><MdDelete size={25} onClick={() => handleShow(users.id)} /></td>
                                    </tr>
                                ))}


                            </tbody>
                        </Table>
                    </Col>

                </Row>






            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure? you want to delete the User !!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )
}
export default ListUsers