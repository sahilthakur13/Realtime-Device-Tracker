const socket = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position)=>{
            const {latitude, longitude} = position.coords;
            socket.emit('send-location',{latitude,longitude});
        },
        (error)=>{
            console.log(error);
        },
        {
            enableHighAccuracy:true,
            maximumAge:0,
            timeout:4000,
        }
    )
}
//ager leaflet use kerna ho to hum usko ese use ker sakte hain ::--  L.map('map');
 const map = L.map('map').setView([0,0],17);

 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:"a-BRA ka da-BRA"
 }).addTo(map);


 const markers = {};

 socket.on('recive-location',(data)=>{
    const {id,latitude,longitude} = data;
    map.setView([latitude,longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude],17)
    }
    else{
        markers[id] = L.marker([latitude,longitude]).addTo(map);
    }
    //for disconecting
    socket.on('user-disconnected',function(id){
        if(markers[id]){
            map.removeLayer(markers[id])
            delete markers[id];
        }
    })
 });