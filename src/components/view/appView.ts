import News, { Article } from './news/news';
import Sources, { Source } from './sources/sources';

export interface ApiResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}
export interface SourcesResponse {
    status: string;
    sources: Source[];
}

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ApiResponse) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourcesResponse) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
