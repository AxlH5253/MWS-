var mymap = L.map('mapid').setView([1.4631164,124.8248973],20);
		 L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		 	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		 	maxZoom: 20,
		 	id: 'mapbox.streets',
		 	accessToken: 'pk.eyJ1IjoiYXhsaGFudWViaTUyNTMiLCJhIjoiY2puaWd2NjU4MG9rNTNrcGMwbjl0bzBuMSJ9.eJuE4O8o6joYF7xuauFZ8w'
		 }).addTo(mymap);


 const url = "data/peta.json";

console.log(URL);

fetch(url,{mode:'cors'})
    .then(function(response){
        return response.json();
    })
    .then(function(myJson){
        localStorage.setItem('places', JSON.stringify(myJson.places));
    })
    .then(function(){
        let promise = JSON.parse(localStorage.getItem('places'));
        for (i in promise){
            var latlng = promise[i].lokasi;
            var marker = L.marker(latlng)
            .bindPopup(promise[i].sponsor)
            .addTo(mymap);

            marker.review = promise[i].review;
            marker.img = promise[i].gambar;
            marker.judul = promise[i].sponsor;

           marker.on('click',function(e){
                document.getElementById('gambar').innerHTML = '<img class="gambarReview" alt="image" src="'+this.img+'"></img>';
                document.getElementById('review').innerHTML = '<p>'+ this.review + '</p>';
            });

            console.log(latlng);
        }
    });


    mymap.on('click',function(e){
        document.getElementById('gambar').innerHTML = 'Gambar disini' ;
        document.getElementById('review').innerHTML = 'Tulis review disini'; 
    });