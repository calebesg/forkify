import View from './view.js';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Result no found! Please try again ;)';
  _message = '';

  _generateMarkup() {
    return this._data.reduce((markup, prev) => {
      return (markup += this._generateMarkupPreview(prev));
    }, '');
  }

  _generateMarkupPreview(prev) {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          id === prev.id ? 'preview__link--active' : ''
        } " href="#${prev.id}">
          <figure class="preview__fig">
            <img src="${prev.image}" alt="${prev.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${prev.title}</h4>
            <p class="preview__publisher">${prev.publisher}</p>
          </div>
        </a>
      </li>
    `;

    /*
      preview__link--active

      <div class="preview__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
    */
  }
}

export default new ResultView();
