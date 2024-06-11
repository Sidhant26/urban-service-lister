import React from "react";
import { useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
// import "./admin.css";
// import "./mainstyle.css";
// import "./upload.css";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

function UploadProduct(props) {
  const { isLoggedIn, isAdmin } = props;
  useEffect(() => {
    if (!isLoggedIn || !isAdmin) {
      window.location.href = "/";
    }
  }, []);

  const [showMap, setShowMap] = useState(false);

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  function LocationMarker({ setLocation }) {
    const map = useMapEvents({
      click(e) {
        setLocation({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
        console.log(location);
      },
    });

    return null;
  }

  const [serviceName, setServiceName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [category, setCategory] = useState("");
  const [timesOrdered, setTimesOrdered] = useState(0);

  //   useEffect(() => {
  //     const getLocation = async () => {
  //       if (navigator.geolocation) {
  //         try {
  //           const position = await new Promise((resolve, reject) =>
  //             navigator.geolocation.getCurrentPosition(resolve, reject)
  //           );

  //           setLocation({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           });
  //         } catch (error) {
  //           console.error("Error getting location:", error);
  //         }
  //       } else {
  //         console.error("Geolocation is not supported by this browser.");
  //       }
  //     };

  //     getLocation();
  //   }, [location.latitude, location.longitude]);
  const mapCenter = [location.latitude, location.longitude];

  const handleClick = (e) => {
    alert(e.latlng);
  };

  const uploadService = (e) => {
    e.preventDefault();
    const serviceData = {
      productName: serviceName,
      imgUrl: imgUrl,
      price: price,
      shortDesc: shortDescription,
      description: longDescription,
      category: category,
      timesOrdered: timesOrdered,
    };
    fetch("http://localhost:5000/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="new">
      {/* <Sidebar /> */}
      <div className="newContainer dark">
        <div className="top">
          <h1>Upload a service</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={uploadService}>
              <div className="formInput">
                <label>Service Name</label>
                <input
                  type="text"
                  placeholder="Service Name"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>Image URL</label>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>Short Description</label>
                <input
                  type="text"
                  placeholder="Short Description"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>Long Description</label>
                <input
                  type="text"
                  placeholder="Long Description"
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>Category</label>
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>Times Ordered</label>
                <input
                  type="number"
                  placeholder="Times Ordered"
                  value={timesOrdered}
                  onChange={(e) => setTimesOrdered(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="uploadButton">
                Upload
              </button>
            </form>

            <MapContainer
              center={{ lat: 51.505, lng: -0.09 }}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker setLocation={setLocation} />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadProduct;