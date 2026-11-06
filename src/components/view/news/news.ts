import './news.css';

interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

class News {
    draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            if (newsItemTemp === null) return;
            const newsClone = newsItemTemp.content.cloneNode(true);
            if (!(newsClone instanceof DocumentFragment)) return;
            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const imgElem = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (imgElem === null) return;
            imgElem.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            const author = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (author === null) return;
            author.textContent = item.author || item.source.name;
            const pubData = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (pubData === null) return;
            pubData.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const title = newsClone.querySelector<HTMLElement>('.news__description-title');
            if (title === null) return;
            title.textContent = item.title;
            const sourse = newsClone.querySelector<HTMLElement>('.news__description-source');
            if (sourse === null) return;
            sourse.textContent = item.source.name;
            const descr = newsClone.querySelector<HTMLElement>('.news__description-content');
            if (descr === null) return;
            descr.textContent = item.description;
            newsClone.querySelector<HTMLElement>('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsCon = document.querySelector<HTMLElement>('.news');
        if (newsCon === null) return;
        newsCon.innerHTML = '';
        newsCon.appendChild(fragment);
    }
}
export default News;
