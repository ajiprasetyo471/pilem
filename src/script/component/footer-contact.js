class FooterContact extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer class="text-center text-lg-start bg-dark text-white" id="contact">
        <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div class="me-5 d-none d-lg-block">
          <span>Get connected with me on social media:</span>
        </div>
        <div>
          <a href="" class="me-4 text-white sosmed-link">
          <i class="fab fa-whatsapp"></i>
          </a>
          <a href="" class="me-4 text-white sosmed-link">
          <i class="fab fa-google"></i>
          </a>
          <a href="" class="me-4 text-white sosmed-link">
          <i class="fab fa-instagram"></i>
          </a>
          <a href="" class="me-4 text-white sosmed-link">
          <i class="fab fa-github"></i>
          </a>
        </div>
        </section>
        <section class="">
        <div class="container text-center text-md-start mt-5">
          <div class="row mt-3">
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">
            <i class="fas fa-star me-3 logo-red"></i>Aji Prasetyo
            </h6>
            <p>
            Iam a web developer, i make web front end and back end, especially in front end. I use javascript, react,
            php.
            </p>
          </div>
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 class="text-uppercase fw-bold mb-4">
            Contact
            </h6>
            <p><i class="fas fa-home me-3 logo-red"></i> Kendal, Central Java, Indonesia</p>
            <p>
            <i class="fas fa-envelope me-3 logo-red"></i>
            ajiprsty4713@gmail.com
            </p>
            <p><i class="fas fa-phone me-3 logo-red"></i> + 62 882 1675 8205</p>
          </div>
          </div>
        </div>
        </section>
        <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
        <p><a href="#" class="text-white">Back to top</a></p>
        © 2021 Copyright:
        <span class="text-reset" href="">Aji Prasetyo</span>
        </div>
      </footer>
        `;
  }
}

customElements.define('footer-contact', FooterContact);
