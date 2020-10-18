import formHelper from './formHelper'
import dateHider from './dateHider'
import videos from './videos'
window.addEventListener('load', formHelper);
window.addEventListener('load', dateHider);
window.addEventListener('load', videos.init.bind(videos));