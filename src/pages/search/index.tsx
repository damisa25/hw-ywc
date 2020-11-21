import React, { useState, useEffect } from "react";
import "./index.scss";
import "../../index.scss";
import axios from "axios";
import Bar from "../../components/Bar/index";
import {
  Row,
  Breadcrumb,
  Col,
  Radio,
  Select,
  Card,
  Avatar,
  Tag,
  Divider,
  Spin,
  List,
  Button,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarSide,
  faStickyNote,
  faPaw,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { IData } from "../../interfaces/data.interface";

const { Option } = Select;
const { Meta } = Card;

const getAllData = async () => {
  return axios.get("https://panjs.com/ywc18.json");
};

const Main = () => {
  const [data, setData] = useState<IData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [d, setD] = useState<Array<any> | undefined>([
    "อาหารทั่วไป อาหารตามสั่ง อาหารจานเดียว",
    "ก๋วยเตี๋ยว ก๋วยจั๊บ",
    "ชาบู สุกี้ยากี้ หม้อไฟ",
    "ปิ้งย่าง หมูกะทะ",
    "ของหวาน ไอศกรีม เบเกอรี่ เครื่องดื่ม",
    "ผับ ร้านเหล้า บาร์",
    "ร้านขายผลไม้ / ร้านขายผัก",
    "ร้านอาหารอีสาน",
    "ร้านอาหารญี่ปุ่น",
    "ข้าวต้ม โจ๊ก เกาเหลา",
    "คาราโอเกะ",
    "บุฟเฟ่ต์",
    "บุฟเฟ่ต์โรงแรม",
    "พิซซ่า ฟาสต์ฟู้ด จานด่วน",
    "พิซซ่า ฟาสต์ฟู้ด จานด่วน",
    "อาหารจีน",
    "อาหารเจ มังสวิรัติ สุขภาพ",
    "อาหารใต้",
    "อาหารทะเล",
    "อาหารนานาชาติ",
    "อาหารมุสลิม อิสลาม",
    "อาหารเวียดนาม",
    "อาหารอินเดีย",
    "อาหารเหนือ",
    "อาหารว่าง ขนม ของกินเล่น",
    "อื่นๆ",
  ]);
  const [subName, setSubName] = useState<string>("");
  const allData = async () => {
    try {
      const res = await getAllData();
      setData(res.data);
      //   console.log(data);
      if (data) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allData();
  }, []);

  const handleChangeFilter = (e) => {
    // console.log(e.target.value);
    const result = data?.categories.filter((a) => {
      if (e.target.value === a?.name) {
        // console.log(a?.subcategories);
        const sub = a.subcategories;
        setD(a.subcategories);
        setSubName(a.name);
        return sub;
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    setSubName("ร้านอาหารและเครื่องดื่ม");
  }, []);

  return (
    <div className="search">
      <Spin spinning={loading}>
        {/* {data ? console.log(data.categories) : "jj"} */}
        <Bar />
        <Row className="breadcrumb-row">
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/" className="breadcrumb-text underline">
                หน้าแรก
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="breadcrumb-text">ค้นหา</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="title-text">ผลการค้นหา {subName}</Row>
        <div className="container">
          <Row>
            <Col xs={0} md={10} lg={8} className="filter-box">
              <Row className="title-filter">ประเภทร้านค้า</Row>
              <Radio.Group
                onChange={(e) => {
                  handleChangeFilter(e);
                }}
                defaultValue="ร้านอาหารและเครื่องดื่ม"
              >
                <List
                  itemLayout="horizontal"
                  dataSource={data?.categories}
                  renderItem={(item) => (
                    <List.Item className="mb-row pd-row">
                      <Row>
                        <Radio value={item?.name}>{item?.name}</Radio>
                      </Row>
                    </List.Item>
                  )}
                />
              </Radio.Group>
              <Row className="title-filter">จังหวัด/ใกล้ฉัน</Row>
              <Row className="mb-row">
                <Select
                  placeholder={
                    <>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                      {" พื้นที่ใกล้ฉัน "}
                    </>
                  }
                  style={{ width: "100%" }}
                >
                  {data?.provinces.map((a) => (
                    <Option value={a}>{a}</Option>
                  ))}
                </Select>
              </Row>
              <Row className="title-filter">ราคา</Row>
              <Row className="mb-row">
                <Select placeholder="กรุณาเลือก" style={{ width: "100%" }}>
                  {data?.priceRange.map((a) => (
                    <Option value={a}>{a}</Option>
                  ))}
                </Select>
              </Row>
              <Row className="title-filter">ประเภท{subName}</Row>
              {d === undefined ? null : (
                <Radio.Group>
                  <List
                    itemLayout="horizontal"
                    dataSource={d}
                    renderItem={(item) => (
                      <List.Item className="mb-row pd-row">
                        <Row>
                          <Radio value={item}>{item}</Radio>
                        </Row>
                      </List.Item>
                    )}
                  />
                </Radio.Group>
              )}
            </Col>
            <Col xs={20} md={14} lg={16}>
              <div className="desktop-card">
                <List
                  itemLayout="horizontal"
                  dataSource={data?.merchants}
                  renderItem={(item) => (
                    <List.Item className="card-list ">
                      <Card style={{ marginLeft: 15 }} className="card-d">
                        <Meta
                          avatar={
                            <Avatar
                              shape="square"
                              size="large"
                              src={item.coverImageId}
                            />
                          }
                          //   title="Card title"
                          description={
                            <div className="card-detail">
                              <Row align="middle">
                                <Col>
                                  <div className="title">{item.shopNameTH}</div>
                                </Col>
                                {item.isOpen === "Y" ? (
                                  <Col className="box-tag">
                                    <Tag color="#2dd253">เปิดอยู่</Tag>
                                  </Col>
                                ) : item.isOpen === "N" ? (
                                  <Col className="box-tag">
                                    <Tag color="#6c757d">ปิดแล้ว</Tag>
                                  </Col>
                                ) : null}
                              </Row>
                              <div className="sub-title">
                                {item.subcategoryName}{" "}
                                <Divider type="vertical" />{" "}
                                {item.priceLevel === 1 ? (
                                  <>
                                    <span className="price-level">฿</span>
                                    <span>฿฿฿</span>
                                  </>
                                ) : item.priceLevel === 2 ? (
                                  <>
                                    <span className="price-level">฿฿</span>
                                    <span>฿฿</span>
                                  </>
                                ) : item.priceLevel === 3 ? (
                                  <>
                                    <span className="price-level">฿฿฿</span>
                                    <span>฿</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="price-level">฿฿฿฿</span>
                                  </>
                                )}
                                <Divider type="vertical" />{" "}
                                {item.addressDistrictName}
                                {"   "}
                                {item.addressProvinceName}
                              </div>
                              <Divider />
                              <div>
                                {item.highlightText !== undefined
                                  ? item.highlightText
                                      .split("<strong>")
                                      .join("")
                                      .split("</strong>")
                                  : null}
                              </div>
                              <div className="bolder-text">
                                เมนูแนะนำ:
                                <span className="lighter-text">
                                  {item.recommendedItems}
                                </span>
                              </div>
                              <Row style={{ marginTop: 15 }}>
                                {item.facilities.includes("ที่จอดรถ") &&
                                item.facilities.includes("รับจองล่วงหน้า") &&
                                item.facilities.includes(
                                  "สามารถนำสัตว์เลี้ยงเข้าได้"
                                ) ? (
                                  <>
                                    <Col>
                                      <Tag
                                        className="reccommend-tag"
                                        icon={
                                          <FontAwesomeIcon
                                            icon={faCarSide}
                                            className="car-tag"
                                          />
                                        }
                                      />
                                    </Col>
                                    <Col>
                                      <Tag
                                        className="reccommend-tag"
                                        icon={
                                          <FontAwesomeIcon
                                            icon={faStickyNote}
                                            className="tag-icon"
                                          />
                                        }
                                      />
                                    </Col>
                                    <Col>
                                      <Tag
                                        className="reccommend-tag"
                                        icon={
                                          <FontAwesomeIcon
                                            icon={faPaw}
                                            className="tag-icon"
                                          />
                                        }
                                      />
                                    </Col>
                                  </>
                                ) : item.facilities.includes("ที่จอดรถ") &&
                                  item.facilities.includes("รับจองล่วงหน้า") ? (
                                  <>
                                    <Col>
                                      <Tag
                                        className="reccommend-tag"
                                        icon={
                                          <FontAwesomeIcon
                                            icon={faCarSide}
                                            className="car-tag"
                                          />
                                        }
                                      />
                                    </Col>
                                    <Col>
                                      <Tag
                                        className="reccommend-tag"
                                        icon={
                                          <FontAwesomeIcon
                                            icon={faStickyNote}
                                            className="tag-icon"
                                          />
                                        }
                                      />
                                    </Col>
                                  </>
                                ) : item.facilities.includes("ที่จอดรถ") &&
                                  item.facilities.includes(
                                    "สามารถนำสัตว์เลี้ยงเข้าได้"
                                  ) ? (
                                  <>
                                    <Col>
                                      <Tag
                                        className="reccommend-tag"
                                        icon={
                                          <FontAwesomeIcon
                                            icon={faCarSide}
                                            className="car-tag"
                                          />
                                        }
                                      />
                                    </Col>
                                    <Col>
                                      <Tag
                                        className="reccommend-tag"
                                        icon={
                                          <FontAwesomeIcon
                                            icon={faPaw}
                                            className="tag-icon"
                                          />
                                        }
                                      />
                                    </Col>
                                  </>
                                ) : (
                                  <Tag
                                    className="reccommend-tag"
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faCarSide}
                                        className="car-tag"
                                      />
                                    }
                                  />
                                )}
                              </Row>
                            </div>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
                <Row className="load-more">
                  <Button className="load-more-btn">Load more</Button>
                </Row>
              </div>
              <div className="mobile-card">
                <List
                  itemLayout="horizontal"
                  dataSource={data?.merchants}
                  renderItem={(item) => (
                    <List.Item className="card-list-mobile">
                      <Card
                        className="card-m"
                        cover={<img alt="" src={item.coverImageId} />}
                      >
                        <div className="card-detail">
                          <Row align="middle">
                            <Col>
                              <div className="title">{item.shopNameTH}</div>
                            </Col>
                            {item.isOpen === "Y" ? (
                              <Col className="box-tag">
                                <Tag color="#2dd253">เปิดอยู่</Tag>
                              </Col>
                            ) : item.isOpen === "N" ? (
                              <Col className="box-tag">
                                <Tag color="#6c757d">ปิดแล้ว</Tag>
                              </Col>
                            ) : null}
                          </Row>
                          <div className="sub-title">
                            {item.subcategoryName} <Divider type="vertical" />{" "}
                            {item.priceLevel === 1 ? (
                              <>
                                <span className="price-level">฿</span>
                                <span>฿฿฿</span>
                              </>
                            ) : item.priceLevel === 2 ? (
                              <>
                                <span className="price-level">฿฿</span>
                                <span>฿฿</span>
                              </>
                            ) : item.priceLevel === 3 ? (
                              <>
                                <span className="price-level">฿฿฿</span>
                                <span>฿</span>
                              </>
                            ) : (
                              <>
                                <span className="price-level">฿฿฿฿</span>
                              </>
                            )}
                            <Divider type="vertical" />{" "}
                            {item.addressDistrictName}
                            {"   "}
                            {item.addressProvinceName}
                          </div>
                          <Divider />
                          <div>
                            {item.highlightText !== undefined
                              ? item.highlightText
                                  .split("<strong>")
                                  .join("")
                                  .split("</strong>")
                              : null}
                          </div>
                          <div className="bolder-text">
                            เมนูแนะนำ:
                            <span className="lighter-text">
                              {item.recommendedItems}
                            </span>
                          </div>
                          <Row style={{ marginTop: 15 }}>
                            {item.facilities.includes("ที่จอดรถ") &&
                            item.facilities.includes("รับจองล่วงหน้า") &&
                            item.facilities.includes(
                              "สามารถนำสัตว์เลี้ยงเข้าได้"
                            ) ? (
                              <>
                                <Col>
                                  <Tag
                                    className="reccommend-tag"
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faCarSide}
                                        className="car-tag"
                                      />
                                    }
                                  />
                                </Col>
                                <Col>
                                  <Tag
                                    className="reccommend-tag"
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faStickyNote}
                                        className="tag-icon"
                                      />
                                    }
                                  />
                                </Col>
                                <Col>
                                  <Tag
                                    className="reccommend-tag"
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faPaw}
                                        className="tag-icon"
                                      />
                                    }
                                  />
                                </Col>
                              </>
                            ) : item.facilities.includes("ที่จอดรถ") &&
                              item.facilities.includes("รับจองล่วงหน้า") ? (
                              <>
                                <Col>
                                  <Tag
                                    className="reccommend-tag"
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faCarSide}
                                        className="car-tag"
                                      />
                                    }
                                  />
                                </Col>
                                <Col>
                                  <Tag
                                    className="reccommend-tag"
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faStickyNote}
                                        className="tag-icon"
                                      />
                                    }
                                  />
                                </Col>
                              </>
                            ) : item.facilities.includes("ที่จอดรถ") &&
                              item.facilities.includes(
                                "สามารถนำสัตว์เลี้ยงเข้าได้"
                              ) ? (
                              <>
                                <Col>
                                  <Tag
                                    className="reccommend-tag"
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faCarSide}
                                        className="car-tag"
                                      />
                                    }
                                  />
                                </Col>
                                <Col>
                                  <Tag
                                    className="reccommend-tag"
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faPaw}
                                        className="tag-icon"
                                      />
                                    }
                                  />
                                </Col>
                              </>
                            ) : (
                              <Tag
                                className="reccommend-tag"
                                icon={
                                  <FontAwesomeIcon
                                    icon={faCarSide}
                                    className="car-tag"
                                  />
                                }
                              />
                            )}
                          </Row>
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
                <Row className="load-more">
                  <Button className="load-more-btn mobile-btn">
                    Load more
                  </Button>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default Main;
