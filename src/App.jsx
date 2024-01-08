import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Navbar } from 'react-bootstrap';

const App = () => {
 const [data, setData] = useState([]);
 const [inputData, setInputData] = useState({ id: '', name: '', email: '' });

 useEffect(() => {
    getData();
 }, []);

 const getData = () => {
    const storedData = localStorage.getItem('users');
    setData(storedData ? JSON.parse(storedData) : []);
 };

 const postData = () => {
    const newData = [...data, inputData];
    localStorage.setItem('users', JSON.stringify(newData));
    setData(newData);
 };

 const deleteData = (id) => {
    const newData = data.filter(item => item.id !== id);
    localStorage.setItem('users', JSON.stringify(newData));
    setData(newData);
 };

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
 };

 return (
    <Container>
      <Navbar  style={{backgroundColor:"white",mt:"5",height:"60px"}} className="navbar navbar-expand-lg navbar-light bg-success top-0 position-fixed w-100">
        <Navbar.Brand href="#home" text="5">
         <h1 style={{zIndex:'1'}} color='danger'>React Crud App </h1>
        </Navbar.Brand>
      </Navbar>
      <Row>
        <Col mt={5}>
          <h2>Add User</h2>
          <Form>
            <Form.Group controlId="formBasicId">
              <Form.Label>Id</Form.Label>
              <Form.Control type="text" name="id" onChange={handleInputChange} />
            </Form.Group>

            <Form.Group controlId="formBasicName" >
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" onChange={handleInputChange} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" onChange={handleInputChange} />
            </Form.Group>

            <Button variant="primary" type="button" onClick={postData}>
              Add
            </Button>
          </Form>
        </Col>
        <Col md={8}>
          <h2>View Users</h2>
          <ListGroup>
            {data.map(item => (
              <ListGroup.Item key={item.id}>
                <Row>
                 <Col md={8}>
                    {item.name} - {item.email}
                 </Col>
                 <Col md={4}>
                    <Button variant="danger" onClick={() => deleteData(item.id)}>
                      Delete
                    </Button>
                 </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  
 );
};

export default App;