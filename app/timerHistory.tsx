import { seconds2HHMMMS } from "./timer";

export function TimerHistory({
  handleHistoryClick,
  history,
}: {
  handleHistoryClick: (i: number) => void;
  history: number[];
}) {
  return (
    <div className="history">
      <span>Others</span>
      {history.map((item, i) => {
        let [historyHH, historyMM, historySS, _] = seconds2HHMMMS(item);
        return (
          <div key={i} className="text" onClick={() => handleHistoryClick(i)}>
            <span className="text">
              {historyHH.toString().padStart(2, "0")}:
            </span>
            <span className="text">
              {historyMM.toString().padStart(2, "0")}:
            </span>
            <span className="text">
              {historySS.toString().padStart(2, "0")}
            </span>
          </div>
        );
      })}
    </div>
  );
}
