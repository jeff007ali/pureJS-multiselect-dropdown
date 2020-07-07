options = ["English", "Hindi", "Spanish", "French"];
ddListId = "langDDlist";

templates = {
    button: '<button type="button" class="multiselect dropdown-toggle btn btn-default" data-toggle="dropdown" title="None selected" aria-expanded="false"><span class="multiselect-selected-text">None selected</span> <b class="caret"></b></button>',
    ul: '<ul class="multiselect-container dropdown-menu"></ul>',
    li: '<li><a tabindex="0"><label></label></a></li>'
}

ddListObj = document.getElementById(ddListId);

function addOption(value) {
    
    ulObj = document.querySelector("#" + ddListId + " .dropdown-menu");
    ulObj.innerHTML += templates.li;

    liObj = document.querySelectorAll("#" + ddListId + " .dropdown-menu label");
    liObj[liObj.length - 1].innerHTML = '<input type="checkbox" value=' + value + ' onchange="selectOption(this)"> ' + value;
}

function buildDropdown() {
    ddListObj.classList.add("btn-group", "gfont");
    ddListObj.innerHTML = templates.button + templates.ul;
    options.forEach(addOption);

    var ddToggle = document.querySelector("#" + ddListId + " .dropdown-toggle");
    ddToggle.addEventListener("click", function() {
        if (ddListObj.classList.contains("open")) {
            ddListObj.classList.remove("open");
            this.setAttribute('aria-expanded', 'false');
        }
        else {
            ddListObj.classList.add("open");
            this.setAttribute('aria-expanded', 'true');
        }
    });
    
}

function selectOption(e) {
    var ddToggleSpan = document.querySelector("#" + ddListId + " .dropdown-toggle span");
    var selectedLiObj = e.parentNode.parentNode.parentNode;

    var selectedOptionList = getSelectedOptionValues()

    // According to if checkbox is selected or not, add class to list item
    if (e.checked) {
        selectedLiObj.classList.add("active");
    } else {
        selectedLiObj.classList.remove("active");
    }

    // As per length of selected checkboxes, show text in span tag
    if (selectedOptionList.length > 3) {
        ddToggleSpan.innerText = selectedOptionList.length + " selected";
    } else if (selectedOptionList.length > 0) {
        ddToggleSpan.innerText = selectedOptionList.join(", ");
    } else {
        ddToggleSpan.innerText = "None selected";
    }

    var ddToggle = document.querySelector("#" + ddListId + " .dropdown-toggle");
    ddToggle.title = ddToggleSpan.innerText;
}

function getSelectedOptionValues() {
    // Read all checked checkbox and make array of selected options
    var selectedCheckboxes = document.querySelectorAll("#" + ddListId + " .dropdown-menu input[type='checkbox']:checked");
    var selectedOptionList = []
    for (var i = 0; i < selectedCheckboxes.length; i++) {
        selectedOptionList.push(selectedCheckboxes[i].value);
    }
    return selectedOptionList
}

function checkParent(parent, child) {
    if (parent.contains(child)) 
        return true; 
        return false; 
}

function closeOptions(e) {
    if (ddListObj.classList.contains('open') && 
    !checkParent(ddListObj, e.srcElement)) {
        console.log(e);
        ddListObj.classList.remove("open");

        var ddToggle = document.querySelector("#" + ddListId + " .dropdown-toggle");
        ddToggle.setAttribute('aria-expanded', 'false');
    }
}

window.addEventListener("click", closeOptions);
window.addEventListener("load", buildDropdown);