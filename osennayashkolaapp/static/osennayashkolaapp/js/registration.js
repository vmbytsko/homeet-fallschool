window.onload = function() {

    /*google-like buttons*/
    const fields = document.querySelectorAll('.google-like-input');

    function checkForFill(event) {
        const sel = event.target;
        sel.value ? sel.classList.add('filled') : sel.classList.remove('filled');
    }

    fields.forEach((field) => {
        let input = field.querySelector("input") ? field.querySelector("input") : field.querySelector("textarea");
        input.addEventListener('blur', checkForFill);
        input.dispatchEvent(new Event('blur', {}));
    });

    /* avatar uploading */
    document.querySelector("#id_avatar").addEventListener("change", (event) => {
        let file = event.target.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function() {
            document.querySelector('#avatar-image').style = 
                "background-image: url('"+reader.result+"'); "+
                "background-size: cover; background-repeat: no-repeat; "+
                "background-position: center center; width: 140px; height: 140px; border: 0";
        };

        reader.onerror = function() {
            console.log(reader.error);
        };
    });

    /*dynamic inputs*/
    let preview = document.querySelector("#preview");
    let inputs1 = document.querySelector("#registration-inputs-phase1");
    let inputs2 = document.querySelector("#registration-inputs-phase2");

    bindFieldChange(inputs1.querySelector("#id_name"), preview.querySelector("#name"), "Саша Фефелов", null);
    bindFieldChange(inputs1.querySelector("#id_sex_1"), preview.querySelector("#sex"), "", (_) => {return "Девушка";});
    bindFieldChange(inputs1.querySelector("#id_sex_0"), preview.querySelector("#sex"), "Парень", (_) => {return "Парень";});
    bindFieldChange(inputs1.querySelector("#id_dateofbirth"), preview.querySelector("#age"), "21 год", dateToAge);
    bindFieldChange(inputs1.querySelector("#id_about"), preview.querySelector("#text"), "Мне очень нравится устраивать вечеринки, дебоширить и мазать с...", null)
    
    let educationInputs = [
        "#student-or-graduate", "#employee",
        "#course-1", "#course-2", "#course-3",
        "#course-4", "#course-5", "#course-6",
        "#level", "#faculty", "#programme"
    ];
    educationInputs.forEach((educationInput) => bindFieldChange(inputs2.querySelector(educationInput), preview.querySelector("#education"), "1 курс бакалавриат ВШБ ИБ", educationInfo));

    bindFieldChange(inputs2.querySelector("#job"), preview.querySelector("#job"), "СТО в Бизнес в стиле .RU", null);

    /*continue button*/ 
    let phase = 1;
    let continueButton = document.querySelector("#continue");
    continueButton.addEventListener("click", () => {
        switch (phase) {
            case 1:

                ["name", "dateofbirth", "tg", "phone", "about"].forEach((value) => {
                    document.querySelector("#id_"+value).classList.remove("invalid");
                    document.querySelector("#id_"+value+"_error").innerHTML = null;

                });
                postPhase1Data((id) => {
                    console.log("MyID: "+id);
                    phase = 2;
                    document.querySelector("#lc-phase1").classList.add("_hidden");
                    document.querySelector("#alert-phase1").classList.add("_hidden");
                    document.querySelector("#header-phase1").classList.add("_hidden");
    
                    document.querySelector("#lc-phase2").classList.remove("_hidden");
                    document.querySelector("#alert-phase2").classList.remove("_hidden");
                    document.querySelector("#header-phase2").classList.remove("_hidden");
    
                    document.querySelector("#progress").style.width = "35%";

                    // scroll to up
                    document.querySelector("html").scrollIntoView({behavior: 'smooth'});
                }, (errors) => {
                    Object.entries(errors).forEach((entry) => {
                        key = entry[0]; value = entry[1];
                        console.log(key, value);
                        inputs1.querySelector("#id_"+key).classList.add("invalid");
                        inputs1.querySelector("#id_"+key+"_error").innerHTML = value[0];
                    });

                    // scroll to up
                    document.querySelector("html").scrollIntoView({behavior: 'smooth'});
                });
                break;
            case 2:
                alert("Регистрация успешна!");
                break;
        }
    });
}

function dateToAge(input) {
    let value = input.value;
    var today = new Date();
    var birthDate = new Date(value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age + " лет";
}

function educationInfo(input) {
    let inputs2 = document.querySelector("#registration-inputs-phase2");

    let course = 0;
    for(let i = 1; i <= 6; i++) {
        if(inputs2.querySelector("#course-"+i).checked) {
            course = i;
            break;
        }
    }

    return course+" курс "+inputs2.querySelector("#level").value+" "+
    inputs2.querySelector("#faculty").value+" "+inputs2.querySelector("#programme").value;
}

function bindFieldChange(input, field, hiddenText, processingFunction) {
    input.addEventListener("input", (_) => {
        if (!input.value) {
            field.classList.add("_div_novalue");
        } else {
            field.classList.remove("_div_novalue");
        }
        if(!processingFunction) {
            field.innerHTML = input.value ? input.value : hiddenText;
        } else {
            field.innerHTML = processingFunction(input);
        }
    });
    input.dispatchEvent(new Event('input', {}));
}

function postPhase1Data(onSuccess, onError) {
    const formData = new FormData(document.getElementById("registration-inputs-phase1"));
    fetch('/api/v1/users/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log(response.status);
        response.json().then((data) => {
            if(response.status == 201) {
                onSuccess(data.id);
            } else {
                onError(data);
            }
        });
        
    })
    .catch(error => {
        console.error(error);
        alert("Ошибка. Просмотрите консоль.");
    })

}

