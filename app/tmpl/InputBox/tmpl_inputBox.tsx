import "./tmpl_InputBox.css"

export function Tmpl_InputBox() {
    return (
      <div className="body">
        <div className="wrapper">
          <span className="minus">-</span>
          <input className="input-box" value="00"/>
          {/* <span className="num">00</span> */}
          <span className="plus">+</span>
        </div>
      </div>
    );
  }
  