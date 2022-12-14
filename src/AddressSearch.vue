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
    <ol>
        <li v-for="(item, index) in result_array" :class="(index % 2 === 0) ? 'even' : 'odd'">{{ item.name }}</li>
    </ol>
    <table>
        <thead>
            <tr>
                <th>Cod3</th>
                <th>Incident</th>
                <th>Neighborhood</th>
                <th>Block</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in result_array">
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">{{ index }}</td>
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">
                    <img v-if="item.images.length > 0" :src="item.images[0].url" width="80" height="80"/>
                    <div v-else class="no_image"></div>
                </td>
                <td :class="(index % 2 === 0) ? 'even' : 'odd'"><a :href=item.external_urls.spotify>{{ item.name }}</a></td>
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">
                    <ul><li v-for="genre in item.genres">{{genre}}</li></ul>
                </td>
                <td :class="(index % 2 === 0) ? 'even' : 'odd'">{{ item.followers.total }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style>
.even {
    width: 40rem;
    margin: 0;
    background-color: rgb(167, 162, 235);
}

.odd {
    width: 40rem;
    margin: 0;
    background-color: rgb(199, 252, 192);
}
.no_image {
    height: 80px;
}
</style>