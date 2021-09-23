document.addEventListener('DOMContentLoaded', function() {

const licenseButtons = document.querySelectorAll(".single_license");
const licenseField = document.querySelector("#license-value input");

licenseButtons.forEach(function(b){
	b.addEventListener('click', function(e){
		licenseField.value = b.dataset.licenseName;
	})
})


}, false);	