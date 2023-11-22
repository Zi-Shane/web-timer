import { seconds2HHMMMS } from "./timer";
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
  return (
    <div className="container">
      <form onSubmit={handleStartClick}>
        <input
          className="timer-box"
          name="HH"
          placeholder="HH"
          type="number"
          min={0}
          defaultValue=""
        />
        :
        <input
          className="timer-box"
          name="MM"
          placeholder="MM"
          type="number"
          min={0}
          max={59}
          defaultValue=""
        />
        :
        <input
          className="timer-box"
          name="SS"
          placeholder="SS"
          type="number"
          min={0}
          max={59}
          defaultValue=""
        />
        <button type="submit">Start</button>
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
