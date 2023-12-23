var siteName = document.getElementById("siteName");
var siteLink = document.getElementById("siteLink");
const myModal = new bootstrap.Modal ('#alertModel');
var sites = [];
if (localStorage.getItem("Dataa") != null) {
    sites = JSON.parse(localStorage.getItem("Dataa"));

    display();
}

function addSite() {
    if (validURL() == true && validName() == true) {
        var site = {
            siteName: siteName.value,
            siteLink: formatLink(siteLink.value),
        };
        sites.push(site);
        display();
        clearInputs();
        localStorage.setItem("Dataa", JSON.stringify(sites));
    } else {
        myModal.show();
    }
}

function formatLink(link) {
    // Check if the link starts with "http://" or "https://"
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
        // If not, prepend "https://"
        link = "https://" + link;
    }
    return link;
}

function display() {
    var output = ``;
    for (var i = 0; i < sites.length; i++) {
        output +=
            `<tr>
        <td>` +
            (i + 1) +
            `</td>
        <td class="text-capitalize fw-bold">` +
            sites[i].siteName +
            `</td>
        <td> <a target="_blank" href="` +
            sites[i].siteLink +
            `" class="btn px-4">Visit</a> </td>
        <td> <button onclick="deleteSite(` +
            i +
            `)" class="btn"> Delete</button> </td>
    </tr>`;
    }
    document.getElementById("myData").innerHTML = output;
}

function deleteSite(index) {
    sites.splice(index, 1);
    display();
    localStorage.setItem("Dataa", JSON.stringify(sites));
}

function clearInputs() {
    siteName.value = "";
    siteLink.value = "";
}

siteLink.addEventListener("input", validURL);
function validURL() {
    let regexURL = /www\.[A-Za-z]+\.[A-Za-z]{2,}/gi;
    if (regexURL.test(siteLink.value) == true) {
        siteLink.classList.add("is-valid");
        siteLink.classList.remove("is-invalid");
        return true;
    } else {
        siteLink.classList.remove("is-valid");
        siteLink.classList.add("is-invalid");
        return false;
    }
}

siteName.addEventListener("input", validName);
function validName() {
    let regexName = /[A-Za-z]{3,}/gi;
    if (regexName.test(siteName.value) == true) {
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        return true;
    } else {
        siteName.classList.remove("is-valid");
        siteName.classList.add("is-invalid");
        return false;
    }
}
