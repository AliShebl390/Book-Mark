var siteName = document.getElementById("siteName");
var siteLink = document.getElementById("siteLink");
var sites = [];
if (localStorage.getItem("Dataa") != null) {
    sites = JSON.parse(localStorage.getItem("Dataa"));

    display();
}
function addSite() {
    var site = {
        siteName: siteName.value,
        siteLink: formatLink(siteLink.value),
    };
    sites.push(site);
    display();
    clearInputs();
    localStorage.setItem("Dataa", JSON.stringify(sites));
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
        <td>` +
            sites[i].siteName +
            `</td>
        <td> <a href="` +
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
    siteName.value = "" 
    siteLink.value = "" 
}
