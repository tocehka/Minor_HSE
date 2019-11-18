// Пока не требуется в объяснении
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

// Инициализируем переменную query, которая содержит в себе объект запроса (кошечки, собачки) к API,
// дабы в дальнейшем ее использовать
var query = "stars";
// ****************************************************************************************
// Блок навигации
// Список элементов навигации
var navbar = ["Animals","History","Science","Travels"];

// Берем объект header для дальнейшей с ним работы
var nav = document.getElementById("header");
// Присваиваем ему класс
nav.className = "nav-block";

// Создаем элемент div, в котором будет содержаться логотип в виде SVG, однако пока ее в DOM (document object model)
// он отображаться не будет, так как мы его не засунули в реально существующий объект в HTML
var navLogo = document.createElement("div");
navLogo.className = "logo";
// Вставляем внутрь div html с svg
navLogo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="300px" viewBox="-194 249.078 1000 293.844" enable-background="new -194 249.078 1000 293.844" xml:space="preserve">
<g>
	<path fill="#FFD520" d="M-194,542.922V249.078H11.045v293.844H-194z M-18.626,513.321V278.677h-145.848v234.644H-18.626z"/>
</g>
</svg>`;
// Наконец засовываем в существующий html объект header, который содержится в переменной nav
nav.appendChild(navLogo);

// Задаем цикл для всех элементов списка навигации navbar
// То есть у нас поочередно создаются и запихиваются в nav элементы из списка
for (let i = 0; i < navbar.length; i++){
    let navBlock = document.createElement("div");
    let navElement = document.createElement("a");
    // В атрибут href пихаем "пустую ссылку"
    navElement.href = "#";
    // Пишем внутрь тэга текст из navbar
    navElement.innerText = navbar[i];
    navBlock.className = "nav-element";
    navBlock.appendChild(navElement)
    nav.appendChild(navBlock);
}

// Создадим иконку поиска
var searchIcon = document.createElement("div");
// Присвоем ей ID для более удобной работы с объектом в дальнейшем
searchIcon.id = "searchId";
searchIcon.className = "search";
searchIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966; color:white;" xml:space="preserve">
<path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
</svg>`;

// Здесь мы создаем событие для иконки: то есть при нажатии левой кнопкой мыши на элемент у нас будут происходить следующие
// действия
searchIcon.onclick = () => {
    // Проверка на то, что элемента input с id SearchField не существует, чтобы их не создавалось бесконечное количество
    // при нажатии. Если элемент еще не создан, то при попытке взять его получим null
    if (document.getElementById("searchField") === null){
        // Создаем объект, содержащий в себе тег input (тег для ввода информации)
        let searchField = document.createElement("input");
        searchField.id = "searchField";
        searchField.className = "search-field";
        // В атрибут placeholder напишем Search (этот атрибут показывает некий подсказочный текст, пока поле input пустое)
        searchField.placeholder = "Search";
        // Далее создадим событие, которое будет проверять нажатие клавищи для тега input (в нашем случае enter)
        // В анонимную callback функцию внутри мы передаем параметр e, который содержит в себе информацию о событии
        // Для большего понимания прочитайте про событийную модель в js и callback функции внутри событий
        searchField.onkeypress = e => {
            // Проверяем, что код клавиши, на которую мы нажали, равен Enter
            if(e.code == "Enter"){
                // Тогда мы берем нашу информацию из поля ввода input, которая хранится в атрибуте value, подставляем ее в наш
                // url-запрос, и вызываем функцию, которая обращается к API и перерисовывает страницу
                query = searchField.value;
                let url = "https://pixabay.com/api/?key=14219900-d3b784a2ba87f2f4eece98d05&q="+ query +"&image_type=photo&pretty=true";
                AccessApi(url);
            }
        }
        nav.appendChild(searchField);
        // Нам надо изменить шаблон грида, поскольку у нас добавился 7-й элемент в навигации (input поле)
        nav.style.gridTemplateColumns = "repeat(7,6%)";
    }
}
// Просто добавляем иконку поиска в html, напомню, что событие будет происходить только при клике на иконку
// Выше описаны действия, которые обрабатывают события и создают необходимые объекты
nav.appendChild(searchIcon);
// ****************************************************************************************


// ****************************************************************************************
// Блок новостной ленты

