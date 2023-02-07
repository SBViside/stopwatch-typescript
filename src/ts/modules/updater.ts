import { formatter } from "../other/utils";
import { ILap } from "./clock";

export interface IUpdater {
  // VALUE UPDATERS
  hoursHTML: (value: number) => void;
  minutesHTML: (value: number) => void;
  secondsHTML: (value: number) => void;
  millisecondsHTML: (value: number) => void;
  // RESET & LAPS
  resetHTML: () => void;
  clearLaps: () => void;
  updateLaps: (lap: ILap) => void;
}

// UPDATER CLASS
export class Updater implements IUpdater {
  private _hours = document.getElementById("hours") as HTMLElement;
  private _minutes = document.getElementById("minutes") as HTMLElement;
  private _seconds = document.getElementById("seconds") as HTMLElement;
  private _milliseconds = document.getElementById(
    "milliseconds"
  ) as HTMLElement;
  private _laps = document.getElementById("laps") as HTMLElement;

  public hoursHTML(value: number): void {
    this._hours.textContent = formatter(value);
  }
  public minutesHTML(value: number): void {
    this._minutes.textContent = formatter(value);
  }
  public secondsHTML(value: number): void {
    this._seconds.textContent = formatter(value);
  }
  public millisecondsHTML(value: number): void {
    this._milliseconds.textContent = formatter(value);
  }
  public resetHTML(): void {
    this.hoursHTML(0);
    this.minutesHTML(0);
    this.secondsHTML(0);
    this.millisecondsHTML(0);
  }

  public updateLaps(lap: ILap): void {
    if (!this._laps.classList.contains("show"))
      this._laps.classList.add("show");

    this._laps.firstElementChild?.insertAdjacentHTML(
      "afterend",
      `
        <tr class="row">
            <td>${lap.id}</td>
            <td>${lap.time}</td>
        </tr>
        `
    );
  }

  public clearLaps(): void {
    this._laps.innerHTML = `     
        <tbody class="laps__header">            
            <tr>
                <th class="id">ID</th>
                <th class="time">Time</th>
            </tr> 
        </tbody>`;
    this._laps.classList.remove("show");
  }
}
