import {Button,Modal} from 'react-bootstrap';
import { deleteUser } from "../services/UserService";
import { toast } from 'react-toastify';
function ModelConfirm(props) {

    const { show, handleClose, dataUserDelete ,handlerDeleteUserModel} = props;
    const handleConfirm = async () => {
        let res =await deleteUser(dataUserDelete.id);
        if(res && +res.statusCode===204){
            toast.success("Delete user succed!")
            handlerDeleteUserModel(dataUserDelete);
            handleClose();
        }
        else toast.error("Error")
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title> DELETE a User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        this action can't be undone!
                        <br />
                        Do want to delete this user, email = <b>{dataUserDelete.email} </b>?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelConfirm;