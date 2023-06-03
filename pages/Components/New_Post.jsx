import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
const New_Post = () => {
  const [show, setShow] = useState(false);
  const [postimage, setPostImage] = useState("");
  let [image, setImages] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="col-md-12 col-lg-8 col-xl-6 offset-xl-3 offset-lg-2 shadow rounded rounded-3 mb-4  p-3">
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledBy="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Write About Your Post </Form.Label>
              <Form.Control
                as="textarea"
                //   onChange={(e) => setInputPost(e.target.value)}
                //   value={inputpost}
                placeholder="what's in your mind?"
                rows={3}
              />
            </Form.Group>
            <div className="">
              <input type="file" />
              {/* {postimage ? (
                  <div className="">
                    <img
                      src={postimage}
                      className="img-thumbnail rounded"
                      width={"70%"}
                      title="image preview"
                    />
                    <Form.Control
                      type="url"
                      //   value={postimage}
                      className="mt-3"
                      onChange={(e) => setPostImage(e.target.value)}
                    />
                  </div>
                ) : (
                  <>
                    <Form.Label>Enter Your Image URL </Form.Label>
                    <Form.Control
                      type="url"
                      value={postimage}
                      className="mt-3"
                      onChange={(e) => setPostImage(e.target.value)}
                    />
                  </>
                )} */}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClose}
            className="bg-primary"
            //   disabled={inputpost == "" && postimage == ""}
            //   onClick={newPost}
          >
            POST
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex mt-3">
        <Link
          href="#"
          data-toggle="modal"
          type="button"
          className="form-control text-decoration-none"
          data-target="#exampleModalCenter"
          onClick={handleShow}
        >
          How's You Feel Today?
        </Link>

        <Button
          className="btn btn-primary bg-primary ms-3"
          onClick={handleShow}
        >
          POST
        </Button>
      </div>

      <div className="d-flex justify-content-around">
        <button className=" btn  d-flex align-items-center justify-content-center my-2 w-50">
          <i className="fa-solid fa-video  text-danger  "></i>
          <h6 className="pt-1 ps-2 ">Live </h6>
        </button>

        <button className="btn  d-flex align-items-center justify-content-center my-2 w-50">
          <i className="fa-solid text-success fa-image "></i>
          <h6 className="pt-1 ps-2">Photo/Video</h6>
        </button>

        <button className="  btn  d-flex align-items-center justify-content-center my-2 w-50">
          <i className="fa-regular fa-face-smile text-warning "></i>
          <h6 className="pt-1 ps-2">Feeling</h6>
        </button>
      </div>
    </div>
  );
};

export default New_Post;
