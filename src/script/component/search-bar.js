class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="search-container">
        <div class="row">
          <div class="col-md-8">
            <div class="input-group mb-3">
            <input type="text" class="form-control input-keyword" placeholder="Search Movie..." />
            <button class="btn btn-danger search-button" type="button">
              <i class="fas fa-search"></i>
            </button>
            </div>
          </div>
        </div>
      </div>
        `;
  }
}

customElements.define('search-bar', SearchBar);
