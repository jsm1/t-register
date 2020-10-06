const firstStageButtonSelector = '#first-stage-button';
const formSelector = '#email-form'
const confirmPasswordWarningSelector = '.confirm-password-warning';
const regionInputSelector = '#Region';
const categoryInputSelector = '#Role';
const managementQuestionSelector = '.management-question';
const attendanceOptionSelector = '.attendance-question';

function initRegistrationForm() {
    const button = document.querySelector(firstStageButtonSelector);
    if (button) {
        button.addEventListener('click', onFirstStageClick);
    }
    initPasswordChecking();
}

function initTimestamps() {
    const milestones = [];
    const now = new Date();
    let maxPassedDate = null;
    const timeDelayElements = [...document.querySelectorAll('[data-show-from]')].map(el => {
        const date = new Date(el.getAttribute('data-show-from'));
        if (Number.isNaN(date.getTime())) {
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
    });
    
    if (maxPassedDate) {
        timeDelayElements.forEach(({ date, el }) => {
            const shouldStay = el.getAttribute('data-stay-after');
            if (date !== maxPassedDate && !shouldStay && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
    }
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

window.addEventListener('load', initRegistrationForm);
window.addEventListener('load', initTimestamps);

function onFirstStageClick(event) {
    const form = document.querySelector(formSelector);
    const isValid = getValidityOfVisibleFormElements(form);
    if (isValid) {
        console.log('All valid');
        hideElementsForSecondStage();
    } else {
        event.preventDefault();
        event.stopPropagation();
        form.reportValidity();
    }
}

function initPasswordChecking() {
    const passwordElements = getPasswordElements()
    if (passwordElements.length !== 2) {
        return;
    }
    passwordElements.forEach(el => el.addEventListener('keyup', checkPasswordsMatch));
}    

function getValidityOfVisibleFormElements(form) {
    const formElements = [...form.elements];
    if (!checkPasswordsMatch()) {
        return false;
    }
    const visibleElements = formElements.filter(el => el.offsetParent);
    const validVisibleElements = visibleElements.filter(el => el.checkValidity());
    const allVisibleElementsAreValid = visibleElements.length === validVisibleElements.length;
    return allVisibleElementsAreValid;
}

function checkPasswordsMatch() {
    const [ e1, e2 ] = getPasswordElements();
    const isMatch = e1.value === e2.value;
    const displayValue = isMatch ? 'none' : 'block';
    document.querySelector(confirmPasswordWarningSelector).style.display = displayValue;
    return isMatch;
}

function getPasswordElements() {
    return [...document.querySelectorAll(`${formSelector} [type="password"]`)];
}


function hideElementsForSecondStage() {
    const region = document.querySelector(regionInputSelector).value;
    const category = document.querySelector(categoryInputSelector).value;

    // Attendance option
    if (category === 'Agency') {
        removeElement(attendanceOptionSelector)
    } else if (region === 'ERO' || region === 'SRO') {
        removeElement(attendanceOptionSelector);
    }

    // Question option
    if (category !== 'Dealer Principal' && category !== 'Dealer GM' && category !== 'Dealer Other') {
        removeElement(managementQuestionSelector);
    }

}

function removeElement(selector) {
    const el = document.querySelector(selector);
    if (el) {
        el.parentNode.removeChild(el);
    }
}