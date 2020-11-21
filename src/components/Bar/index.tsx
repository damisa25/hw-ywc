import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import logo from "../../assets/logo.png";
import textLogo from "../../assets/text-logo.png";
import { Row, Col, Select, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IData } from "../../interfaces/data.interface";
import {
  faFilter,
  faMapMarkerAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;
const { Search } = Input;

const getAllData = async () => {
  return axios.get("https://panjs.com/ywc18.json");
};

const Bar = () => {
  const [data, setData] = useState<IData>();
  const allData = async () => {
    try {
      const res = await getAllData();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allData();
  }, []);
  return (
    <div className="bar">
      {/* <div className="bar-container"> */}
      <Row>
        <Col xs={4} md={4} lg={5}>
          <div className="box-image">
            <img src={logo} alt="" className="logo" />
            <div className="box-logo2">
              <img src={textLogo} alt="" className="logo2" />
            </div>
          </div>
        </Col>
        <Col xs={20} md={17} lg={19}>
          <div className="desktop">
            <Input.Group style={{ width: "100%" }} compact>
              {/* <div className="display-select"> */}
              <Select
                className="select-location"
                style={{ width: "calc(100% - 80%)" }}
                placeholder={
                  <>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                    {" พื้นที่ใกล้ฉัน "}
                  </>
                }
              >
                {data?.provinces.map((a) => (
                  <Option value={a}>{a}</Option>
                ))}
              </Select>
              {/* </div> */}
              <Select
                showSearch
                style={{ width: "73%" }}
                placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
                allowClear
                showArrow={false}
              >
                {data?.categories.map((a) => (
                  <Option value={a.name}>{a.name}</Option>
                ))}
              </Select>
              <Button className="search-btn">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Input.Group>
          </div>
          <div className="mobile">
            <Input.Group style={{ width: "100%" }} compact>
              <Select
                showSearch
                style={{ width: "80%" }}
                placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
                allowClear
                showArrow={false}
                className="search-input"
              >
                {data?.categories.map((a) => (
                  <Option value={a.name}>{a.name}</Option>
                ))}
              </Select>
              <Button className="search-btn mobile">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Input.Group>
            <Button className="filter-btn">
              <FontAwesomeIcon icon={faFilter} className="filter-icon" />
            </Button>
          </div>
        </Col>
      </Row>
      {/* </div> */}
    </div>
  );
};

export default Bar;
