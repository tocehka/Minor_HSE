// document.onclick = e => {
//     console.log(e.target.parentElement.id);
//     if(document.getElementById("searchField") !== null){
//         console.log("exist");
//         if(e.target.parentElement.id === "searchId"){
//             var check = true;
//             console.log("true");
//         }
//         if(e.target.id !== "searchId" && check === true){
//             console.log("ds");
//             document.getElementById("searchField").parentNode.removeChild(document.getElementById("searchField"));
//         }
//     }
// }

var query = "sharks";
// ****************************************************************************************
// Блок навигации
var navbar = ["Animals","History","Science","Travels"];

var nav = document.getElementById("header");
nav.className = "nav-block";

var navLogo = document.createElement("div");
navLogo.className = "logo";
navLogo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="300px" viewBox="-194 249.078 1000 293.844" enable-background="new -194 249.078 1000 293.844" xml:space="preserve">
<g>
	<path fill="#FFD520" d="M-194,542.922V249.078H11.045v293.844H-194z M-18.626,513.321V278.677h-145.848v234.644H-18.626z"/>
</g>
</svg>`;
nav.appendChild(navLogo);

for (let i = 0; i < navbar.length; i++){
    let navBlock = document.createElement("div");
    let navElement = document.createElement("a");
    navElement.href = "#";
    navElement.innerText = navbar[i];
    navBlock.className = "nav-element";
    navBlock.appendChild(navElement)
    nav.appendChild(navBlock);
}

var searchIcon = document.createElement("div");
searchIcon.id = "searchId";
searchIcon.className = "search";
searchIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966; color:white;" xml:space="preserve">
<path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
</svg>`;
searchIcon.onclick = () => {
    console.log("cls");
    if (document.getElementById("searchField") === null){
        console.log("lopa");
        let searchField = document.createElement("input");
        searchField.id = "searchField";
        searchField.className = "search-field";
        searchField.placeholder = "Search";
        searchField.onkeypress = e => {
            if(e.code == "Enter"){
                query = searchField.value;
                let url = "https://pixabay.com/api/?key=14219900-d3b784a2ba87f2f4eece98d05&q="+ query +"&image_type=photo&pretty=true";
                AccessApi(url);
            }
        }
        nav.appendChild(searchField);
        nav.style.gridTemplateColumns = "repeat(7,6%)";
    }
}
nav.appendChild(searchIcon);
// ****************************************************************************************


// ****************************************************************************************
// Блок новостной ленты
var newsTitle = ["Личный опыт невыгорания на удалённой работе","«Портативная» ретро-консоль своими руками","Как масштабировать дата-центры. Доклад Яндекса"];
var newsAnnotation = ["Уже не помню когда, и при каких обстоятельствах услышал, что работу нужно менять каждые пять лет. Этого времени достаточно, чтобы достичь профессионализма и… чтобы работа стала рутиной, наскучила. Это первый, хотя и не обязательный шаг к выгоранию. В любом случае, скука ещё никому не добавляла здоровья и могла подтолкнуть к действиям с нехорошими последствиями. Лекарства от рабочей рутины ровно два: либо работа и хобби должны совпадать, либо в жизни должно быть что-то ещё, что придавало бы ей вкус и тягу продолжать жить и работать. В конце концов, мы живём на контрасте. Устаём от одного и получаем отдых в другом.","В данной статье речь пойдет о том, как познать дзен самостоятельной сборки гаджета, о том, что любой опыт это тоже знания, а так же немного ценных советов для тех, кто вдруг решит повторить нечто подобное.","Мы разработали дизайн сети дата-центров, который позволяет разворачивать вычислительные кластеры размером больше 100 тысяч серверов с пиковой полосой бисекции (bisection bandwidth) свыше одного петабайта в секунду."];

var main = document.getElementById("main");
main.className = "main-block";
var sectionNews = document.createElement("section");
sectionNews.className = "section-news";
var dot = "•";
var defaultNews = 0;
var switcher = document.createElement("div");
switcher.id = "switcherId";
switcher.className = "dot-container";
switcher.style.display = "grid";
switcher.style.gridTemplateColumns = "repeat(" + newsTitle.length + ",1%)";
switcher.style.gridColumnGap = "40px";

for (let i = 0; i < newsTitle.length; i++){
    let dots = document.createElement("div");
    dots.innerText = dot;
    switcher.appendChild(dots);
}

var title = document.createElement("div");
title.id = "titleId";
title.className = "section-news-title";

var annotation = document.createElement("div");
annotation.id = "annotationId";
annotation.className = "section-news-annotation";

sectionNews.appendChild(switcher);
sectionNews.appendChild(title);
sectionNews.appendChild(annotation);
main.appendChild(sectionNews);

var prevDots;
var i = 0;
var timeout = 0;
Switch();

function Switch(){   
    if(i < newsTitle.length){
        setTimeout(() => {
            if (prevDots !== undefined){
                prevDots.className = "";
            }
            let dots = document.getElementById("switcherId");
            let dotsChildList = dots.childNodes;
            dotsChildList[i].className = "active";
            prevDots = dotsChildList[i];
            let title = document.getElementById("titleId");
            title.innerText = newsTitle[i];
            let annotation = document.getElementById("annotationId")
            annotation.innerText = newsAnnotation[i];
            i++;
            Switch();
            timeout = 2000;
        }, timeout);
    }else{
        i = 0;
        Switch();
    }
}
// ****************************************************************************************


// Ссылка доступа к API Pixabay
var url = "https://pixabay.com/api/?key=14219900-d3b784a2ba87f2f4eece98d05&q="+ query +"&image_type=photo&pretty=true";
AccessApi(url);
// ****************************************************************************************
// Блок картинок
function AccessApi(url){
    fetch(url,{mode:"cors",credentials:"same-origin"})
    .then(response => response.json())
    .then(data => {
        var main = document.getElementById("main");
        let hits = data.hits;
        if (document.getElementById("sectionPhotoId") === null){
            let photos = document.createElement("section");
            photos.id = "sectionPhotoId";
            photos.className = "section-photo";
            for (let i = 0; i < hits.length; i++){
                let photo = document.createElement("div");
                photo.id = i;
                photo.className = "photo";
                photo.style.backgroundImage = "url(" + hits[i].webformatURL + ")";
                photo.style.width = hits[i].webformatWidth+"px";
                photo.style.height = hits[i].webformatHeight+"px";

                let photoAdd = document.createElement("div");
                photoAdd.className = "photo-add";

                let info = document.createElement("div");
                info.className = "photo-info";

                let type = document.createElement("div");
                type.className = "photo-type";
                type.innerText = query;

                let views = document.createElement("div");
                views.className = "photo-views";
                views.innerText = "views: " + hits[i].views;

                let photoURL = document.createElement("a");
                photoURL.className = "photo-url";
                photoURL.href = hits[i].pageURL;
                photoURL.innerText = "Click to view the photo on Pixabay";

                info.appendChild(type);
                info.appendChild(views);

                photoAdd.appendChild(info);
                photoAdd.appendChild(photoURL);

                photo.appendChild(photoAdd);

                photos.appendChild(photo);
            }
            main.appendChild(photos);
        }else{
            document.getElementById("sectionPhotoId").parentNode.removeChild(document.getElementById("sectionPhotoId"));
            AccessApi(url);
        }
    })
    .catch(err => {console.log(err)})
}
// ****************************************************************************************