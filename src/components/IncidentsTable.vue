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
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">{{ item.case_number }}</td>
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">{{ item.date }}</td>
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">{{ item.time }}</td>
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">{{ item.incident }}</td>
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">{{ item.police_grid }}</td>
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">{{ item.neighborhood_name }}</td>
                <td><button class="button" type="button" @click="deleteIncident(item.case_number)">Delete Incident</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style>
.even {
    width: 40rem;
    margin: 0;
    background-color: rgb(255, 255, 255);
}

.odd {
    width: 40rem;
    margin: 0;
    background-color: rgb(88, 88, 88);
}
.no_image {
    height: 80px;
}
</style>