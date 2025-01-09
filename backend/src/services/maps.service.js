import axios from 'axios';


const getAddressCoordinates = async (query) => {
    const apiKey = process.env.GRAPHHOPPER_MAP_URL; // Replace with your GraphHopper API key
    const url = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.hits && response.data.hits.length > 0) {
            const { lat, lng } = response.data.hits[0].point;
            return { latitude: lat, longitude: lng };
        } else {
            throw new Error('No coordinates found for the given query.');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};

const getDistanceAndTime = async (address1, address2) => {
    const apiKey = process.env.GRAPHHOPPER_MAP_URL; // Ensure the API key is stored in an environment variable

    try {
        // Step 1: Get coordinates for both addresses
        const [coords1, coords2] = await Promise.all([
            getAddressCoordinates(address1),
            getAddressCoordinates(address2),
        ]);

        // Step 2: Build the GraphHopper API URL
        const url = `https://graphhopper.com/api/1/route?point=${coords1.latitude},${coords1.longitude}&point=${coords2.latitude},${coords2.longitude}&vehicle=car&key=${apiKey}`;

        // Step 3: Fetch the route data
        const response = await axios.get(url);

        if (response.data.paths && response.data.paths.length > 0) {
            const { distance, time } = response.data.paths[0];

            // Convert distance to kilometers
            const distanceKm = (distance / 1000).toFixed(2);

            // Calculate time in days, hours, and minutes
            const timeInMs = time;
            const totalMinutes = Math.floor(timeInMs / (1000 * 60));
            const days = Math.floor(totalMinutes / (24 * 60));
            const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
            const minutes = totalMinutes % 60;

            // Format time text
            const timeText = days > 0
                ? `${days}d ${hours}h ${minutes}m`
                : hours > 0
                ? `${hours}h ${minutes}m`
                : `${minutes}m`;

            // Return results
            return {
                distance: {
                    value: distance, // Distance in meters
                    inKm: distanceKm, // Distance in kilometers
                },
                time: {
                    value: time, // Time in milliseconds
                    text: timeText, // Formatted time
                },
            };
        } else {
            throw new Error('No route data found');
        }
    } catch (error) {
        console.error('Error fetching distance and time:', error.message);
        throw error;
    }
};


const getAutoCompleteSuggestions = async (input) => {
    const apiKey = process.env.GRAPHHOPPER_MAP_URL; // Replace with your GraphHopper API key
    const url = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.hits && response.data.hits.length > 0) {
            // Map the hits to the desired format
            return response.data.hits.map(hit => {
                const houseNumber = hit.house_number || ''; // Check for house number if available
                const street = hit.street || '';
                const city = hit.name || '';
                const state = hit.state || '';
                const country = hit.country || '';

                // Concatenate fields, filter empty values, and join them with commas
                const formattedAddress = [
                    houseNumber,
                    street,
                    city,
                    state,
                    country
                ].filter(Boolean).join(', ');

                return {
                    name: formattedAddress, // Human-readable name
                    raw: hit // Include raw hit data for further use if needed
                };
            });
        } else {
            throw new Error('No suggestions found for the given input.');
        }
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
        throw error;
    }
};






export default {getAddressCoordinates,getDistanceAndTime,getAutoCompleteSuggestions};