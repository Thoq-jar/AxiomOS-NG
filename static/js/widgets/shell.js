document.addEventListener('DOMContentLoaded', () => {
    const shellInput = document.getElementById('shellInput');
    const shellOutput = document.getElementById('shellOutput');

    shellInput.addEventListener('keydown', async (event) => {
        if(event.key === 'Enter') {
            const command = shellInput.value;
            shellInput.value = '';

            if (command.trim().toLowerCase() === 'clear') {
                shellOutput.textContent = '';
            } else {
                await runShellCommand(command);
            }

            shellInput.focus();
        }
    });
});

async function runShellCommand(command) {
    try {
        const response = await fetch(`/shell?command=${encodeURIComponent(command)}`);
        const text = await response.text();

        const outputElement = document.getElementById('shellOutput');
        const commandLine = `$ ${command}\n`;
        const resultLine = `${text}\n`;
        outputElement.textContent += commandLine + resultLine;

        outputElement.scrollTop = outputElement.scrollHeight;
    } catch (error) {
        console.error('Error executing command:', error);
    }
}
