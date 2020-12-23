var months = {"1":"January", "2":"February", "3":"March", "4":"April", "5":"May", "6":"June", "7":"July", "8":"August", "9":"September", "10":"October", "11":"November", "12":"December"};
var days = {"1":"31", "2":"28", "3":"31", "4":"30", "5":"31", "6":"30", "7":"31", "8":"31", "9":"30", "10":"31", "11":"30", "12":"31"}

document.addEventListener('DOMContentLoaded', function() {

	document.querySelector('#minmonth').addEventListener('input', function(){
		// need handle bissextile years 
		document.querySelector('#minday').max = days[this.value];				
	});

	document.querySelectorAll('.search-elem').forEach( function(element) {
		element.addEventListener("change", function(){
			setTimeout(doSearch,400);
		})
	});

	document.querySelectorAll('.search-elem-text').forEach( function(element) {
		element.addEventListener("keyup", function(){
			setTimeout(doSearch,400);
		})
	});

	function doSearch(){
		fetch('/admin/score_search', {
	        method: "POST",
	        credentials: 'include',
	        headers: {
	          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
	          'Content-Type': 'application/json'          
	        },
	        body: JSON.stringify({
	        rating_search: {
	          minday: document.querySelector("#minday").value,
	          minmonth: document.querySelector("#minmonth").value,
	          minyear: document.querySelector("#minyear").value,
	          maxday: document.querySelector("#maxday").value,
	          maxmonth: document.querySelector("#maxmonth").value,
	          maxyear: document.querySelector("#maxyear").value,
	          minwords: document.querySelector("#minwords").value,
	          maxwords: document.querySelector("#maxwords").value
	        }        
	      	})

      }).then(r => r.json())
        .then(r => {        	
        	console.log(r.message);
        	if(r["story_selection"]){
        		document.querySelector('#search-results').innerHTML = "";
        		r.story_selection.forEach( function(s) {
        			document.querySelector('#search-results').innerHTML += 
        			`<p>
        				<span class="id">${s[0]}</span>
        				<span class="title">${s[1]}</span>
        				<span class="author">${s[2]}</span>
        				<span class="email">${s[3]}</span>
        			</p>
        			`
        		});
        	};
        });

    };

}, false);