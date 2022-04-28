import View from './View.js';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uplaoded';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.addHandlerClick();
  }

  addHandlerClick() {
    this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
    this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }

  _toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  renderForm() {
    this._clear();
    this._insertHTML(this._generateMarkup());
  }

  _generateMarkup() {
    return ` 
    <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="TEST" required name="title" type="text" />
        <label>URL</label>
        <input value="TEST" required name="sourceUrl" type="text" />
        <label>Image URL</label>
        <input value="TEST" required name="image" type="text" />
        <label>Publisher</label>
        <input value="TEST" required name="publisher" type="text" />
        <label>Prep time</label>
        <input value="23" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input value="23" required name="servings" type="number" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input value="0.5,kg,Rice" type="text" required name="ingredient-1"
          placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 2</label>
        <input value="1,,Avocado" type="text" name="ingredient-2" placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 3</label>
        <input value=",,salt" type="text" name="ingredient-3" placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 4</label>
        <input type="text" name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 5</label>
        <input type="text" name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />
        <label>Ingredient 6</label>
        <input type="text" name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="src/img/icons.svg#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>`;
  }
}

export default new addRecipeView();
