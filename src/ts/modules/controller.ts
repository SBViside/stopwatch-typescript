export interface IController {
  _play: HTMLButtonElement;
  _lap: HTMLButtonElement;
  _reset: HTMLButtonElement;

  // FUNCS
  setActive: () => void;
  unsetActive: () => void;
}

export class Controller implements IController {
  // CLOCK ELEMENT
  private _clock = document.getElementById("container") as HTMLElement;
  private _container = document.getElementById("clock") as HTMLElement;
  // ALL CONTROLLER ELEMENTS
  public _play = document.getElementById("play") as HTMLButtonElement;
  public _lap = document.getElementById("lap") as HTMLButtonElement;
  public _reset = document.getElementById("reset") as HTMLButtonElement;

  constructor() {}

  public setActive(): void {
    this.setPauseSVG();
    this._container.classList.add("active");
    this._clock.classList.add("active");
    this._lap.disabled = false;
  }

  public unsetActive(): void {
    this.setPlaySVG();
    this._container.classList.remove("active");
    this._clock.classList.remove("active");
    this._lap.disabled = true;
  }

  private setPlaySVG(): void {
    this._play.innerHTML = `<svg style="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24" xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><g id="info" /><g id="icons"><path d="M3.9,18.9V5.1c0-1.6,1.7-2.6,3-1.8l12,6.9c1.4,0.8,1.4,2.9,0,3.7l-12,6.9C5.6,21.5,3.9,20.5,3.9,18.9z" mid="play" /></g></svg >`;
  }

  private setPauseSVG(): void {
    this._play.innerHTML = `<svg viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg"><path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"/></svg>`;
  }
}