// Список тайтлов
var newsTitle = ["Личный опыт невыгорания на удалённой работе","«Портативная» ретро-консоль своими руками","Как масштабировать дата-центры. Доклад Яндекса"];
// Список аннотаций
var newsAnnotation = ["Уже не помню когда, и при каких обстоятельствах услышал, что работу нужно менять каждые пять лет. Этого времени достаточно, чтобы достичь профессионализма и… чтобы работа стала рутиной, наскучила. Это первый, хотя и не обязательный шаг к выгоранию. В любом случае, скука ещё никому не добавляла здоровья и могла подтолкнуть к действиям с нехорошими последствиями. Лекарства от рабочей рутины ровно два: либо работа и хобби должны совпадать, либо в жизни должно быть что-то ещё, что придавало бы ей вкус и тягу продолжать жить и работать. В конце концов, мы живём на контрасте. Устаём от одного и получаем отдых в другом.","В данной статье речь пойдет о том, как познать дзен самостоятельной сборки гаджета, о том, что любой опыт это тоже знания, а так же немного ценных советов для тех, кто вдруг решит повторить нечто подобное.","Мы разработали дизайн сети дата-центров, который позволяет разворачивать вычислительные кластеры размером больше 100 тысяч серверов с пиковой полосой бисекции (bisection bandwidth) свыше одного петабайта в секунду."];

// Далее вам уже должно быть все понятно
var main = document.getElementById("main");
main.className = "main-block";
// Создадим тег секции (в принципе аналог div, только спецификация html5), в котором будут переключающиеся новости
var sectionNews = document.createElement("section");
sectionNews.className = "section-news";
// Созадим переменную, содержащую точку, чтобы каждый раз ctrl+c ctrl+v не делать
var dot = "•";
// Создадим контейнер точек, показывающих движение новостей
var switcher = document.createElement("div");
switcher.id = "switcherId";
switcher.className = "dot-container";
// Задаем стили для контейнера точек прям в js
switcher.style.display = "grid";
switcher.style.gridTemplateColumns = "repeat(" + newsTitle.length + ",1%)";
// Свойство расстояний между колонками
switcher.style.gridColumnGap = "20px";

// В цикле добавляем точки в зависимости от того, сколько новостей
for (let i = 0; i < newsTitle.length; i++){
    let dots = document.createElement("div");
    dots.innerText = dot;
    switcher.appendChild(dots);
}

// Контейнер для тайтлов
var title = document.createElement("div");
title.id = "titleId";
title.className = "section-news-title";
// Контейнер для аннотаций
var annotation = document.createElement("div");
annotation.id = "annotationId";
annotation.className = "section-news-annotation";

// Вносим все созданные теги, но пока они пустые (в них нет никакого текста)
// Вносим их сейчас в DOM для того, чтобы в дальнейшем просто обращаться к элементу, класть в него текст и перерисовывать
sectionNews.appendChild(switcher);
sectionNews.appendChild(title);
sectionNews.appendChild(annotation);
main.appendChild(sectionNews);

// Создадим переменную prevDots (предыдущая точка) вне нашей функции, чтобы мы могли делать проверку на то,
// что у нас существует предыдущая точка с классом active (типа актуальная на странице новость), показывающая условный
// порядок меняющихся новостей.
var prevDots;

// Создадим переменную i для счетчика показанных новостей
var i = 0;
// Переменная timeout создается здесь для начальной отрисовки новости с нулевой задержкой
var timeout = 0;
// Вызов функции
Switch();

// Функция Switch делает смену новостей раз в две секунды с помощью асинхронной функции js setTimeout
function Switch(){
    // Выполняем отрисовку, пока счетчик меньше количества новостей (не забываем, что индексация массива начинается с 0) 
    if(i < newsTitle.length){
        // Вызываем setTimeout, которая в аргументах принимает анонимную функцию (в данном случае) и timeout, который
        // после первой отрисовки становится равен 2000 милисекунд (то есть 2 секунды)
        setTimeout(() => {
            // Проверяем, существует ли предыдущая точка (проверка для первой отрисовки), если не равно undefined
            // то есть переменная не prevDots не пустая, то мы убираем класс active
            if (prevDots !== undefined){
                prevDots.className = "";
            }
            // Берем наш контейнер с точками
            let dots = document.getElementById("switcherId");
            // Получаем список всех дочерних элементов внутри (то есть наши точки)
            let dotsChildList = dots.childNodes;
            // Переменная выше является списком, значит имеет целые индексы 0,1,2...
            // Таким образом, мы можем установить класс active для определенной точки
            dotsChildList[i].className = "active";
            // В переменную  prevDots заносим текущую точку, чтобы при следующем вызове функции, ее можно было сделать не активной
            prevDots = dotsChildList[i];
            // Ниже берем элементы для тайтла и аннотации и вставляем информацию из списков
            let title = document.getElementById("titleId");
            title.innerText = newsTitle[i];
            let annotation = document.getElementById("annotationId")
            annotation.innerText = newsAnnotation[i];
            // Увеличиваем i, так как показ i-й новости должен подойти к концу
            i++;
            // И далее вновь рекурсивно (вызов данной функции внутри данной функции) Switch
            Switch();
            // И для следующих новостей задаем timeout 2s, чтобы они менялись каждые 2 секунды
            timeout = 2000;
        }, timeout);
    }else{
        // Если наш счетчик больше количества новостей, то мы обнуляем его и начинаем показ заново с 0-го элемента
        i = 0;
        // Вновь рекурсивно вызываем функцию
        Switch();
    }
}
// ****************************************************************************************



