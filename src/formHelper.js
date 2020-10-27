const firstStageButtonSelector = '[data-toy-form] #first-stage-button';
const formSelector = '[data-toy-form]'
const confirmPasswordWarningSelector = '.confirm-password-warning';
const regionInputSelector = '#Region';
const categoryInputSelector = '#Role';
const managementQuestionSelector = '.management-question';
const attendanceOptionSelector = '.attendance-question';

// EA form
const eaFormSelector = '[data-toy-ea-form]';
const formSubmitSelector = formSelector + ' input[type="submit"]';

// Whitelist
const whitelistItemSelector = '.whitelist .w-dyn-item'
const whitelistSubmitButtonSelector = '[data-toy-whitelist-submit]'

// Watch button
const watchButtonSelector = '[data-toy-watch-button]'

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
    initWatchButtonChecking();
}

function onWhitelistSubmitClick() {
    const form = document.querySelector(formSelector);
    const isValid = getValidityOfVisibleFormElements(form);
    if (isValid) {
        console.log('All valid');
        if (!window.mailchimpSubmitted) {
            submitToMailchimp()
        }
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
    const isDealer = category.indexOf('Dealer') !== -1
    // Attendance option
    // Must be dealer
    if (!isDealer) {
        removeElement(attendanceOptionSelector)
    } else if (region !== 'CRO' && region !== 'TWA') {
        // Remove for dealers not from CRO or TWA
        removeElement(attendanceOptionSelector);
    }

    // Question option
    if (!isDealer && category !== 'General Manager of Record') {
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
    const elements = [...form.elements];
    const [ managerFirstName, managerLastName ] = [
        getFormValueByMemberstackField(elements, 'first-name'),
        getFormValueByMemberstackField(elements, 'surname')
    ];
    const details = {
        MANAGERN1: managerFirstName + ' ' + managerLastName,
        MANAGERE1: getFormValueByMemberstackField(elements, 'email'),
        PHONE: getFormValueByMemberstackField(elements, 'mobile'),
        REGION: getFormValueByMemberstackField(elements, 'region'),
        ROLE: 'Executive Assistant',
        // tags: [{ name: 'Toyota NDC 2020', status: 'Active' }],
    };
    return details;
}

function getFormValueByMemberstackField(elements, field) {
    const matchingEl = elements.find(el => el.getAttribute('data-ms-member') === field)
    return matchingEl ? matchingEl.value : null
}

function onEAFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (!isMainFormValid()) {
        return;
    }
    submitToMailchimp()    
}

function submitToMailchimp() {
    // Submit form to mailchimp
    const url = 'https://toyotachooseyourroad.us2.list-manage.com/subscribe/post-json?u=87fa237eb7daba1ba09d9584e&id=3f7e2117ba&c=?';
    const form = document.querySelector(eaFormSelector);
    if (!form) {
        console.log('No mailchimp form')
        return
    }
    const firstName = form.querySelector('[data-ea-first-name]').value
    const email = form.querySelector('[data-ea-email]').value
    if (!firstName || !email) {
        console.log('EA details not set')
        return
    }
    const formData = {
        FNAME: firstName,
        EMAIL: email,
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
            window.mailchimpSubmitted = true
           // Submit main form
           onWhitelistSubmitClick()
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
    const isPaginationWhitelist = document.querySelectorAll('.whitelist--no-pagination').length === 0
    const whitelistEmails = isPaginationWhitelist
        ? (window.whitelist || [])
        : [...document.querySelectorAll('.whitelist-email')].map(el => el.innerText.toLowerCase())
    console.log(whitelistEmails)
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

async function initWatchButtonChecking() {
    // check for button visibility
    const watchButton = document.querySelector(watchButtonSelector)
    if (watchButton && watchButton.offsetParent) {
        const memberData = await MemberStack.onReady
        if (memberData.role.indexOf('Dealer') === -1) {
            removeElement(watchButtonSelector)
        }
    }
}