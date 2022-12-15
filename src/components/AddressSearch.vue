<script>
export default {
    props: {
        result_array: Array
    },
    watch: {
        result_array() {
            console.log(this.result_array);
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
                <th>Incident</th>
                <th>Police Grid</th>
                <th>Neighborhood</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in result_array">
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">{{ item.case_number }}</td>
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">{{ item.date }}</td>
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">{{ item.time }}</td>
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">{{ item.code }}</td>
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">{{ item.police_grid }}</td>
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">{{ item.neighborhood_number }}</td>
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