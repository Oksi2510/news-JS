import './sources.css';
export interface Source {
    id: string | null;
    name: string;
}
class Sources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (sourceItemTemp === null) return;
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            if (!(sourceClone instanceof DocumentFragment)) return;

            const name = sourceClone.querySelector('.source__item-name');
            if (name === null) return;
            name.textContent = item.name;

            const id = sourceClone.querySelector('.source__item');
            if (id === null || item.id === null) return;
            id.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
