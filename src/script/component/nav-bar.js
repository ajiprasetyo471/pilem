class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="."><i class="fas fa-film"></i>Pilem</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="nav navbar-nav ms-auto">
            <a class="nav-link" href="#">Subscribe</a>
            <a class="nav-link" href="#">Login</a>
            <a class="nav-link" href="#contact">Contact</a>
          </div>
          </div>
        </div>
      </nav>
        `;
  }
}

customElements.define('nav-bar', NavBar);
