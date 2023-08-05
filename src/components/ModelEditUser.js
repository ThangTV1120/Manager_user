// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { putUpdateUser } from "../services/UserService";
import { toast } from 'react-toastify';
function ModelEditUser(props) {
    const { show, handleClose, dataUser, handleEditUserModel } = props;
    const [firstname, setFirstName] = useState();
    const [lastname, setLastName] = useState();
    const [email, setEmail] = useState();
    const Email = (envent) => {
        setEmail(envent.target.value);
    }
    const handleEditUser = async () => {
        let res = await putUpdateUser(email, firstname, lastname);
        console.log(res, res.updatedAt);
        if (res && res.updatedAt) {

            handleEditUserModel({
                email: email,
                last_name: lastname,
                first_name: firstname,
                id: dataUser.id
            })
            // setName("");
            // setJob("");
            toast.success("A User is Update success");
            handleClose();

        }
        else {
            toast.error("An Erro")
        }
    }
    useEffect(() => {
        if (show === true) {
            setLastName(dataUser.last_name);
            setFirstName(dataUser.first_name);
            setEmail(dataUser.email);
        }
    }, [dataUser])
    return (
        <>


            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title> Edit new User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-edit'>
                        <Form>
                            <Form.Group className="mb-3" controlId="Email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Enter Email" value={email} onChange={(envent) => Email(envent)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="First_Name">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name" value={firstname} onChange={(envent) => { return setFirstName(envent.target.value); }} />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Last_Name">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" value={lastname} onChange={(envent) => { return setLastName(envent.target.value); }} />

                            </Form.Group>


                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelEditUser;