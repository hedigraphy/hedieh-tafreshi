const darkModeDOM = document.getElementById("dark-mode");
const calculatorDOM = document.getElementById("calculator");
const buttonsDOM = document.getElementsByClassName("func-btn");
const displayResultDOM = document.getElementById('displayResult');
let displayResultDOMScrollWidth = displayResultDOM.scrollWidth;
let displayResultDOMScrollX = 0;
 
darkModeDOM.onchange = darkModeDOMChangeHandler;
 
loopThrowDOMS(buttonsDOM, function(element) {
    element.onclick = buttonsDOMClick;
});
 
window.onkeyup = globalKeyPressedHandler;
 
function darkModeDOMChangeHandler(event) {
    const thisElementValue = event.target.value;
    
 
    loopThrowDOMS(buttonsDOM, function(element) {
        if (thisElementValue == "light" && element.classList.contains(darkModeClass))
            element.classList.remove(darkModeClass);
        else if (thisElementValue == "dark" && !element.classList.contains(darkModeClass))
            element.classList.add(darkModeClass);
 
 
    });
 
    if (thisElementValue == "light" && calculatorDOM.classList.contains(darkModeClass))
        calculatorDOM.classList.remove(darkModeClass)
    else if (thisElementValue == "dark" && !calculatorDOM.classList.contains(darkModeClass))
        calculatorDOM.classList.add(darkModeClass);
 
}
 
function globalKeyPressedHandler(event) {
    const pressedKey = event.key;
    const validKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "=", "-", "+", "*", "/", "Enter" , "Delete"];
    const functionalKey = {
        "equal": ["Enter", "="],
        "clear": ["Delete"]
    };
    var btnName = pressedKey;
 
    loopThrowObject(functionalKey, function(element1, index, mainArray) {
        const currentElement = functionalKey[element1];
        currentElement.forEach(function(element2) {
            if (element2 == pressedKey) {
                btnName = element1;
            }
        });
    });
 
    const target = {
        value: pressedKey,
        name: btnName
    }
 
    const thisEvent = {
        target: target
    }
    if (validKeys.includes(pressedKey)) {
        buttonsDOMClick(thisEvent);
    }
}
 
function buttonsDOMClick(event) {
    const thisElementValue = event.target.value;
    const thisElementName = event.target.name;
    const specialFunctionalityHandlerNames = ["equal", "clear"];
 
    if (specialFunctionalityHandlerNames.includes(thisElementName)) {
        switch (thisElementName) {
            case 'equal':
                try {
                    equalDOMHandler();
                } catch (eror) {
                    alert("خطا رخ داد");
                }
                break;
 
            case 'clear':
                try {
                    clearDOMHandler();
                } catch (eror) {
                    alert("خطا رخ داد ");
                }
 
                break;
 
            case 'backspace':
                try {
                    backspaceDOMHandler();
                } catch (eror) {
                    alert("خطا رخ داد ");
                }
 
                break;
        }
        displayResultDOMScrollHandler();
        return;
    }
 
    displayResultDOM.value += thisElementValue;
    displayResultDOMScrollHandler();
}
 
function displayResultDOMScrollHandler() {
    displayResultDOMScrollX = displayResultDOM.scrollWidth - displayResultDOMScrollWidth;
    displayResultDOM.scrollLeft = displayResultDOMScrollX;
}
 
function equalDOMHandler() {
    const mathOperation = displayResult.value;
    const result = eval(mathOperation);
     
     
    displayResult.value = result;
}
 
function clearDOMHandler() {
    displayResult.value = "";
}
 
function backspaceDOMHandler() {
    let mathOperation = displayResult.value;
    mathOperation = mathOperation.substring(0, (mathOperation.length) - 1);
    displayResult.value = mathOperation;
}
 
 

 
function loopThrowDOMS(doms, funcHandler) {
    const tmpDOMS = Array.from(doms);
    tmpDOMS.forEach(funcHandler);
}
 
function loopThrowObject(obj, funcHandler) {
    const tmpObjectKeys = Object.keys(obj);
    tmpObjectKeys.forEach(funcHandler);
    }
