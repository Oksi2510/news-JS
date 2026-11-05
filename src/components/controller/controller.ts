import AppLoader from './appLoader';

type Callback<T> = (data: T) => void;

class AppController extends AppLoader {
    getSources<T>(callback: Callback<T>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews<T>(e: MouseEvent, callback: Callback<T>) {
        let target: EventTarget | ParentNode | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        if (!(target instanceof Element) || !(newsContainer instanceof Element)) return;

        while (target !== newsContainer) {
            if (target === null || !(target instanceof Element)) return;

            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId === null) return;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
