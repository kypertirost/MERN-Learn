import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useParams } from "react-router-dom";

const AddReview = props => {
  let initialReviewState = ""

  let editing = false;

  console.log(props);
  // if (props.location.state && props.location.state.currentReview) {
  //   editing = true;
  //   initialReviewState = props.location.state.currentReview.text
  // }
  let { id } = useParams()
  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: id
    };
    RestaurantDataService.createReview(data)
      .then(response => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });


  };

  return (
    <div>
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/restaurants/" + id} className="btn btn-success">
              Back to Restaurant
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="description"> Create Review</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={review}
                onChange={handleInputChange}
                name="text"
              />
            </div>
            <button onClick={saveReview} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>

      ) : (
      <div>
        Please log in.
      </div>
      )}

    </div>
  );
};

export default AddReview;