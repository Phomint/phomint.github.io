import { initStarfield } from './starfield.js';
import { initTypewriter } from './typewriter.js';
import { initProjects } from './projects.js';
import { initCurriculum } from './curriculum.js';

document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initTypewriter();
    initProjects();
    initCurriculum();
});
