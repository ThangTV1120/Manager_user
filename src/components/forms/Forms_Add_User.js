import Form from 'react-bootstrap/Form';

function Forms_Add_User(props) {
    const {name,job}=props;
    return (
        <Form>
            <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" onChange={(envent) => name(envent)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Job">
                <Form.Label>Job</Form.Label>
                <Form.Control type="text" placeholder="Enter Job" onChange={(envent) => job(envent)} />
            </Form.Group>
        </Form>
    );
}

export default Forms_Add_User;