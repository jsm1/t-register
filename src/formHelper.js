const firstStageButtonSelector = '#email-form #first-stage-button';
const formSelector = '#email-form'
const confirmPasswordWarningSelector = '.confirm-password-warning';
const regionInputSelector = '#Region';
const categoryInputSelector = '#Role';
const managementQuestionSelector = '.management-question';
const attendanceOptionSelector = '.attendance-question';

// EA form
const eaFormSelector = '#email-form-2';
const formSubmitSelector = formSelector + ' input[type="submit"]';

// Whitelist
const whitelistItemSelector = '.whitelist .w-dyn-item'
const whitelistSubmitButtonSelector = '#whitelist-submit'

module.exports = function initRegistrationForm() {
    const button = document.querySelector(firstStageButtonSelector);
    if (button) {
        button.addEventListener('click', onFirstStageClick);
    }
    // Listener for whitelist submit button
    const whitelistSubmitButton = document.querySelector(whitelistSubmitButtonSelector);
    if (whitelistSubmitButton) {
        whitelistSubmitButton.addEventListener('click', onWhitelistSubmitClick);
    }
    initPasswordChecking();
    initEAForm();
}

function onWhitelistSubmitClick() {
    const form = document.querySelector(formSelector);
    const isValid = getValidityOfVisibleFormElements(form);
    if (isValid) {
        console.log('All valid');
        checkWhitelistEmail();
    } else {
        event.preventDefault();
        event.stopPropagation();
        form.reportValidity();
    }
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
    if (category !== 'Dealer Principal' && category !== 'General Manager of Record' && category !== 'Dealership GM') {
        removeElement(managementQuestionSelector);
    }

}

function removeElement(selector) {
    const el = document.querySelector(selector);
    if (el) {
        el.parentNode.removeChild(el);
    }
}

function isMainFormValid() {
    const mainForm = document.querySelector(formSelector);
    return mainForm.reportValidity();
}


function getManagerDetails() {
    const form = document.querySelector(formSelector);
    const elements = form.elements;
    const [ managerFirstName, managerLastName ] = [
        elements.namedItem('First-Name').value,
        elements.namedItem('Surname').value,
    ];
    const details = {
        MANAGERN1: managerFirstName + ' ' + managerLastName,
        MANAGERE1: elements.namedItem('Email').value,
        PHONE: elements.namedItem('Mobile').value,
        REGION: elements.namedItem('Region').value,
        ROLE: 'Executive Assistant',
        // tags: [{ name: 'Toyota NDC 2020', status: 'Active' }],
    };
    return details;
}

function onEAFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (!isMainFormValid()) {
        return;
    }

    // Submit form to mailchimp
    const url = 'https://toyotachooseyourroad.us2.list-manage.com/subscribe/post-json?u=87fa237eb7daba1ba09d9584e&id=3f7e2117ba&c=?';
    const form = event.target;
    const formElements = form.elements;
    const formData = {
        FNAME: formElements.namedItem('EA-First-Name').value,
        EMAIL: formElements.namedItem('EA-Email').value,
    };

    const managerDetails = getManagerDetails();
    for (const [key, value] of Object.entries(managerDetails)) {
        formData[key] = value;       
    }


    console.log(formData);
    $.ajax({
        url,
        data: formData,
        dataType: 'jsonp',
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
    const eaForm = document.querySelector(eaFormSelector);
    if (eaForm) {
        eaForm.addEventListener('submit', onEAFormSubmit);
    }
}

function checkWhitelistEmail() {
    const whitelistEmails = [...document.querySelectorAll(whitelistItemSelector)].map(el => el.innerText.toLowerCase())
    const enteredEmail = document.querySelector(formSelector + ' [data-ms-member="email"]').value.toLowerCase()
    const isEmailInWhitelist = whitelistEmails.some(email => enteredEmail.indexOf(email) !== -1)
    const submitButtons = [...document.querySelectorAll(formSelector + ' input[type="submit"][data-ms-membership]')]
    if (!isEmailInWhitelist) {
        // Submit disallow button
        const disallowButton = submitButtons.find(el => el.getAttribute('data-disallow-button'))
        if (disallowButton) {
            disallowButton.click()
            return 
        }
    }
    // Submit regular button
    submitButtons[0].click()

}