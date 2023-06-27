const btnEl = document.getElementById("btn");

const errorMessageEl = document.getElementById("errorMessage");

const galleryEl = document.getElementById("gallery");




async function fetchImage() {
    const inputValue = document.getElementById("input").value;

    if (inputValue > 10 || inputValue < 1) {
        errorMessageEl.style.display = "block"
        errorMessageEl.innerText = "Number shoudl be between 0 and 11"
        return;

    }

    imgs = "";
    try {


        btnEl.style.display = "none";
        const loading = `<img src = "spinner.svg" />`;
        galleryEl.innerHTML = loading;
        await fetch(
            `https://api.unsplash.com/photo?per_page=${inputValue}
        &page=${Math.round(Math.random * 1000)}1&client_id=B0UnctrPQbhA9tdoJnAsQwwPYLVhbVCmCgyc35zIMRI`
        )
            .then(
                (res) =>
                    res.json().then((data) => {
                        if (data) {
                            data.forEach((pic) => {
                                imgs += `
                                <img src= ${pic.urls.small}
                                alt = "image"/>
                                `;

                                galleryEl.style.display = "block";
                                galleryEl.innerHTML = imgs;
                                btnEl.style.display = "block";
                                errorMessageEl.style.display = "none";


                            });
                        }

                    })
            );

    } catch (error) {



        errorMessageEl.style.display = "block";
        errorMessageEl.innerText = "and error happend, try again later"
        btnEl.style.display = "block";
        galleryEl.style.display = "none";


    }


}





btnEl.addEventListener("click", fetchImage);