import 'regenerator-runtime';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './styles/style.css';
import './script/component/nav-bar.js';
import './script/component/search-bar.js';
import {
    main
} from './script/view/main.js';

document.addEventListener("DOMContentLoaded", main);