options = ["English", "Hindi", "Spanish", "French"];
ddListId = "langDDlist";

templates = {
    button: '<button type="button" class="multiselect dropdown-toggle btn btn-default" data-toggle="dropdown" title="None selected" aria-expanded="false"><span class="multiselect-selected-text">None selected</span> <b class="caret"></b></button>',
    ul: '<ul class="multiselect-container dropdown-menu"></ul>',
    li: '<li><a tabindex="0"><label></label></a></li>'
}

ddListObj = document.getElementById(ddListId);


function addOption(value) {
    // console.log(value);
    
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
    
    if (e.checked) {
        if (ddToggleSpan.innerText == "None selected") {
            ddToggleSpan.innerText = e.value;
        } else {
            ddToggleSpan.innerText += ", " + e.value;
        }
        
    } else {
        var optionList = ddToggleSpan.innerText.split(", ");
        filteredOptions = optionList.filter(option => option !== e.value);
        ddToggleSpan.innerText = filteredOptions.join(", ");
    }
    var ddToggle = document.querySelector("#" + ddListId + " .dropdown-toggle");
    ddToggle.title = ddToggleSpan.innerText;
}


window.addEventListener("load", buildDropdown);