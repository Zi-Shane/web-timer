import { useRef } from "react";
import { TimerHistory } from "./timerHistory";

export function SetupTimer({
  handleStartClick,
  handleHistoryClick,
  history,
}: {
  handleStartClick: (e: React.FormEvent<HTMLFormElement>) => void;
  handleHistoryClick: (i: number) => void;
  history: number[];
}) {
  const HHInputRef = useRef<HTMLInputElement>(null);
  const MMInputRef = useRef<HTMLInputElement>(null);
  const SSInputRef = useRef<HTMLInputElement>(null);

  /*
    handle >=23 >=59, "". if <0 as nornmal.
  */
  function handlePlusClick(inputElem: React.RefObject<HTMLInputElement>) {
    if (inputElem.current != null) {
      if (inputElem.current.name == "HH") {
        if (parseInt(inputElem.current.value) >= 23) return;
      } else {
        if (parseInt(inputElem.current.value) >= 59) return;
      }

      if (inputElem.current.value) {
        inputElem.current.value = (parseInt(inputElem.current.value) + 1)
          .toString()
          .padStart(2, "0");
      } else {
        // handle empty
        inputElem.current.value = "1".padStart(2, "0");
      }
    }
  }

  /*
    handle <0, "". if >=23 as nornmal.
  */
  function handleMinusClick(inputElem: React.RefObject<HTMLInputElement>) {
    if (inputElem.current != null) {
      if (parseInt(inputElem.current.value) <= 0) return;

      if (inputElem.current.value) {
        inputElem.current.value = (parseInt(inputElem.current.value) - 1)
          .toString()
          .padStart(2, "0");
      } else {
        // handle empty
        if (inputElem.current.name == "HH") {
          inputElem.current.value = "23";
        } else {
          inputElem.current.value = "59";
        }
      }
    }
  }

  return (
    <div className="container">
      <form className="setter-wrapper" onSubmit={handleStartClick}>
        <div className="timer-setter">
          <span className="plus" onClick={() => handlePlusClick(HHInputRef)}>
            +
          </span>
          <input
            className="timer-input"
            name="HH"
            type="number"
            placeholder="00"
            min={0}
            defaultValue="00"
            ref={HHInputRef}
          />
          <span className="minus" onClick={() => handleMinusClick(HHInputRef)}>
            -
          </span>
        </div>
        <div className="timer-setter">
          <span className="plus" onClick={() => handlePlusClick(MMInputRef)}>
            +
          </span>
          <input
            className="timer-input"
            name="MM"
            type="number"
            placeholder="00"
            min={0}
            max={59}
            defaultValue="00"
            ref={MMInputRef}
          />
          <span className="minus" onClick={() => handleMinusClick(MMInputRef)}>
            -
          </span>
        </div>
        <div className="timer-setter">
          <span className="plus" onClick={() => handlePlusClick(SSInputRef)}>
            +
          </span>
          <input
            className="timer-input"
            name="SS"
            type="number"
            placeholder="00"
            min={0}
            max={59}
            defaultValue="00"
            ref={SSInputRef}
          />
          <span className="minus" onClick={() => handleMinusClick(SSInputRef)}>
            -
          </span>
        </div>
        <div>
          <button className="submit-btn btn_text" type="submit">
            Start
          </button>
        </div>
      </form>

      {history.length ? (
        <TimerHistory
          handleHistoryClick={handleHistoryClick}
          history={history}
        />
      ) : (
        ""
      )}
    </div>
  );
}
