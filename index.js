// Ruequest for https module
const https = require('https');

// Function to fetch GitHub Activity
function fetchGitHubActivity(username){
    const url = `https://api.github.com/users/${username}/events`;

    /* gitHub needs the "user agent key" in all the Http requests*/
    const options = {
        headers: {
            "User-Agent": "github-activity-cli"
        }
    };
    
    // HTTP call to the GitHub API using the https Node.js module
    https.get(url, options, (res) => {

        /*Empty string for collect the data*/
        let data = '';

        /* This structure is necessary because http requests are transmitted in packets and must be reassembled before being used. "Chunk" is a data framment*/
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        /*The 'end' event is activated when all the response data are received by the server, means that no other data are coming. Now we can elaborate the complete response*/

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

                //Takes the first 5 element of the 'events' array and process them to generate a message based on the event type
                events.slice(0, 5).forEach(event => {
                    let message = '';
                    switch (event.type) {
                        //The user have sent commits (push) to a repository
                        case 'PushEvent':
                            message = `Pushed ${event.payload.commits.length} commits to ${event.repo.name}`;
                            break;
                        //The user a opened new issue in the repository
                        case 'IssueEvent':
                            message = `Opened a new issue in ${event.repo.name}`;
                            break; 
                        //The user as 'starred' the repository
                        case 'WatchEvent':
                        message = `Starred ${event.repo.name}`;
                        default:
                            message = `Performed ${event.type} in ${event.repo.name}`
                    }
                    console.log(`- ${message}`);
                });
                // The 'catch' catches the error and prints a message to the console.
            } catch (error) {
                console.error('Error parsing response:', error.message);
            }
        });
        //Intercept HTTP request errors
    }).on('error', (error) => {
        console.error('Error fetching data:', error.message);
    });
}

//Get GitHub name from command line and verify valid argument is provided
//process.argv is an array containing the arguments passed on the command line.
const username = process.argv[2];
if(!username) {
    console.error('Usage: node index.js <username>');

//terminates the script execution with an error code (1 indicates an abnormal exit).
    process.exit(1);
}

fetchGitHubActivity(username);