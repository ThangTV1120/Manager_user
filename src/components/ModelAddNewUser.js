// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Forms_Add_User from './forms/Forms_Add_User';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postCreateUser } from "../services/UserService";
import { toast } from 'react-toastify';
function ModelAddUser(props) {
    const { show, handleClose, handleUpdateTable } = props;
    const [firstname, setFirstName] = useState();
    const [lastname, setLastName] = useState();
    const [email, setEmail] = useState("");
    const Name = (envent) => {
        setFirstName(envent.target.value);
    }
    const Email = (envent) => {
        setEmail(envent.target.value);
    }
    const handleSaveUser = async () => {
        let res = await postCreateUser(email, firstname, lastname);
        console.log(res);
        if (res && res.id) {
            handleClose();
            setFirstName("");
            setEmail("");
            setLastName("");
            toast.success("A User is create success");
            handleUpdateTable({ email: email, first_name: firstname, lastname: lastname, id: res.id });
        }
        else {
            toast.error("An Erro")
        }
    }
    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> ADD new User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <Form>
                            <Form.Group className="mb-3" controlId="Email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Enter Email" onChange={(envent) => Email(envent)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="First_Name">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name" onChange={(envent) => { return setFirstName(envent.target.value); }} />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Last_Name">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" onChange={(envent) => { return setLastName(envent.target.value); }} />

                            </Form.Group>


                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelAddUser;