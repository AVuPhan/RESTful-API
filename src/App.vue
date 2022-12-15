<script>
import $ from 'jquery'
import AddressSearch from './components/AddressSearch.vue'

export default {
    data() {
        return {
            view: 'map',
            codes: [],
            neighborhoods: [],
            incidents: [],
            result: "",
            leaflet: {
                map: null,
                center: {
                    lat: 44.955139,
                    lng: -93.102222,
                    address: ""
                },
                zoom: 12,
                bounds: {
                    nw: {lat: 45.008206, lng: -93.217977},
                    se: {lat: 44.883658, lng: -92.993787}
                },
                neighborhood_markers: [
                    {location: [44.942068, -93.020521], marker: null},
                    {location: [44.977413, -93.025156], marker: null},
                    {location: [44.931244, -93.079578], marker: null},
                    {location: [44.956192, -93.060189], marker: null},
                    {location: [44.978883, -93.068163], marker: null},
                    {location: [44.975766, -93.113887], marker: null},
                    {location: [44.959639, -93.121271], marker: null},
                    {location: [44.947700, -93.128505], marker: null},
                    {location: [44.930276, -93.119911], marker: null},
                    {location: [44.982752, -93.147910], marker: null},
                    {location: [44.963631, -93.167548], marker: null},
                    {location: [44.973971, -93.197965], marker: null},
                    {location: [44.949043, -93.178261], marker: null},
                    {location: [44.934848, -93.176736], marker: null},
                    {location: [44.913106, -93.170779], marker: null},
                    {location: [44.937705, -93.136997], marker: null},
                    {location: [44.949203, -93.093739], marker: null}
                ]
            }
        };
    },
    components: {
        AddressSearch
    },
    methods: {
        viewMap(event) {
            this.view = 'map';
        },


        //need a new method so it doesn't mess with the starter code, put everything from viewMap to below:
        addressSearch(event){
            console.log(this.result);
            /*
            if(this.neighborhoods.length !== 0){
                let url = 'http://localhost:8000/neighborhoods?neighborhood_number=' + this.neighborhoods.toString;
                this.getJSON(url).then((result) => {
                });
            }
            */
            this.view = 'map';
        },

        viewNewIncident(event) {
            this.view = 'new_incident';
        },

        //create new method for new incident form
        createNewIncidentForm(event){
            console.log("does this work?");
            /*
            console.log(this.case_number_value);
            console.log(this.datetime);
            console.log(this.incident_value);
            console.log(this.code_value);
            console.log(this.police_grid_value);
            console.log(this.neighborhood_number_value);
            console.log(this.block_value);
            let url = 'http://localhost:8080/new-incident';
            */
            //now that I have the url and access to data, need to do put request and create JSON payload with the values
            let payload = {"case_number":this.case_number_value, "datetime":this.datetime+':00', "code":this.code_value, "incident":this.incident_value,
            "police_grid":this.police_grid_value, "neighborhood_number":this.neighborhood_number_value, "block":this.block_value};
            console.log(payload);
            this.uploadJSON('PUT', url, payload).then((result) => {
                console.log(result);
});

        },

        viewAbout(event) {
            this.view = 'about';
        },

        getJSON(url) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    dataType: 'json',
                    url: url,
                    success: (response) => {
                        resolve(response);
                    },
                    error: (status, message) => {
                        reject({status: status.status, message: status.statusText});
                    }
                });
            });
        },

        uploadJSON(method, url, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: method,
                    url: url,
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(data),
                    dataType: 'text',
                    success: (response) => {
                        resolve(response);
                    },
                    error: (status, message) => {
                        reject({status: status.status, message: status.statusText});
                    }
                });
            });
        }
    },
    mounted() {
        this.leaflet.map = L.map('leafletmap').setView([this.leaflet.center.lat, this.leaflet.center.lng], this.leaflet.zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 11,
            maxZoom: 18
        }).addTo(this.leaflet.map);
        this.leaflet.map.setMaxBounds([[44.883658, -93.217977], [45.008206, -92.993787]]);

        let district_boundary = new L.geoJson();
        district_boundary.addTo(this.leaflet.map);

        this.getJSON('/data/StPaulDistrictCouncil.geojson').then((result) => {
            // St. Paul GeoJSON
            $(result.features).each((key, value) => {
                district_boundary.addData(value);
            });
        }).catch((error) => {
            console.log('Error:', error);
        });
    }
}
</script>

