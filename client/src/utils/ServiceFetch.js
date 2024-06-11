import React from "react";
import { useEffect, useState } from "react";

export const ServiceFetch = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    if (services.length === 0) {
      fetch("http://localhost:5000/products/getAllProducts")
        .then((res) => res.json())
        .then((data) => {
          setServices(data);
          // console.log(data);
        })
        .catch((error) => console.error("Error fetching services:", error));
    }
  }, []);

  return services;
};