// Ссылка доступа к API Pixabay
var url = "https://pixabay.com/api/?key=14219900-d3b784a2ba87f2f4eece98d05&q="+ query +"&image_type=photo&pretty=true";
AccessApi(url);
// ****************************************************************************************
// Блок картинок

// Обернем fetch в функцию, чтобы его можно было вызвать после ввода в поле поиска
function AccessApi(url){

    // Далее сделаем проверку на то, что если у нас не существует блока с фото, то мы его создаем с актуальными данными
    // Это необходимо, так как при поиске, нам вполне удобно удалить блок, а затем перерисовать его
    // (Удобнее в плане меньше для вас кода)
    // Проверка выполняется до вызова fetch, так как для fetch необходимы значительные временные ресурсы, чтобы обратиться
    // к API, если делать проверку внутри него, то он будет обращаться дважды (хотя при хорошем соединении и API это не заметно)
    if (document.getElementById("sectionPhotoId") === null){
    // fetch принимает в себя url и объект с определенными правилами обращения к ресурсы по http протоколу
    // Тут кому интересно можете просто загуглить fetch mode, fetch credentials, или почитать про fetch целом
        fetch(url,{mode:"cors",credentials:"same-origin"})
        // вызываем promis на преобразование полученных данных
        .then(response => response.json())
        // вызываем promis уже на работу с данными
        .then(data => {
            // Напомню, что можно везде при инициализации переменной просто использовать var
            // Берем main
            var main = document.getElementById("main");
            // Поместим список всей информации о фото в отдельную переменную
            let hits = data.hits;
                // Создаем блок с фото
                let photos = document.createElement("section");
                photos.id = "sectionPhotoId";
                photos.className = "section-photo";
                // В цикле отрисовываем все карточки с фото и некоторой информацией
                for (let i = 0; i < hits.length; i++){
                    // Создаем div для карточки
                    let photo = document.createElement("div");
                    // id создаем просто на всякий
                    photo.id = i;
                    photo.className = "photo";
                    // Работаем со стилями карточки в js
                    // Ставим в background-image наше изображение из API
                    photo.style.backgroundImage = "url(" + hits[i].webformatURL + ")";
                    // В апи также есть информация о точном размере изображения, нам это удобно использовать для карточки
                    photo.style.width = hits[i].webformatWidth+"px";
                    photo.style.height = hits[i].webformatHeight+"px";

                    // Блок допольнительной информации (создаем для того, чтобы задать стили для смещения и грида)
                    let photoAdd = document.createElement("div");
                    photoAdd.className = "photo-add";

                    // Создадим еще блок для грида двух элементов
                    let info = document.createElement("div");
                    info.className = "photo-info";

                    // Блок с нашим запросом (то есть типом фото)
                    let type = document.createElement("div");
                    type.className = "photo-type";
                    type.innerText = query;

                    // Блок с количеством просмотров фото на сайте pixabay (инфа из API)
                    let views = document.createElement("div");
                    views.className = "photo-views";
                    views.innerText = "views: " + hits[i].views;

                    // Ссылка на конкретную картинку на Pixabay
                    let photoURL = document.createElement("a");
                    photoURL.className = "photo-url";
                    photoURL.href = hits[i].pageURL;
                    photoURL.innerText = "Click to view the photo on Pixabay";

                    // Поочередно вставляем детей в блоки из логических соображений
                    info.appendChild(type);
                    info.appendChild(views);

                    photoAdd.appendChild(info);
                    photoAdd.appendChild(photoURL);

                    photo.appendChild(photoAdd);

                    photos.appendChild(photo);
                }
                main.appendChild(photos);
        
        })
        // Вывод ошибок в консоль внутри fetch, дабы в случае чего весь js не крашнулся
        .catch(err => {console.log(err)})
    }else{
        // Когда мы делаем поисковой запрос, то удаляем весь блок с фото и повторно вызываем 
        // нашу функцию, которая обращается к API и отрисовывает новый блок с новыми картинками
        document.getElementById("sectionPhotoId").parentNode.removeChild(document.getElementById("sectionPhotoId"));
        AccessApi(url);
    }
}
// ****************************************************************************************