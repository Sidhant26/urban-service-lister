import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./product-review.css";
import { ServiceFetch } from "../../utils/ServiceFetch";

const ProductReviews = ({ selectedProduct }) => {
  const [listSelected, setListSelected] = useState("desc");
  const [sentimentScore, setSentimentScore] = useState(0);
  const services = ServiceFetch();

  useEffect(() => {
    if (selectedProduct) {
      selectedProduct?.reviews.map((rate) => {
        fetch(`http://127.0.0.1:5000/predict?text=${rate.text}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data.scores.compound);
            setSentimentScore((prevScore) => prevScore + data.scores.compound);
          });
      });
    }
  }, [selectedProduct]);
  console.log("Sentiment Score", sentimentScore);

  // selectedProduct?.reviews.map((rate) => {
  //   console.log("rate", rate.text);
  // });

  return (
    <section className="product-reviews">
      <Container>
        <ul>
          <li
            style={{ color: listSelected === "desc" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("desc")}
          >
            Description
          </li>
          <li
            style={{ color: listSelected === "rev" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("rev")}
          >
            Reviews ({selectedProduct?.reviews.length})
          </li>
        </ul>
        {listSelected === "desc" ? (
          <p>{selectedProduct?.description}</p>
        ) : (
          <div className="rates">
            {selectedProduct?.reviews.length > 0 && (
              <button
                className="btn-primary"
                onClick={() => {
                  const average =
                    sentimentScore / selectedProduct?.reviews.length;
                  let sentiment;
                  if (average >= 0.1) {
                    sentiment = "Positive";
                  } else if (average <= -0.1) {
                    sentiment = "Negative";
                  } else {
                    sentiment = "Neutral";
                  }
                  alert(`Customers overall found this service: ${sentiment}`);
                }}
              >
                See what users think about this product
              </button>
            )}
            {/* <p> Overall sentiment for this service is: {sentimentScore}</p> */}
            {selectedProduct?.reviews.map((rate) => (
              <div className="rate-comment" key={rate.rating}>
                <span className="username">{rate.username}</span>
                <span>{rate.rating}</span>
                <p>{rate.text}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductReviews;
