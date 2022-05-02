import View from './view.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks');
  _errorMessage = 'No bookmarkrs yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  addHandlerRender(hanlder) {
    window.addEventListener('load', hanlder);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
