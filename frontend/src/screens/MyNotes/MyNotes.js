import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import MainScreen from "../../components/MainScreen";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      //delete operation
    }
  };

  const fetchNotes = async () => {
    const { data } = await axios.get("api/notes");
    // console.log(data)
    //store data in setNotes
    setNotes(data);
  };

  console.log(notes);

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MainScreen title="Welcome back">
      <Link to="createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create a new note
        </Button>
      </Link>
      {notes.map((note) => (
        <Accordion key={note._id}>
          <Accordion.Item eventKey="0">
            <Accordion.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                {note.title}
              </span>
              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Accordion.Header>

            <Accordion.Body>
              <h4>
                <Badge bg="success">Category - {note.category}</Badge>
              </h4>
              <blockquote className="blockquote mb-0">
                <p>{note.content}</p>
                <footer className="blockquote-footer">Created on - date</footer>
              </blockquote>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
