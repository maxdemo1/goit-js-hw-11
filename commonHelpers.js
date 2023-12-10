import"https://cdn.jsdelivr.net/npm/izitoast@1.4.0/+esm";import{S as m,i as u}from"./assets/vendor-9310f15c.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();const d=document.querySelector(".search-form"),h=d.querySelector('[name="search-query"]'),l=document.querySelector(".loader");let n=document.querySelector(".gallery"),p=new m(".gallery a",{captionsData:"alt",captionDelay:250});const c=new URLSearchParams({key:"41169627-a3aa19c241ef281e8692ca10a",q:"",image_type:"photo",orientation:"horizontal",per_page:"9",safesearch:!0}),g={httpRequest(s){this.removeChilds(),l.style.display="block",fetch(s).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>{e.hits.length>0?this.imagesOnPage(e):this.noResults()}).catch(e=>console.log(e)).finally(()=>{l.style.display="none"})},noResults(){u.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",backgroundColor:"rgb(255, 132, 132)",position:"topRight"})},imagesOnPage(s){let e="";(()=>{s.hits.forEach(o=>{e+=`<li class="gallery-item">
    <a class="gallery-link" href="${o.largeImageURL}">
      <img
        class="gallery-image"
        src="${o.webformatURL}"
        alt="${o.tags}"
      />
    </a>
    <div class="characteristics-container">
      <div class="photo-characteristics">
        <p>Likes</p>
        <p>${o.likes}</p>
      </div>
      <div class="photo-characteristics">
        <p>Views</p>
        <p>${o.views}</p>
      </div>
      <div class="photo-characteristics">
        <p>Comments</p>
        <p>${o.comments}</p>
      </div>
      <div class="photo-characteristics">
        <p>Downloads</p>
        <p>${o.downloads}</p>
      </div>
    </div>
  </li>`})})(),n.insertAdjacentHTML("afterbegin",e),p.refresh(),h.value=""},removeChilds(){n.querySelectorAll(".gallery-item").forEach(e=>{e.remove()})}};d.addEventListener("submit",s=>{s.preventDefault(),c.set("q",h.value.toString());let e=`https://pixabay.com/api?${c}`;g.httpRequest(e)});
//# sourceMappingURL=commonHelpers.js.map
