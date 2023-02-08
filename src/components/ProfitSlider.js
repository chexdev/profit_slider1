import React from "react";
import { useState, useRef, useEffect } from "react";

function ProfitSlider() {
  const [priceInputValue, setPriceInputValue] = useState("0"); //for user-directed price-input
  const [priceInput, setPriceInput] = useState({
    //set price input values
    0: "0",
    1: "10",
    2: "20",
    3: "30",
    4: "40",
    5: "50",
    6: "60",
    7: "70",
    8: "80",
    9: "90",
  });
  const [priceOutput, setPriceOutput] = useState({
    //set price output values
    kit1: {
      0: ["$", "0"],
      1: ["$", "200"],
      2: ["$", "400"],
      3: ["$", "600"],
      4: ["$", "800"],
      5: ["$", "1000"],
      6: ["$", "1200"],
      7: ["$", "1400"],
      8: ["$", "1600"],
      9: ["$", "1800"],
    },
  });

  const slider = useRef(null); //for slider itself
  const sliderValue = useRef(null); // for the value that is displayed under slider
  let thumbSize = null; //to display thumb image on slider

  useEffect(() => {
    slider.current.setAttribute("min", 0);
    slider.current.setAttribute("max", Object.keys(priceInput).length - 1);
    thumbSize = parseInt(
      window
        .getComputedStyle(sliderValue.current)
        .getPropertyValue("--thumb-size"),
      10
    );
    handleSliderValuePosition(slider.current);
  }, []); // [] - runs only on the 1st render

  const handlePricingSlide = (e) => {
    //handle the slider
    setPriceInputValue(e.target.value);
    handleSliderValuePosition(e.target);
  };

  const handleSliderValuePosition = (input) => {
    //handle the moving value displayed under slider
    const multiplier = input.value / input.max;
    const thumbOffset = thumbSize * multiplier;
    const priceInputOffset = (thumbSize - sliderValue.current.clientWidth) / 2;
    sliderValue.current.style.left =
      input.clientWidth * multiplier - thumbOffset + priceInputOffset + "px";
  };

  // ??? What does this section mean
  const getPricingData = (obj, pos) => {
    return pos !== undefined ? obj[priceInputValue][pos] : obj[priceInputValue];
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header center-content">
        <h1>Profit Calculator</h1>
        <h2>Estimated Profit</h2>
        <h3>SELL MORE, MAKE MORE</h3>
      </div>
      {/* Price Input (Via Slider)*/}
      <div className="pricing">
        <div className="pricing-slider">
          <label className="form-slider">
            <input
              type="range"
              ref={slider}
              defaultValue={priceInputValue}
              onChange={handlePricingSlide}
            />
          </label>
          <div ref={sliderValue} className="pricing-slider-value"></div>
          <div className="pricing-slider-text">
            {getPricingData(priceInput)} kits
          </div>
        </div>
      </div>
      <div className="pricing-slider-footnote">
        Sell {getPricingData(priceInput)} kits and raise <b>$XXXXX(Profit)</b>
      </div>
      {/* Price Output (Via Display) */}
      <div className="pricing-item">
        <div className="pricing-item-title">
          Buy <b>{getPricingData(priceInput)}</b> teatowels @ <b>$20.00</b> and
          sell them @<label for="unit-cost"> $ </label>
          <input
            type="number"
            id="unit-cost"
            name="unit-cost"
            min="0.00"
            max="1000.00"
            step="0.01"
            placeholder="40.00"
          />
          {} each.
        </div>
        <div className="pricing-item-price">
          Total Cost:
          <span className="pricing-item-price-currency">
            {getPricingData(priceOutput.kit1, 0)}
          </span>
          <span className="pricing-item-price-amount">
            {getPricingData(priceOutput.kit1, 1)}
          </span>
        </div>
      </div>
      <div>Total Revenue: $xxx (unit cost*kits)</div>
      <div>Total Profit (Revenue-Cost): $xxx</div>
    </div>
  );
}

export default ProfitSlider;
