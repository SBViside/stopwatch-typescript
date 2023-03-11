var h=Object.defineProperty;var u=(i,t,n)=>t in i?h(i,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[t]=n;var e=(i,t,n)=>(u(i,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))d(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerpolicy&&(l.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?l.credentials="include":s.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function d(s){if(s.ep)return;s.ep=!0;const l=n(s);fetch(s.href,l)}})();function o(i){return i<10?`0${i}`:`${i}`}class m{constructor(t,n){e(this,"hours",0);e(this,"minutes",0);e(this,"seconds",0);e(this,"milliseconds",0);e(this,"laps",[]);e(this,"interval",setInterval(()=>this.incMilliseconds(),10));this.controller=t,this.updater=n,this.controller.setActive()}pause(){this.controller.unsetActive(),this.interval&&clearInterval(this.interval),this.interval=null}unpause(){this.controller.setActive(),this.interval=setInterval(()=>this.incMilliseconds(),10)}reset(){this.controller.unsetActive(),this.hours=this.minutes=this.seconds=this.milliseconds=0,this.laps=[],this.updater.resetHTML(),this.updater.clearLaps(),this.interval&&clearInterval(this.interval),this.interval=null}addLap(){if(this.laps.length>=20)return;const t={id:this.laps.length+1,time:`${o(this.hours)}:${o(this.minutes)}:${o(this.seconds)},${o(this.milliseconds)}`};this.laps=[t,...this.laps],this.updater.updateLaps(t)}getInterval(){return this.interval}incHours(){this.hours+=1,this.updater.hoursHTML(this.hours)}incMinutes(){this.minutes+=1,this.minutes===60&&(this.minutes=0,this.incHours()),this.updater.minutesHTML(this.minutes)}incSeconds(){this.seconds+=1,this.seconds===60&&(this.seconds=0,this.incMinutes()),this.updater.secondsHTML(this.seconds)}incMilliseconds(){this.milliseconds+=1,this.milliseconds===100&&(this.milliseconds=0,this.incSeconds()),this.updater.millisecondsHTML(this.milliseconds)}}class p{constructor(){e(this,"_clock",document.getElementById("container"));e(this,"_container",document.getElementById("clock"));e(this,"_play",document.getElementById("play"));e(this,"_lap",document.getElementById("lap"));e(this,"_reset",document.getElementById("reset"))}setActive(){this.setPauseSVG(),this._container.classList.add("active"),this._clock.classList.add("active"),this._lap.disabled=!1}unsetActive(){this.setPlaySVG(),this._container.classList.remove("active"),this._clock.classList.remove("active"),this._lap.disabled=!0}setPlaySVG(){this._play.innerHTML=`<svg style="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24" xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><g id="info" /><g id="icons"><path d="M3.9,18.9V5.1c0-1.6,1.7-2.6,3-1.8l12,6.9c1.4,0.8,1.4,2.9,0,3.7l-12,6.9C5.6,21.5,3.9,20.5,3.9,18.9z" mid="play" /></g></svg >`}setPauseSVG(){this._play.innerHTML='<svg viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg"><path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"/></svg>'}}class v{constructor(){e(this,"_hours",document.getElementById("hours"));e(this,"_minutes",document.getElementById("minutes"));e(this,"_seconds",document.getElementById("seconds"));e(this,"_milliseconds",document.getElementById("milliseconds"));e(this,"_laps",document.getElementById("laps"))}hoursHTML(t){this._hours.textContent=o(t)}minutesHTML(t){this._minutes.textContent=o(t)}secondsHTML(t){this._seconds.textContent=o(t)}millisecondsHTML(t){this._milliseconds.textContent=o(t)}resetHTML(){this.hoursHTML(0),this.minutesHTML(0),this.secondsHTML(0),this.millisecondsHTML(0)}updateLaps(t){var n;this._laps.classList.contains("show")||this._laps.classList.add("show"),(n=this._laps.firstElementChild)==null||n.insertAdjacentHTML("afterend",`
        <tr class="row">
            <td>${t.id}</td>
            <td>${t.time}</td>
        </tr>
        `)}clearLaps(){this._laps.innerHTML=`     
        <tbody class="laps__header">            
            <tr>
                <th class="id">ID</th>
                <th class="time">Time</th>
            </tr> 
        </tbody>`,this._laps.classList.remove("show")}}let r=null;const c=new p,L=new v;c._play.addEventListener("click",()=>{r?r.getInterval()?r.pause():r.unpause():r=new m(c,L)});c._lap.addEventListener("click",()=>{r==null||r.addLap()});c._reset.addEventListener("click",()=>{r==null||r.reset()});
