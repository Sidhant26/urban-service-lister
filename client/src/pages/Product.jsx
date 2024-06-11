import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const Product = ({ selectedProduct }) => {
  const [listSelected, setListSelected] = useState("desc");
  const [sentimentScore, setSentimentScore] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      selectedProduct?.reviews.map((rate) => {
        fetch('http://127.0.0.1:5000/predict?text=${rate.text}')
          .then((res) => res.json())
          .then((data) => {
            console.log(data.scores.compound);
            setSentimentScore((prevScore) => prevScore + data.scores.compound);
          });
      });
    }
  }, [selectedProduct]);
  // console.log("Sentiment Score", sentimentScore);

  const handleReviewSubmit = async () => {
    const response = await fetch(
      "http://localhost:5000/products/" + selectedProduct.id + "/AddReview",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          rating,
          comment: review,
        }),
      }
    );

    if (response.ok) {
      alert("Review submitted successfully");
      setUsername("");
      setRating("");
      setReview("");
    } else {
      alert("Failed to submit review");
    }
  };

  return (
    <section className="product-reviews">
      <Container>
        <ul>
          <li
            style={{ color: listSelected === "desc" ? "white" : "#9c9b9b" }}
            onClick={() => setListSelected("desc")}
          >
            Description
          </li>
          <li
            style={{ color: listSelected === "rev" ? "white" : "#9c9b9b" }}
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
                  alert('Customers overall found this service: ${sentiment}');
                }}
              >
                See what users think about this product
              </button>
            )}
            {/* <p> Overall sentiment for this service is: {sentimentScore}</p> */}
            {selectedProduct?.reviews.map((rate) => (
              <div className="rate-comment" key={rate.rating}>
                <span className="username" style={{ color: "#fff" }}>
                  {rate.username}
                </span>
                <span>{rate.rating}</span>
                <p>{rate.text}</p>
              </div>
            ))}
            <button
              className="btn-primary"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              Write a review
            </button>
          </div>
        )}
        {showReviewForm && (
          <div className="review-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="number"
              placeholder="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <input
              type="text"
              placeholder="Write your review here"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button className="btn-primary" onClick={handleReviewSubmit}>
              Submit
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Product;