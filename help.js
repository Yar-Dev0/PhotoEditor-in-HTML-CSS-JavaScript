let brightness = "100",
    saturation = "100",
    inversion = "0",
    grayscale = "0",
    sepia = "0",
    blure = "0";

let rotation = 0,
    Horizontal = 1,
    Vertical = 1;


const imgInput = document.querySelector(".input"),
    Optioons = document.querySelectorAll(".filter button"),
    Naamee = document.querySelector(".filter-info .name"),
    Vaaluee = document.querySelector(".filter-info .value"),
    slideFilter = document.querySelector(".slider input"),
    rotateImage = document.querySelectorAll(".rotate button"),
    previewImg = document.querySelector(".preview-img img"),
    resetFilterBtn = document.querySelector(".reset-filter"),
    chooseImgBtn = document.querySelector(".choose-img"),
    saveImgBtn = document.querySelector(".save-img");


const loadImage = () => {
    let file = imgInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

const filters = () => {
    previewImg.style.transform = `rotate(${rotation}deg) scale(${Horizontal}, ${Vertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) sepia(${sepia}%)`;
}

Optioons.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        Naamee.innerText = option.innerText;

        if (option.id === "brightness") {
            slideFilter.max = "200";
            slideFilter.value = brightness;
            Vaaluee.innerText = `${brightness}%`;
        } else if (option.id === "saturation") {
            slideFilter.max = "200";
            slideFilter.value = saturation;
            Vaaluee.innerText = `${saturation}%`
        } else if (option.id === "inversion") {
            slideFilter.max = "100";
            slideFilter.value = inversion;
            Vaaluee.innerText = `${inversion}%`;
        } else if (option.id === "sepia") {
            slideFilter.max = "100";
            slideFilter.value = sepia;
            Vaaluee.innerText = `${sepia}%`;

        }
        //else if (option.id === "blure") {
        //     slideFilter.max = "100";
        //     slideFilter.value = blure;
        //     Vaaluee.innerText = `${blure}%`;

        // } 
        else {
            slideFilter.max = "100";
            slideFilter.value = grayscale;
            Vaaluee.innerText = `${grayscale}%`;
        }
    });
});

const changeFilter = () => {
    Vaaluee.innerText = `${slideFilter.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if (selectedFilter.id === "brightness") {
        brightness = slideFilter.value;
    } else if (selectedFilter.id === "saturation") {
        saturation = slideFilter.value;
    } else if (selectedFilter.id === "inversion") {
        inversion = slideFilter.value;
    } else if (selectedFilter.id === "sepia") {
        sepia = slideFilter.value;
    }
    //  else if (selectedFilter.id === "Blure") {
    //     blure = slideFilter.value;
    // } 
    else {
        grayscale = slideFilter.value;
    }
    filters();
}

rotateImage.forEach(option => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            rotation -= 90;
        } else if (option.id === "right") {
            rotation += 90;
        } else if (option.id === "horizontal") {
            Horizontal = Horizontal === 1 ? -1 : 1;
        } else {
            Vertical = Vertical === 1 ? -1 : 1;
        }
        filters();
    });
});

const reset = () => {
    brightness = "100";
    saturation = "100";
    inversion = "0";
    grayscale = "0";
    sepia = "0";
    rotate = 0;
    Horizontal = 1;
    Vertical = 1;
    Optioons[0].click();
    filters();
}

slideFilter.addEventListener("input", changeFilter);
resetFilterBtn.addEventListener("click", reset);
imgInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => imgInput.click());