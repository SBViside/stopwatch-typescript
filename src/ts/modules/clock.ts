import { formatter } from "../other/utils";
import { IController } from "./controller";
import { IUpdater } from "./updater";

export interface ILap {
  id: number;
  time: string;
}
export interface IClock {
  // MAIN VALUES
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  // OTHER
  laps: ILap[];
  controller: IController;
  updater: IUpdater;
  // METHODS
  pause: () => void;
  unpause: () => void;
  reset: () => void;
  addLap: () => void;
  getInterval: () => number | null;
}

export class Clock implements IClock {
  // MAIN VALUES
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
  public milliseconds: number = 0;
  // OTHER
  public laps: ILap[] = [];
  private interval: number | null = setInterval(
    () => this.incMilliseconds(),
    10
  );

  constructor(public controller: IController, public updater: IUpdater) {
    this.controller.setActive();
  }

  public pause(): void {
    this.controller.unsetActive();
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  public unpause(): void {
    this.controller.setActive();
    this.interval = setInterval(() => this.incMilliseconds(), 10);
  }

  public reset(): void {
    this.controller.unsetActive();
    this.hours = this.minutes = this.seconds = this.milliseconds = 0;
    this.laps = [];

    // RESET STOPWATCH
    this.updater.resetHTML();
    this.updater.clearLaps();

    // CLEAR INTERVAL
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  public addLap(): void {
    if (this.laps.length >= 20) return;

    // CREATING A NEW LAP
    const newLap = {
      id: this.laps.length + 1,
      time: `${formatter(this.hours)}:${formatter(this.minutes)}:${formatter(
        this.seconds
      )},${formatter(this.milliseconds)}`,
    };

    // ADDING THE LAP TO THE LIST AND UPDATING HTML
    this.laps = [newLap, ...this.laps];
    this.updater.updateLaps(newLap);
  }

  public getInterval(): number | null {
    return this.interval;
  }

  private incHours(): void {
    this.hours += 1;
    this.updater.hoursHTML(this.hours);
  }

  private incMinutes(): void {
    this.minutes += 1;
    if (this.minutes === 60) {
      this.minutes = 0;
      this.incHours();
    }
    this.updater.minutesHTML(this.minutes);
  }

  private incSeconds(): void {
    this.seconds += 1;
    if (this.seconds === 60) {
      this.seconds = 0;
      this.incMinutes();
    }
    this.updater.secondsHTML(this.seconds);
  }

  private incMilliseconds(): void {
    this.milliseconds += 1;
    if (this.milliseconds === 100) {
      this.milliseconds = 0;
      this.incSeconds();
    }
    this.updater.millisecondsHTML(this.milliseconds);
  }
}
