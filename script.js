const api_key = 'eacfcd12df61481bb9d603073adbc81b';
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load' , () => fetchNews('India') );

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${api_key}`);
    const data = await response.json();
    bindData(data.articles);
    // console.log(data)
}
function bindData(articles){
    const cardContainer = document.getElementById('cards-container');
    const newsTemplate = document.getElementById('template-news-card');

    cardContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage)
        return;
        const cardClone = newsTemplate.content.cloneNode(true);
        fillData(cardClone, article);
        cardContainer.appendChild(cardClone); 
    });
}

function fillData(cardClone , article){
    const newsImg = cardClone.getElementById('news-img');
    const newsTitle = cardClone.getElementById('news-title');
    const newsSource = cardClone.getElementById('news-source');
    const newsDescription = cardClone.getElementById('news-description');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDescription.innerHTML = article.description;
    
    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone : 'Asia/Jakarta'
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click' , () => {
        window.open(article.url , "_blank");
    });
}

let currentSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active');
}

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-text');

searchBtn.addEventListener('click' , () => {
    const query = searchInput.value;
    if(!query) return;

    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = null;
})