import { Upload, number_images } from "./Upload";
import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Select from "@material-ui/core/Select";
import { ToastContainer, toast } from "react-toastify";
import InputLabel from "@material-ui/core/InputLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Augment from "./augment";
//import image_ok from "/home/anjalisoni/Downloads/Bosch/frontend/src/assets/uploaded/1.jpg";

import FormControl from "@material-ui/core/FormControl";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
const url = `http://localhost:5000/static/grid/extracted/`;

//console.log("images array", images_array);


const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  card: {},

  text: {
    width: 50,
    height: 30,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  // gridList: {
  //   width: 500,
  //   height: 450,
  // },
}));

const marks = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
];

function valuetext(value) {
  return `${value}`;
}
function valueLabelFormat(value) {
  return `${value}%`;
}

let start = 1;

export default function AddData() {
  const [uploadClass, setuploadClass] = useState("");

  const classes = useStyles();
  const [percent, setPercent] = React.useState(10);

  const samplePercent = {
    sample: percent,
  };

  const handleSample = () => {
    console.log(samplePercent);
    const res = axios.post("http://localhost:5000/sample", samplePercent).then(
      (response) => {
        console.log("response: ", response);
        if (response.data == "OK") {
          toast.success("🦄 Data Sampled succesfully");
        } else {
          toast.error("💀 Error : " + response.data);
        }
      },
      (error) => {
        console.log("error: ", error);
      }
    );
    // window.location.reload();
  };

  const handlePercent = (event, newValue) => {
    setPercent(newValue);
  };

  const [numberImages, setNumberImages] = useState(0);
  

  function handleNoOfImages(no_of_images) {
    console.log('images from addData');
    console.log(no_of_images);
    setNumberImages(no_of_images);
  }
  var images_array = [];

  for (var i = 0; i < 8; i++) {
    images_array.push({
      img:
        "http://localhost:5000/static/grid/extracted/" +
        i.toString() +
        ".png",
      title: i.toString(),
      author: "anjali",
    });
  }
  const classes_dataset = ["U-turn", "Zebra-Crossing", "No Entry"];

  return (
    <div className="content">
      <ToastContainer />

      <Row>
        <Col md="4">
          <Card className="card-user" style={{ height: "45vh" }}>
            <CardHeader>
              <CardTitle tag="h5" style={{ textAlign: "center" }}>
                Add New Data Class Wise
              </CardTitle>
              <p style={{ textAlign: "center" }}>
                <b style={{ fontWeight: "700" }}>Only zip files are accepted</b>
              </p>
            </CardHeader>
            <CardBody>
              <div style={{ height: "-20px" }}>
                <Autocomplete
                  onChange={(event, value) => setuploadClass(value)}
                  id="combo-box-demo"
                  options={classes_dataset}
                  getOptionLabel={(option) => option}
                  style={{ width: 300, height: -10 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Class"
                      variant="outlined"
                    />
                  )}
                />
              </div>

              <div style={{ paddingBottom: "-100px" }}>
                <Upload
                  datasetClass={uploadClass}
                  gridImages={(e) => handleNoOfImages(e)}
                ></Upload>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="card-user" style={{ height: "45vh" }}>
            <CardHeader>
              <CardTitle tag="h5" style={{ textAlign: "center" }}>
                Add New Data
              </CardTitle>
              <p style={{ textAlign: "center" }}>
                <b style={{ fontWeight: "700" }}>Only zip files are accepted</b>
              </p>
            </CardHeader>
            <CardBody>
              <div
                className="description text-center"
                style={{ marginTop: "50px" }}
              >
                <Upload
                  datasetClass={"NULL"}
                  gridImages={(e) => handleNoOfImages(e)}
                ></Upload>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md="4">
          <Card className="card-user" style={{ height: "45vh" }}>
            <CardHeader>
              <CardTitle tag="h5" style={{ textAlign: "center" }}>
                Sample from Existing Data
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="description text-center">
                <div>
                  <Col>
                    <Row style={{ justifyContent: "center" }}>
                      <Typography>Percentage of Sample Data</Typography>
                      <Slider
                        value={percent}
                        min={0}
                        step={5}
                        max={100}
                        style={{ width: "150px" }}
                        marks={[
                          { value: 0, label: "0" },
                          { value: 100, label: "100" },
                        ]}
                        getAriaValueText={valueLabelFormat}
                        valueLabelFormat={valueLabelFormat}
                        onChange={handlePercent}
                        valueLabelDisplay="auto"
                        aria-labelledby="non-linear-slider"
                      />
                    </Row>
                    <Row style={{ justifyContent: "center" }}></Row>
                  </Col>
                </div>
                <Button
                  color="primary"
                  
                  onClick={handleSample}
                  style={{ marginTop: "35px" }}
                >
                  Sample
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="12">
          <Card className="card-user" style={{ height: "auto" }}>
            <CardHeader>
              <CardTitle tag="h5" style={{ textAlign: "center" }}>
                Added Data
              </CardTitle>
            </CardHeader>
            <CardBody>
              {numberImages && <Augment url={url} showDelete={false} images={numberImages}></Augment>}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
