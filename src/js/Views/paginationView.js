import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', event => {
      const button = event.target.closest('.btn--inline');

      if (!button) return;

      const goToPage = +button.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );

    // Last page
    if (currentPage === numPages && numPages > 1)
      return this._generateMarkupButton('prev', currentPage);

    // First page
    if (currentPage === 1 && numPages > 1)
      return this._generateMarkupButton('next', currentPage);

    // other pages
    if (currentPage > 1 && currentPage < numPages)
      return `
        ${this._generateMarkupButton('prev', currentPage)}
        ${this._generateMarkupButton('next', currentPage)}`;

    // Unique page
    return '';
  }

  // Type = (prev or next)
  _generateMarkupButton(type = 'next', pageNumber) {
    if (type === 'prev')
      return `
        <button data-goto="${
          pageNumber - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${pageNumber - 1}</span>
        </button>
      `;

    return `
      <button data-goto="${
        pageNumber + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${pageNumber + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
