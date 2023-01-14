import PoseNet from "react-posenet";
import React, { useState, Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalExample = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={!modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          <b> PoseNet Simulation </b>
        </ModalHeader>
        <ModalBody>
          <p>Here is the simulation of the PoseNet model</p>
          <p>
            Below are the co-ordinates being displayed for the pose that is
            estimated
          </p>
          <p>
            Hope you Enjoy playing with all this model simulations and
            algorithms.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Start Simulation
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};
class PosenetSim extends Component {
  state = {
    posesString: "",
  };

  render() {
    return (
      <React.Fragment>
        <Button
          size="sm"
          onClick={() => {
            this.props.history.push("/aboutcourse-posenet");
          }}
          style={{
            width: 150,
            margin: "auto",
            fontWeight: "bold",
            border: "2px solid",
          }}
        >
          Back To About Course
        </Button>
        {/* <Modal isOpen="True">
          <ModalHeader closeButton>
            PoseNet Simulation
          </ModalHeader>
  
          <ModalBody>
            <p>Here is the simulation of the PoseNet model</p>
            <p>Below are the co-ordinates being displayed for the pose that is estimated</p>
            <p>Hope you Enjoy playing with all this model simulations and algorithms.</p>
          </ModalBody>
  
          <ModalFooter>
            <Button variant="primary" onClick={toggle}>Start</Button>
          </ModalFooter>
        </Modal> */}

        <ModalExample />

        <br></br>
        <h2
          class="page-section-heading text-center text-uppercase  mb-0"
          style={{ color: "#1e90b6" }}
        >
          {" "}
          <b> PoseNet Simulation </b>
        </h2>
        <br></br>
        <div
          className="container"
          style={{
            border: "2px solid #1e90b6",
            width: "80%",
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PoseNet
            style={{ width: "90%", height: "90%" }}
            inferenceConfig={{ decodingMethod: "single-person" }}
            onEstimate={(poses) => {
              this.setState({ posesString: JSON.stringify(poses) });
            }}
          />
        </div>
        <br></br>
        <div
          className="container"
          style={{ border: "2px solid #1e90b6", width: "80%" }}
        >
          <br></br>
          <h3 class="page-section-heading text-center text-uppercase  mb-0">
            {" "}
            <b> PoseNet Co-ordinates </b>
          </h3>
          <br></br>
          <p class="mb-5" style={{ color: "#1e90b6" }}>
            {this.state.posesString}
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default PosenetSim;
