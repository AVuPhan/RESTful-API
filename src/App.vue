<script>
import $ from "jquery";
import { resolveDirective } from "vue";
import IncidentsTable from "./components/IncidentsTable.vue";


export default {
  data() {
    return {
      view: "map",
      codes: [],
      neighborhoods: [],
      incidents: [],
      result: "",
      leaflet: {
        map: null,
        center: {
          lat: 44.955139,
          lng: -93.102222,
          address: "",
        },
        zoom: 12,
        bounds: {
          nw: { lat: 45.008206, lng: -93.217977 },
          se: { lat: 44.883658, lng: -92.993787 },
        },
        neighborhood_markers: [
          { location: [44.942068, -93.020521], marker: null },
          { location: [44.977413, -93.025156], marker: null },
          { location: [44.931244, -93.079578], marker: null },
          { location: [44.956192, -93.060189], marker: null },
          { location: [44.978883, -93.068163], marker: null },
          { location: [44.975766, -93.113887], marker: null },
          { location: [44.959639, -93.121271], marker: null },
          { location: [44.9477, -93.128505], marker: null },
          { location: [44.930276, -93.119911], marker: null },
          { location: [44.982752, -93.14791], marker: null },
          { location: [44.963631, -93.167548], marker: null },
          { location: [44.973971, -93.197965], marker: null },
          { location: [44.949043, -93.178261], marker: null },
          { location: [44.934848, -93.176736], marker: null },
          { location: [44.913106, -93.170779], marker: null },
          { location: [44.937705, -93.136997], marker: null },
          { location: [44.949203, -93.093739], marker: null },
        ],
      },
    };
  },
  components: {
    IncidentsTable,
  },
  methods: {
    viewMap(event) {
      let url = 'http://localhost:8080/incidents';
      if(this.startdatetime == null && this.enddatetime == null && this.incident_value == null && this.neighborhood_number_value == null && this.max_incidents == null){
      }
      else{
        url = url + "?"
        let counter = 0;
        if(this.neighborhood_number_value != null){
          url = url + "neighborhood=" + this.neighborhood_number_value;
          counter = counter + 1;
        }
        if(this.startdatetime != null){
          if(counter > 0){
            url = url + "&";
          }
          url = url + "start_date=" + this.startdatetime;
          counter = counter + 1;
        }
        if(this.enddatetime != null){
          if(counter > 0){
            url = url + "&";
          }
          url = url + "end_date=" + this.enddatetime;
          counter = counter + 1;
        }
        if(this.incident_value != null){
          if(counter > 0){
            url = url + "&";
          }
          url = url + "code=" + this.incident_value;
          counter = counter + 1;
        }
        if(this.max_incidents != null){
          if(counter > 0){
            url = url + "&";
          }
          url = url + "limit=" + this.max_incidents;
          counter = counter + 1;
        }
      }
      this.getJSON(url)
        .then((result) => {
          console.log(result);
          this.incidents = result;
          console.log("What are these: " + this.incidents[0]);
      })
      .catch((err) => {
        console.log(err);
      })
      new L.Marker([44.942068, -93.020521]).addTo(this.leaflet.map).bindPopup("1");
      new L.Marker([44.977413, -93.025156]).addTo(this.leaflet.map);
      new L.Marker([44.931244, -93.079578]).addTo(this.leaflet.map);
      new L.Marker([44.956192, -93.060189]).addTo(this.leaflet.map);
      new L.Marker([44.978883, -93.068163]).addTo(this.leaflet.map);
      new L.Marker([44.975766, -93.113887]).addTo(this.leaflet.map);
      new L.Marker([44.959639, -93.121271]).addTo(this.leaflet.map);
      new L.Marker([44.9477, -93.128505]).addTo(this.leaflet.map);
      new L.Marker([44.930276, -93.119911]).addTo(this.leaflet.map);
      new L.Marker([44.982752, -93.14791]).addTo(this.leaflet.map);
      new L.Marker([44.963631, -93.167548]).addTo(this.leaflet.map);
      new L.Marker([44.973971, -93.197965]).addTo(this.leaflet.map);
      new L.Marker([44.949043, -93.178261]).addTo(this.leaflet.map);
      new L.Marker([44.934848, -93.176736]).addTo(this.leaflet.map);
      new L.Marker([44.913106, -93.170779]).addTo(this.leaflet.map);
      new L.Marker([44.937705, -93.136997]).addTo(this.leaflet.map);
      new L.Marker([44.949203, -93.093739]).addTo(this.leaflet.map);
      this.view = "map";
    },

    //need a new method so it doesn't mess with the starter code, put everything from viewMap to below:
    addressSearch(event) {
      this.uploadJSON("POST", "http://localhost:8080/lookup", { address: this.result }).then((res)=>{
        console.log('Raw result:', res);
        let firstResult = null;
        try {
            const results = JSON.parse(res);
            firstResult = results[0];
        } catch(err) {
            //todo: SEND BACK SOME 404
        }
        if (firstResult) {
            console.log('Got a lat/lon::::')
            const { lat, lon } = firstResult;
            console.log(lat, lon)
            this.leaflet.map.setView([lat, lon], 15);
        }
    }).catch(err=>{
        console.error(err);
    });
    //   addressToLatLon(this.result, (err, res) => {
    //     console.log("Got address data", res);
    //   });
      //   console.log(`Value =(${this.result})`);
      /*
            if(this.neighborhoods.length !== 0){
                let url = 'http://localhost:8000/neighborhoods?neighborhood_number=' + this.neighborhoods.toString;
                this.getJSON(url).then((result) => {
                });
            }
            */
      this.view = "map";
    },

    viewNewIncident(event) {
      this.view = "new_incident";
    },

    //create new method for new incident form
    createNewIncidentForm(event) {
      console.log("does this work?");
      /*
            console.log(this.case_number_value);
            console.log(this.datetime);
            console.log(this.incident_value);
            console.log(this.code_value);
            console.log(this.police_grid_value);
            console.log(this.neighborhood_number_value);
            console.log(this.block_value);
            
            */
      let url = "http://localhost:8080/new-incident";
      //now that I have the url and access to data, need to do put request and create JSON payload with the values
      let payload = {
        case_number: this.case_number_value,
        datetime: this.datetime + ":00",
        code: this.code_value,
        incident: this.incident_value,
        police_grid: this.police_grid_value,
        neighborhood_number: this.neighborhood_number_value,
        block: this.block_value,
      };
      console.log(payload);
      this.uploadJSON("PUT", url, payload).then((result) => {
        console.log(result);
      });
    },

    viewAbout(event) {
      this.view = "about";
    },

    getJSON(url) {
      return new Promise((resolve, reject) => {
        $.ajax({
          dataType: "json",
          url: url,
          success: (response) => {
            resolve(response);
          },
          error: (status, message) => {
            reject({ status: status.status, message: status.statusText });
          },
        });
      });
    },

    uploadJSON(method, url, data) {
      return new Promise((resolve, reject) => {
        $.ajax({
          type: method,
          url: url,
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(data),
          dataType: "text",
          success: (response) => {
            resolve(response);
          },
          error: (status, message) => {
            reject({ status: status.status, message: status.statusText });
          },
        });
      });
    },
  },
  mounted() {
    this.leaflet.map = L.map("leafletmap").setView(
      [this.leaflet.center.lat, this.leaflet.center.lng],
      this.leaflet.zoom
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 11,
      maxZoom: 18,
    }).addTo(this.leaflet.map);
    this.leaflet.map.setMaxBounds([
      [44.883658, -93.217977],
      [45.008206, -92.993787],
    ]);

    let district_boundary = new L.geoJson();
    district_boundary.addTo(this.leaflet.map);

            //  const someMarker = n
            // someMarker.addTo(this.leaflet.map)
        
    this.getJSON("http://localhost:8080/incidents").then(async (result) => {
        const pins = {};
        const uniqueIncidents = [];
        for (const incident of result) {
          if ((new Date(incident.date)).valueOf() > (new Date('2022-12-01')).valueOf()){
            uniqueIncidents.push (incident);
          }
          else{
            if (!pins[incident.neighborhood_number]) {
                pins[incident.neighborhood_number] = [];
            } else {
                pins[incident.neighborhood_number].push(incident);
            }
          }
            
        }


        const formatBlock = (block) => { 
        const strs = block.split(' ');  
        strs[0] = strs[0].replace(/X/g, "0"); 
        return strs.join(' '); 
      }

      for (const incident of uniqueIncidents) {
          const { block } = incident;
          const address = `${formatBlock (block)} ST PAUL`;
          const [res] = JSON.parse((await this.uploadJSON('POST', 'http://localhost:8080/lookup', { address }))) ?? [];
                if (res && res.lat && res.lon) {
                    new L.Marker({
                        ...res,
                        zIndexOffset: 1000
                    }).addTo(this.leaflet.map);
                }
        }

        const neighborhoods = Object.keys(pins)
        for (const neighborhood of neighborhoods) {
        // await Promise.all(neighborhoods.map=> {
            const pinKey = parseInt(neighborhood);
            const [firstIncident] = pins?.[pinKey] ?? [];
            if (firstIncident) {
                const { block } = firstIncident;
                const address = `${formatBlock (block)} ST PAUL`;
                const [res] = JSON.parse((await this.uploadJSON('POST', 'http://localhost:8080/lookup', { address }))) ?? [];
                if (res && res.lat && res.lon) {
                    const arrayOfIncidentsInThisPin = pins[pinKey]
                    const popupContent = `<p> incidents in this neighborhood: ${arrayOfIncidentsInThisPin.length}</p>`
                    const marker = new L.Marker({
                        ...res,
                        zIndexOffset: 1000,
                        riseOnHover: true,
                        interactive: true
                    })
                    marker.bindPopup(popupContent);
                    marker.on('mouseover',function(ev){
                      ev.target.openPopup();
                    });
                    marker.on('mouseout',function(ev){
                      ev.target.closePopup();
                    });
                    marker.addTo(this.leaflet.map);

                }
            }
        }
    });
    

    this.getJSON("/data/StPaulDistrictCouncil.geojson")
      .then((result) => {
        // St. Paul GeoJSON
        $(result.features).each((key, value) => {
          district_boundary.addData(value);
        });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  },
};
</script>

<template>
  <div class="grid-container">
    <div class="grid-x grid-padding-x">
      <p
        :class="'cell small-4 ' + (view === 'map' ? 'selected' : 'unselected')"
        @click="viewMap"
      >
        Map
      </p>
      <p
        :class="'cell small-4 ' + (view === 'new_incident' ? 'selected' : 'unselected')"
        @click="viewNewIncident"
      >
        New Incident
      </p>
      <p
        :class="'cell small-4 ' + (view === 'about' ? 'selected' : 'unselected')"
        @click="viewAbout"
      >
        About
      </p>
    </div>
  </div>
  <div v-show="view === 'map'">
    <div class="grid-container">
      <div class="grid-x grid-padding-x">
        <div id="leafletmap" class="cell auto"></div>
      </div>
      <div class="grid-x grid-padding-x">
        <label for="address">Address or Lat/Long:</label><br />
        <input type="text" name="address" v-model="result" /><br />
        <button class="button" type="button" @click="addressSearch">Submit</button>
      </div>
      <div>
        <h4>Search Filters</h4>
      </div>
      <div class="grid-x grid-padding-x">
        <!--<input type="number" name="max_incidents" v-model="max_incidents" /><br />-->
        <label for="date_time">Start Date and Time</label><br />
        <input type="date" v-model="startdatetime" name="date_time"/>
        <label for="date_time">End Date and Time</label><br />
        <input type="date" v-model="enddatetime" name="date_time"/>
        <label for="incident">Incident</label><br />
        <input type="text" v-model="incident_value" name="incident"/>
        <label for="neighborhood_number">Neighborhood Name</label><br/>
        <input type="number" v-model="neighborhood_number_value" name="neighborhood_number"/>
        <label for="max_incidents">Max Incidents</label>
        <input type="number" v-model="max_incidents" name="max_incidents"/>
        <button class="button" type="button" @click="viewMap">View Crime Data</button>
        <div class="legend">
          <p style="color: rgb(255, 0, 0)">Violent Crimes</p>
          <p style="color: rgb(0, 140, 255)">Propert Crimes</p>
          <p style="color: rgb(179, 179, 179)">Other Crimes</p>
          <p></p>
        </div>
        <IncidentsTable :result_array="incidents" />
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
          <label for="case_number">Case Number</label><br />
          <input type="text" v-model="case_number_value" name="case_number" />
          <label for="date_time">Date and Time</label><br />
          <input type="datetime-local" v-model="datetime" name="date_time" />
          <label for="incident">Incident</label><br />
          <input type="text" v-model="incident_value" name="incident" />
          <label for="code">Code</label><br />
          <input type="number" v-model="code_value" name="code" />
          <label for="police_grid">Police Grid</label><br />
          <input type="number" v-model="police_grid_value" name="police_grid" />
          <label for="neighborhood_number">Neighborhood Number</label><br />
          <input
            type="number"
            v-model="neighborhood_number_value"
            name="neighborhood_number"
          />
          <label for="block">Block</label><br />
          <input type="text" v-model="block_value" name="block" />
        </div>
        <button class="button" type="submit" @click="createNewIncidentForm">
          Submit
        </button>
      </div>
    </div>
  </div>
  <div v-if="view === 'about'">
    <!-- Replace this with your actual about the project content: can be done here or by making a new component -->
    <div class="grid-container">
      <div class="grid-x grid-padding-x">
        <div class="cell small-auto large-auto" style="background-color: whitesmoke">
          <h1 style="text-align: center">Creators</h1>
        </div>
      </div>

      <div class="grid-x grid-padding-x">
        <div class="cell small-auto large-4">
          <h2>Andy Phan</h2>
          <img src="imgs\DSC0863125.jpg" alt="andyphanphoto" id="img" />
          <br />
          <p>
            My name is Andy and am from Burnsville MN. I am a senior studying computer
            science at the University of St. Thomas. Currently I have no concrete plans
            after college but I do want to find a job at a company where their values
            align with my own. Outside of work and school, I like to hang out with my
            friends and play frisbee gold during my free time. Some of my hobbies include
            camping, mountain biking, and pretty much anytihng outdoors.
          </p>
        </div>

        <div class="cell small-auto large-4">
          <h2>Carynn Vuong</h2>
          <!--Insert img link in line below-->
          <img src="imgs\carynn.jpeg" alt="carynnphoto" id="img" />
          <br />
          <p>
            Hi, my name is Carynn and I'm from San Francisco, CA. I'm a senior studying
            Data Analytics and Information Systems with a minor in Computer Science and
            Applied Statistics. I am an incoming Software Engineer at Target and currently
            an RA on campus and treasurer of SHPE.
          </p>
        </div>

        <div class="cell small-auto large-4">
          <h2>Matthew Pastrana</h2>
          <!--Insert img link in line below-->
          <img src="imgs\PastranaHeadshot.jpg" alt="matthewpastranaphoto" id="img" />
          <br />
          <p>My name is Matthew Pastrana and I am from Shakopee Minnesota. I am currently a 
            senior at the University of St. Thomas where I am studying Computer Science and 
            Finance. I currently have not accepted a position any where for post graduation, 
            however, I am hoping to work in software development.
          </p>
        </div>

        <div class="cell medium-auto large-auto">
          <h2>Six Interesting Discoveries</h2>
          <ol type="1">
            <li>The majority of crimes commited were either property related or other</li>
            <li>A large majority of the crimes were thefts</li>
            <li>Capitol River had the most crime reported</li>
            <li>Summit Hill had the least crime reported</li>
            <li>Capitol River and Summit Hill share a border and are at oppisite ends in terms of crimes reported</li>
            <li>Many neighborhoods fell between two extremes of crimes reported and not many where at the mean</li>
            <li>On March 31st 2022 there were 16 crimes in the St. Thomas Neighborhood (Union Park & Macalester-Groveland). Almost half of them were Auto theft related.</li>
          </ol>
        </div>
      </div>

      <div class="cell small-auto large-auto" style="background-color: whitesmoke">
        <h3 style="text-align: center">Video Presentation</h3>
        <!--Embed youtube video here-->
        <iframe 
            style="display: block"
            width="1000em" 
            height="500em" 
            src="https://www.youtube.com/embed/2y4dt2fvAV0" 
            title="project 4 demo" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
        <br />
      </div>
      <br />
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
.legend {
  border: solid 1px rgb(0, 0, 0);
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
button {
  margin: 25px 5px 20px 20px;
}
#img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 10px 10px 5px #ccc;
  border-radius: 25px;
  width: 15em;
}
h1,
h2,
p {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
