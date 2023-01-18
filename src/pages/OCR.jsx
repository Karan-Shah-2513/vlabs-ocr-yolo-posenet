import React from "react";
import { createWorker } from "tesseract.js";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.min.css";
import "./ocr.scss";
// import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";

registerPlugin(FilePondPluginImagePreview);

class OCRsim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: false,
      ocrText: "",
      pctg: "0.00",
    };
    this.pond = React.createRef();
    this.worker = React.createRef();
    this.state.lang = "eng";
    this.updateProgressAndLog = this.updateProgressAndLog.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async doOCR(file) {
    this.setState({
      isProcessing: true,
      ocrText: "",
      pctg: "0.00",
      message: "",
    });
    // Loading tesseract.js functions
    console.log(this.worker);
    await this.worker
      .then((result) => {
        result.load();
        result.loadLanguage(this.state.lang);
        result.initialize(this.state.lang);
      })
      .catch((err) => {
        console.error(err);
      });
    // Loadingg language as 'English'
    console.log("Your language is", this.state.lang);
    // await this.worker.loadLanguage(this.state.lang);
    // await this.worker.initialize(this.state.lang);
    // Sending the File Object into the Recognize function to
    // parse the data
    const {
      data: { text },
    } = await this.worker
      .then((result) => {
        return result.recognize(file.file);
      })
      .catch((err) => {
        console.error(err);
      });

    this.setState({
      isProcessing: false,
      ocrText: text,
    });
  }
  updateProgressAndLog(m) {
    // Maximum value out of which percentage needs to be
    // calculated. In our case it's 0 for 0 % and 1 for Max 100%
    // DECIMAL_COUNT specifies no of floating decimal points in our
    // Percentage
    var MAX_PARCENTAGE = 1;
    var DECIMAL_COUNT = 2;

    if (m.status === "recognizing text") {
      var pctg = (m.progress / MAX_PARCENTAGE) * 100;
      this.setState({
        pctg: pctg.toFixed(DECIMAL_COUNT),
      });
    }
  }
  handleChange(event) {
    this.setState({ lang: event.target.value });
    this.setState({
      ocrText: "",
    });
  }
  componentDidMount() {
    // Logs the output object to Update Progress, which
    // checks for Tesseract JS status & Updates the progress
    this.worker = createWorker({
      logger: (m) => this.updateProgressAndLog(m),
    });
  }
  render() {
    return (
      <div className="OCR">
        <div className="App">
          <Button
            size="sm"
            onClick={() => {
              this.props.history.push("/aboutcourse-ocr");
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
          <div className="title container">
            <p className="titlename">Optical Character Recognition</p>
          </div>
          <div className="body container">
            <div style={{ marginTop: "10%" }} className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <FilePond
                  className="fileupload"
                  ref={(ref) => (this.pond = ref)}
                  acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
                  server={{
                    process: (
                      fieldName,
                      file,
                      metadata,
                      load,
                      error,
                      progress,
                      abort
                    ) => {
                      if (!file.type.includes("image")) {
                        error(new Error("Invalid file type"));
                        this.setState({
                          message: "Please Upload jpg file",
                          isProcessing: false,
                        });
                      } else {
                        load(file.name);
                      }
                    },
                  }}
                  onaddfile={(err, file) => {
                    this.doOCR(file);
                  }}
                  allowMultiple={false}
                  onremovefile={(err, fiile) => {
                    this.setState({
                      ocrText: "",
                      message: "",
                      isProcessing: false,
                    });
                  }}
                  labelIdle={
                    'Drag and Drop image (jpg format) or <span class="filepond--label-action"> Browse </span>'
                  }
                />
              </div>
              <div className="col-md-4">
                <label className="dropdownlist">
                  Select the language:
                  <select
                    className="selectpicker"
                    value={this.state.lang}
                    data-live-search="true"
                    onChange={this.handleChange}
                  >
                    <option value="eng">English</option>
                    <option value="hin">Hindi</option>
                    <option value="fra">French</option>
                    <option value="deu">German</option>
                    <option value="spa">Spanish</option>
                  </select>
                </label>
              </div>

              <p className="errormessage">
                <b>{this.state.message}</b>
              </p>
              <p className="languagetext">
                The code for the selected language is{" "}
                <strong>{this.state.lang}</strong>
              </p>
            </div>
            <div className="card">
              <h5 className="card-header">
                <div
                  style={{ margin: "1%", textAlign: "left" }}
                  className="row"
                >
                  <div className="col-md-12">
                    <span className="status-text">
                      {this.state.isProcessing
                        ? `Processing Image ( ${this.state.pctg} % )`
                        : "Parsed Text"}{" "}
                    </span>
                  </div>
                </div>
              </h5>
              <div className="card-body">
                <p className="card-text">
                  {this.state.isProcessing
                    ? "..........."
                    : this.state.ocrText.length === 0
                    ? "No Valid Text Found / Upload Image to Parse Text From Image"
                    : this.state.ocrText}
                </p>
              </div>
            </div>

            <div className="ocr-text"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default OCRsim;
