import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState, useEffect } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { ServiceFetch } from "../utils/ServiceFetch";

const Shop = (props) => {
  const services = ServiceFetch();
  // console.log(services);
  const { isLoggedIn } = props;
  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
  }, []);
  const [filterList, setFilterList] = useState(
    products.length > 0
      ? products.filter((item) => item.category === products[0].category)
      : []
  );
  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title="product" />
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect setFilterList={setFilterList} />
            </Col>
            <Col md={8}>
              <SearchBar setFilterList={setFilterList} />
            </Col>
          </Row>
        </Container>
        <Container>
          <ShopList productItems={services} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
