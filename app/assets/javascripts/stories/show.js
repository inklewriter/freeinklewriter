// Advertisement handling
document.addEventListener('DOMContentLoaded', function() {

    const AdvertItems = document.querySelectorAll("#sidebar-ads > div");

    AdvertItems.forEach(function(element){
        
        if(window.localStorage.getItem(element.dataset.adname) == "closed"){
            element.style.visibility = "hidden";
        };

        element.querySelector(".ad-close").addEventListener('click', function(){
            element.style.visibility = "hidden";
            window.localStorage.setItem(element.dataset.adname, 'closed')
        })
    });

}, false);