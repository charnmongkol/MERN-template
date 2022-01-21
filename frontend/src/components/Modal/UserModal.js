import React from "react";
import { Button, Card, ListGroup, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loading from "../Loading";

const UserModal = ({ show, setShow }) => {
  const singleUser = useSelector((state) => state.singleUser);
  const { user } = singleUser;

  const handleClose = () => setShow(false);

  return (
    <>
      {user && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">
              {user.name}{" "}
              {user.status === false ? (
                <span className="text-warning fs-6">pending</span>
              ) : (
                <span className="text-success fs-6">approved</span>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card className="w-100">
              <Card.Img variant="top" src={user.pic} rounded />
              <ListGroup variant="flush">
                <ListGroup.Item>
                  license number: {user.licenseNumber}
                </ListGroup.Item>
                <ListGroup.Item>
                  license start: {user.licenseStart}
                </ListGroup.Item>
                <ListGroup.Item>license end: {user.licenseEnd}</ListGroup.Item>
                <ListGroup.Item>อีเมลล์: {user.email}</ListGroup.Item>
                <ListGroup.Item>ที่อยู่: {user.address}</ListGroup.Item>
                <ListGroup.Item>เบอร์โทร: {user.phoneNumber}</ListGroup.Item>
                <ListGroup.Item>เว็บไซต์: {user.website}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default UserModal;
