import { Fragment } from "react";
import { useState, useEffect } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { ServiceFetch } from "../utils/ServiceFetch";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./home.css";
const opencage = require("opencage-api-client");

const Home = (props) => 
{
  const email = localStorage.getItem("email");
  console.log("USER");
  console.log(email);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [showMap, setShowMap] = useState(false);
  const { isLoggedIn } = props;
  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject)
          );

          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        } catch (error) {
          console.error("Error getting location:", error);
        }
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, [location.latitude, location.longitude]);

  const [currentLocation, setCurrentLocation] = useState("");

  opencage
    .geocode({
      q: `${location.latitude}, ${location.longitude}`,
      language: "en",
      key: "0156b6caa8ff4585996cc538128f04ab",
    })
    .then((data) => {
      // console.log(JSON.stringify(data, null, 2));
      if (data.status.code === 200 && data.results.length > 0) {
        // console.log(data.results[0].formatted);
        setCurrentLocation(data.results[0].formatted);
      }
    });

  const services = ServiceFetch();
  // console.log(
  //   "Coords",
  //   services.map((service) => service.location.coordinates)
  // );

  // const coordinatesFromServices = services.map(
  //   (service) => service.location.coordinates
  // );
  // console.log("Coords", coordinatesFromServices);

  const markers = services.map((service) => ({
    geocode: service.location.coordinates,
  }));
  markers.push({ geocode: [location.latitude, location.longitude] });
  // console.log("Markus", markers);

  // console.log(
  //   "Coords",
  //   services.flatMap((service) =>
  //     service.location.coordinates.map((coordinate) => coordinate)
  //   )
  // );

  const filteredServices = services.filter((service) => {
    const [serviceLat, serviceLon] = service?.location.coordinates;
    return (
      Math.abs(serviceLat - location.latitude) <= 0.1 ||
      Math.abs(serviceLon - location.longitude) <= 0.1
    );
  });
  console.log("fil", filteredServices);

  const mapCenter = [location.latitude, location.longitude];
  const userIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776067.png",
    iconSize: [38, 38],
  });
  console.log(typeof services);

  const newArrivalData = products.filter(
    (item) => item.category === "mobile" || item.category === "wireless"
  );
  const bestSales = products.filter((item) => item.category === "sofa");
  useWindowScrollToTop();

  return (
    <Fragment>
      <br></br>
      <button className="btn-primary" onClick={() => setShowMap(!showMap)}>
        Click to view your location and services near you
      </button>
      <br></br>
      {showMap && (
        <p> &nbsp;&#32;Your current location is: {currentLocation}</p>
      )}
      {showMap && (
        <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker position={mapCenter} icon={userIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
          {markers.map((marker) => (
            <Marker position={marker.geocode} icon={userIcon}>
              <Popup>hi</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
      <SliderHome />
      <Wrapper />
      <Section
        title="Customers in your area love:"
        bgColor="#f6f9fc"
        productItems={filteredServices}
      />

      {/* <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      /> */}
      <Section title="Best Sales" bgColor="#f6f9fc" productItems={services} />
    </Fragment>
  );
};

export default Home;
