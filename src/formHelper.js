const firstStageButtonSelector = '#first-stage-button';
const formSelector = '#email-form'
const confirmPasswordWarningSelector = '.confirm-password-warning';
const regionInputSelector = '#Region';
const categoryInputSelector = '#Role';
const managementQuestionSelector = '.management-question';
const attendanceOptionSelector = '.attendance-question';

// EA form
const eaFormSelector = '#email-form-2';
const formSubmitSelector = formSelector + ' input[type="submit"]';

module.exports = function initRegistrationForm() {
    const button = document.querySelector(firstStageButtonSelector);
    if (button) {
        button.addEventListener('click', onFirstStageClick);
    }
    initPasswordChecking();
    initEAForm();
}


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

function onEAFormSubmit(event) {
    event.preventDefault();

    // Submit form to mailchimp
    const url = event.target.action;
    const form = event.target;
    const formElements = [...form.elements].filter(el => el.offsetParent && el.type !== 'submit');
    const formData = new FormData();
    formElements.forEach(el => {
        formData.append(el.name, el.value);
    })

    $.ajax({
        url,
        data: formData,
        contentType: false,
        processData: false,
        method: 'POST',
        success: (data) => {
            console.log(data);
        },
        complete: () => {
           // Submit main form
           document.querySelector(formSubmitSelector).click();
        }
    });
}

function initEAForm() {
    document.querySelector(eaFormSelector).addEventListener('submit', onEAFormSubmit);
}