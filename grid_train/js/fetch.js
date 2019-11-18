const options = {
    method: 'get',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
    }
}

fetch("https://jsonplaceholder.typicode.com/todos", options)
.then(response => response.json()).then(data => {

    data.sort(() => Math.random() - 0.5);

    var photoMap = {1:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/322825b5-24b1-412c-b0e3-604a1d0b2218/d59l47p-8bfe9c50-67dd-4358-bad5-c73d0558b4a9.gif",
                    2:"https://img0.liveinternet.ru/images/attach/b/3/8/522/8522801_7035749_3224105_2723912_3274.gif",
                    3:"https://cdn-learn.adafruit.com/assets/assets/000/012/878/thumb100/led_strips_doge.bmp?1386611464",
                    4:"https://l-userpic.livejournal.com/81589670/11899723",
                    5:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/018c5650-e88f-4a3f-87fe-8a719c3e9c4d/d4wvwh2-bf30b2cd-aa12-4bc8-95a2-8293ff379240.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAxOGM1NjUwLWU4OGYtNGEzZi04N2ZlLThhNzE5YzNlOWM0ZFwvZDR3dndoMi1iZjMwYjJjZC1hYTEyLTRiYzgtOTVhMi04MjkzZmYzNzkyNDAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BQ7G-mHNkFpQvp171TPDJfFx2DZAC78gk8AU18V4434",
                    6:"http://forums.trovegame.com/image.php?u=11651771&dateline=1424950880",
                    7:"http://www.hellfest-forum.fr/img/avatars/74174.jpg?m=1479194944",
                    8:"https://l-userpic.livejournal.com/107737254/2939257",
                    9:"http://hry.czin.eu/arcade/img/The%20Simpsons%20Homer%20Woho.png",
                    10:"https://www.lunaris.rs/forum/image.php?u=156&dateline=1527906685&type=thumb"
    };

    var block = document.getElementById("main");

    for (let key in data) {

        let card = document.createElement('div');
        card.className = "card"

        let photo = document.createElement('div')
        photo.className = "author-photo";
        photo.style.backgroundImage = "url(" + photoMap[data[key].userId] + ")";

        let text = document.createElement('div');
        text.textContent = data[key].title;

        let status = document.createElement('span');
        status.className = "status";
        status.textContent = data[key].completed ? "Article was completed" : "Article is not finished yet";
        
        let textContainer = document.createElement('div');
        textContainer.className = "text-container";
        textContainer.appendChild(text);
        textContainer.appendChild(status);
        card.appendChild(photo);
        card.appendChild(textContainer);
        block.appendChild(card);
        
    }
})
.catch(err => console.log(err))