"use client";

import Timer from "./timer";

function ProgressBar() {
  return (
    <div className="body">
      <div className="container">
        <div className="circular-progress">
          <span className="progress-value">00:00:00</span>
        </div>

        <span className="text">HTML & CSS</span>
      </div>
    </div>
  );
}

function InputBox() {
  return (
    <div className="body">
      <div className="container">
        <span className="minus">-</span>
        <span className="num">0</span>
        <span className="plus">+</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      {/* <ProgressBar /> */}
      {/* <InputBox /> */}
      <Timer />
    </>
  );
}
