import formHelper from './formHelper'
import dateHider from './dateHider'
import videos from './videos'
import whitelist from './whitelist'
const isPaginationWhitelist = document.querySelector('.whitelist-next')

if (isPaginationWhitelist) {
    whitelist.init({
        chunkSize: 10,
        nextPageSelector: '.whitelist-next',
        itemSelector: '.whitelist-email',
    }).run()
}

window.addEventListener('load', formHelper);
window.addEventListener('load', dateHider);
window.addEventListener('load', videos.init.bind(videos));
