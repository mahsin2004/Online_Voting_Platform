"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Feedback.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import Slider from "react-slick";
import FeedbackCard from "../FeedbackCard/FeedbackCard";

const Feedback = () => {
  const [feedbackdata, setFeedbackData] = useState([]);

  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/feedback")
      .then((res) => {
        setFeedbackData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching feedback data:", error);
      });
  }, []);

  const slideRef = useRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1028,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderLeft = () => {
    slideRef.current.slickNext();
  };

  const sliderRight = () => {
    slideRef.current.slickPrev();
  };

  return (
    <div className="project-container max-w-7xl mx-auto mt-10 pb-10">
      <h5 className="text-4xl font-bold text-center">Our Website Feedback</h5>
      <div className="arrow-right" onClick={sliderRight}>
        <span className="icons-1">
          <IoIosArrowBack />{" "}
        </span>
      </div>
      <div className="arrow-left" onClick={sliderLeft}>
        <span className="icons-2">
          {" "}
          <IoIosArrowForward />
        </span>
      </div>
      <div className="project-content">
        <Slider ref={slideRef} {...settings}>
          {feedbackdata.map((item, index) => (
            <FeedbackCard key={index} details={item}></FeedbackCard>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Feedback;
