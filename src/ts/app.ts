import { Clock, IClock } from "./modules/clock";
import { Controller, IController } from "./modules/controller";
import { Updater, IUpdater } from "./modules/updater";

// MAIN APP
let clock: IClock | null = null;
const controller: IController = new Controller();
const updater: IUpdater = new Updater();

// HANDLERS
controller._play.addEventListener("click", () => {
  if (clock) {
    clock.getInterval() ? clock.pause() : clock.unpause();
  } else {
    clock = new Clock(controller, updater);
  }
});

controller._lap.addEventListener("click", () => {
  clock?.addLap();
});

controller._reset.addEventListener("click", () => {
  clock?.reset();
});
