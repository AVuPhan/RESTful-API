export async function addressToLatLon(address) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}`, {
        method: 'GET'
    })

    const { lat, lon } = await response.json();
    return { lat, lon }
}