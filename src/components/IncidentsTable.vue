<script>
export default {
    props: {
        result_array: Array
    },
    watch: {
        result_array() {
            console.log(this.result_array);
        }
    },
    methods: {
        deleteIncident(event) {
            console.log("Delete this: " + event);
            let payload = {
                code: event,
            };
                this.uploadJSON("DELETE", "http://localhost:8080/remove-incident", payload)
                .then((result) => {
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                })
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
       }
      }
    }

</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Case Number</th>
                <th>Date</th>
                <th>Time</th>
                <th>Incident Type</th>
                <th>Police Grid</th>
                <th>Neighborhood</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in result_array">
                <td v-if="item.code == 614 || (item.code >= 1800 && item.code <= 99826)" class="other">{{ item.case_number }}</td>
                <td v-else-if="(item.code >= 100 && item.code <= 200) || (item.code >= 400 && item.code <= 453) || (item.code >= 810 && item.code <= 863)" class="violent">{{ item.case_number }}</td>
                <td v-else class="property">{{ item.case_number }}</td>

                <td v-if="item.code == 614 || (item.code >= 1800 && item.code <= 99826)" class="other">{{ item.date }}</td>
                <td v-else-if="(item.code >= 100 && item.code <= 200) || (item.code >= 400 && item.code <= 453) || (item.code >= 810 && item.code <= 863)" class="violent">{{ item.date }}</td>
                <td v-else class="property">{{ item.date }}</td>

                <td v-if="item.code == 614 || (item.code >= 1800 && item.code <= 99826)" class="other">{{ item.time }}</td>
                <td v-else-if="(item.code >= 100 && item.code <= 200) || (item.code >= 400 && item.code <= 453) || (item.code >= 810 && item.code <= 863)" class="violent">{{ item.time }}</td>
                <td v-else class="property">{{ item.time }}</td>

                <td v-if="item.code == 614 || (item.code >= 1800 && item.code <= 99826)" class="other">{{ item.incident }}</td>
                <td v-else-if="(item.code >= 100 && item.code <= 200) || (item.code >= 400 && item.code <= 453) || (item.code >= 810 && item.code <= 863)" class="violent">{{ item.incident }}</td>
                <td v-else class="property">{{ item.incident }}</td>

                <td v-if="item.code == 614 || (item.code >= 1800 && item.code <= 99826)" class="other">{{ item.police_grid }}</td>
                <td v-else-if="(item.code >= 100 && item.code <= 200) || (item.code >= 400 && item.code <= 453) || (item.code >= 810 && item.code <= 863)" class="violent">{{ item.police_grid }}</td>
                <td v-else class="property">{{ item.police_grid }}</td>

                <td v-if="item.code == 614 || (item.code >= 1800 && item.code <= 99826)" class="other">{{ item.neighborhood_name }}</td>
                <td v-else-if="(item.code >= 100 && item.code <= 200) || (item.code >= 400 && item.code <= 453) || (item.code >= 810 && item.code <= 863)" class="violent">{{ item.neighborhood_name }}</td>
                <td v-else class="property">{{ item.neighborhood_name }}</td>

                <td><button class="button" type="button" @click="deleteIncident(item.case_number)">Delete Incident</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style>
.violent {
    width: 40rem;
    margin: 0;
    background-color: rgb(255, 0, 0);
}
.property {
    width: 40rem;
    margin: 0;
    background-color: rgb(0, 140, 255);
}

.other {
    width: 40rem;
    margin: 0;
    background-color: rgb(179, 179, 179);
}
.no_image {
    height: 80px;
}
</style>