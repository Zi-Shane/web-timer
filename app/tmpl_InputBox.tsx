import "./tmpl_InputBox.css"

export function InputBox() {
    return (
      <div className="body">
        <div className="wrapper">
          <span className="minus">-</span>
          <input className="input-box" />
          {/* <span className="num">00</span> */}
          <span className="plus">+</span>
        </div>
      </div>
    );
  }
  