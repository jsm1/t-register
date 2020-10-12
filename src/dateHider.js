module.exports = function initTimestamps() {
    const milestones = [];
    const now = new Date();
    let maxPassedDate = null;
    const timeDelayElements = [...document.querySelectorAll('[data-show-from]')].map(el => {
        const date = new Date(el.getAttribute('data-show-from'));
        if (Number.isNaN(date.getTime())) {
            console.log('Invalid date', el.getAttribute('data-show-from'));
            return;
        }
        
        if (date > now) {
            milestones.push(date);
            el.parentNode.removeChild(el)
        }

        const isDatePassed = date < now;

        if (isDatePassed && (!maxPassedDate || maxPassedDate < date)) {
            maxPassedDate = date;
        }
        return { date, el }
       // Filter out invalid dates
    }).filter(value => value);
    
    if (maxPassedDate) {
        timeDelayElements.forEach(({ date, el }) => {
            const shouldStay = el.getAttribute('data-stay-after');
            if (date !== maxPassedDate && !shouldStay && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
    }

    // Show until elements
    const showUntilElements = [...document.querySelectorAll('[data-show-until]')].map(el => {
        const date = new Date(el.getAttribute('data-show-until'));
        if (Number.isNaN(date.getTime())) {
            console.log('Invalid date', el.getAttribute('data-show-until'));
            return;
        }
        
        if (now > date) {
            el.parentNode.removeChild(el)
        } else {
            milestones.push(date)
        }
    })
    window.milestones = milestones;
    window.setInterval(pollMilestones, 1000);
}

function pollMilestones() {
    if (!window.milestones) {
        return;
    }
    const now = new Date();
    for (const d of window.milestones) {
        if (d < now) {
            window.location.reload();
        }
    }
}
