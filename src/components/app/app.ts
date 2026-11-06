import AppController from '../controller/controller';
import { AppView, ApiResponse, SourcesResponse } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const source = document.querySelector('.sources');
        if (source === null || !(source instanceof HTMLElement)) return;
        source.addEventListener('click', (e) => this.controller.getNews<ApiResponse>(e, (data) => this.view.drawNews(data)));
        this.controller.getSources<SourcesResponse>((data) => this.view.drawSources(data));
    }
}

export default App;
