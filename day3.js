const { exec } = require('child_process');

function executeCommand(command) {
    // Execute the shell command
    exec(command, (error, stdout, stderr) => {
        if (error) {
            // Handle error
            console.error(`Error executing command: ${error.message}`);
            return;
        }

        // Print the output of the command
        console.log(`Command Output:\n${stdout}`);
    });
}

// Test cases
executeCommand('ls -la');
executeCommand('echo "Hello, Node.js!"');
