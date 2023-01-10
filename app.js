let input = document.querySelector("#input")
let text = document.querySelector(".text")
let charCount = 0

//1. get a random paragraph
//2. creat a span element for each letters
//3. append elements inside paragraph
function randomParagraph() {
    let randomNum = Math.floor(Math.random() * paragraph.length)
    let textContent = paragraph[randomNum]
    textContent.split("").forEach(x => {
        document.querySelector(".text").innerHTML += `<span>${x}</span>`
    });
    spanElements = text.querySelectorAll("span");
}
randomParagraph()

//on click anywhere in the text area focus on input
document.addEventListener("keydown", () => input.focus())
text.addEventListener("click", () => input.focus())
input.addEventListener("input", (e) => (main(e)))

var spanElements = text.querySelectorAll("span");
let timer = document.querySelector(".timer span");
let mistakes = document.querySelector(".mistakes span");
let wpm = document.querySelector(".wpm span");

spanElements[0].classList.add("active")

function main(e) {
    let inp = input.value;
    let inputLength = inp.length;

    //if user has enterred corect add correct class name to span element 
    // else add incorect to span elemtn
    if (inputLength != 0) {
        if (inp[inputLength - 1] == spanElements[inputLength - 1].textContent) {
            spanElements[inputLength - 1].classList.add("correct")
        } else {
            spanElements[inputLength - 1].classList.add("incorrect")
        }
    }

    //if user enters backspace then remove correct and incorrect classlists
    if (e.data == null) spanElements[inputLength].classList.remove("correct", "incorrect")

    //remove active class name to the elements before the currect active element
    spanElements.forEach(i => i.classList.remove("active"))

    // add active class name for the currect active element
    spanElements[inputLength].classList.add("active")

    //  calculate the mistake by calculating the number of elemnts with incorrect class name
    let incorrect = 0;
    incorrect = document.querySelectorAll(".incorrect").length;
    mistakes.textContent = incorrect;

    //  calculation of wmp
    let wmp = Math.round(((((inputLength - 1) - incorrect) / 5) / (60 - (+timer.textContent))) * 60);
    wmp = wmp < 0 || !wmp || wmp == Infinity ? 0 : wmp;
    wpm.textContent = wmp;
}

//  set Inveterval only once(when use enters the first letter)
let hasReceivedInput = false;
input.addEventListener("input", () => {
    if (!hasReceivedInput) startInterval();
    hasReceivedInput = true;
})

let count = 60;
let interval;
// for each second decrement the counter
// when counter is 0 stop the interval
// disable input and active cursor
function startInterval() {
    interval = setInterval(() => {
        count -= 1;
        timer.textContent = count;
        if (count == 0) {
            input.disabled = true;
            spanElements.forEach(i => i.classList.remove("active"))
            stopInterval(interval)
        }
    }, 1000)
}

function stopInterval(init) {
    clearInterval(init);
}

// on clicking try_agin button rest few values
document.querySelector(".try_again").addEventListener("click", () => {
    count = 60;
    stopInterval(interval)
    hasReceivedInput = false;
    input.disabled = false;
    timer.textContent = count;
    input.value = "";
    spanElements.forEach(i => i.classList.remove("correct", "incorrect", "active"))
    document.querySelector(".text").innerHTML = "";
    randomParagraph()
    spanElements[0].classList.add("active");
    document.querySelector(".mistakes span") = 0;
    document.querySelector(".wpm span") = 0;
})