<template>
    <div class="grid-container">
        <div class="grid-x grid-padding-x">
            <p :class="'cell small-4 ' + ((view === 'map') ? 'selected' : 'unselected')" @click="viewMap">Map</p>
            <p :class="'cell small-4 ' + ((view === 'new_incident') ? 'selected' : 'unselected')" @click="viewNewIncident">New Incident</p>
            <p :class="'cell small-4 ' + ((view === 'about') ? 'selected' : 'unselected')" @click="viewAbout">About</p>
        </div>
    </div>
    <div v-show="view === 'map'">
        <div class="grid-container">
            <div class="grid-x grid-padding-x">
                <div id="leafletmap" class="cell auto"></div>
            </div>
            <div class="grid-x grid-padding-x">
                <label for="address">Address or Lat/Long:</label><br>
                <input type="text" name="address" v-model="result"><br>
                <button class = button type="button" @click="addressSearch">Submit</button>
            </div>
        </div>
    </div>
    <div v-if="view === 'new_incident'">
        <!-- Replace this with your actual form: can be done here or by making a new component -->
        <div class="grid-container">
            <div>
                <h1>New Incident Form</h1>
                <h2>Please Fill Out All Relevant Fields</h2>
                <div>
                <label for="case_number">Case Number</label><br>
                <input type="text" v-model = "case_number_value" name="case_number">
                <label for="date_time">Date and Time</label><br>
                <input type="datetime-local" v-model="datetime" name="date_time">
                <label for="incident">Incident</label><br>
                <input type="text" v-model = "incident_value" name="incident">
                <label for="code">Code</label><br>
                <input type="number" v-model = "code_value" name="code">
                <label for="police_grid">Police Grid</label><br>
                <input type="number" v-model = "police_grid_value" name="police_grid">
                <label for="neighborhood_number">Neighborhood Number</label><br>
                <input type="number" v-model = "neighborhood_number_value" name="neighborhood_number">
                <label for="block">Block</label><br>
                <input type="text" v-model = "block_value" name="block">
            </div>
            <button class=button type="submit" @click="createNewIncidentForm">Submit</button>
            </div>
        </div>
    </div>
    <div v-if="view === 'about'">
        <!-- Replace this with your actual about the project content: can be done here or by making a new component -->
        <div class="grid-container">
            <div class="grid-x grid-padding-x">
                <h1 class="cell auto">About the Project</h1><br>
                <h2 class="cell auto">Creators</h2><br>
                <h3 class="cell auto">Andy Phan</h3><br>
                <!-- Insert Image Here -->
                <p class="cell auto"></p><br>
                <h3 class="cell auto">Carynn Vuong</h3><br>
                <!-- Insert Image Here -->
                <p class="cell auto"></p><br>
                <h3 class="cell auto">Matthew Pastrana</h3><br>
                <!-- Insert Image Here -->
                <p class="cell auto"></p><br>
            </div>
        </div>
    </div>
</template>

<style>
#leafletmap {
    height: 500px;
}

.selected {
    background-color: rgb(10, 100, 126);
    color: white;
    border: solid 1px white;
    text-align: center;
    cursor: pointer;
}
.unselected {
    background-color: rgb(200, 200, 200);
    color: black;
    border: solid 1px white;
    text-align: center;
    cursor: pointer;
}
button{
    margin: 25px 5px 20px 20px;
}
</style>
