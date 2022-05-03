import View from './view.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Success in save you Recipe!';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  toggleWindowVisibility() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener(
      'click',
      this.toggleWindowVisibility.bind(this)
    );
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener(
      'click',
      this.toggleWindowVisibility.bind(this)
    );
    this._overlay.addEventListener(
      'click',
      this.toggleWindowVisibility.bind(this)
    );
  }
}

export default new AddRecipeView();
