export default class LoadMoreButton {
    constructor({ selector, hidden = false}) {
        this.loadMoreButton = this.getRefs(selector);

        hidden && this.hide();
    }

    getRefs(selector) {
        loadMoreButton = document.querySelector(selector);
    }

    enable() {
        loadMoreButton.disabled = false;
    }

    disable() {
        loadMoreButton.disabled = true;
    }

    show() {
        loadMoreButton.classList.remove('is-hidden');
    }

    hide() {
        loadMoreButton.classList.add('is-hidden');
    }
}

