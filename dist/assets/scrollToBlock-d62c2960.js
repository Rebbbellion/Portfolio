import{menuToggle as o}from"./burger-b5d6f859.js";import"./index-7acdbb37.js";import"./bodyLock-f925f2af.js";const t=document.getElementsByTagName("section");function s(e){document.documentElement.classList.contains("menu-open")&&o(),t.namedItem(e.href.split("#")[1]).scrollIntoView({behavior:"smooth",block:"start"})}export{s as scrollToBlock};