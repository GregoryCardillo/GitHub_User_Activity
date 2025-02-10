// Ruequest for https module
const https = require('https');

// Function to fetch GitHub Activity
function fetchGitHubActivity(username){
    const url = `https://api.github.com/users/${username}/events`;

    /* gitHub needs the "user agent key" in all the Http requests */
    const options = {
        headers: {
            'User agent': 'github-activity-cli'
        }
    };

    // HTTP call to the GitHub API using the https Node.js module
    https.get(url, options, (res) => {

        /*Empty string for collect the data */
        let data = '';

        /* This structure is necessary because http requests are transmitted in packets and must be reassembled before being used. "Chunk" is a data framment     */
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        /*The 'end' event is activated when all the response data are received by the server, means that no other data are coming. Now we can elaborate the complete response  */

        res.on('end', () => {
            try {
                // Convert the data string in a javascript object
                const events = JSON.parse(data);

                // Check if events is an array or have elements inside
                if (!Array.isArray(events) || events.lenght === 0) {
                    // Error message for error handling
                    console.log(`No recent activity found for user ${username}`);
                    return;
                }
            }
        })
    }
}