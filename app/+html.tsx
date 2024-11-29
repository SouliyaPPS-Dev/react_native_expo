import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <link rel='manifest' href='/manifest.json' />
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        />
        <script dangerouslySetInnerHTML={{ __html: swScript }} />
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}

// Service Worker and Add to Home Screen Code
const swScript = `
if ('serviceWorker' in navigator) {
    // Register the service worker
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered successfully with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });

    let deferredPrompt; // To handle the "Add to Home Screen" prompt

    // Listen for the "beforeinstallprompt" event
    window.addEventListener('beforeinstallprompt', (event) => {
        console.log('Detected beforeinstallprompt event');

        // Prevent default mini-info bar from appearing
        event.preventDefault();
        deferredPrompt = event; // Save the event for triggering the prompt later

        // Display the custom "Add to Home Screen" banner
        const installAlert = document.createElement('div');
        installAlert.style.position = 'fixed';
        installAlert.style.bottom = '20px';
        installAlert.style.left = '50%';
        installAlert.style.transform = 'translateX(-50%)';
        installAlert.style.backgroundColor = '#ffffff';
        installAlert.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
        installAlert.style.borderRadius = '12px';
        installAlert.style.padding = '15px 20px';
        installAlert.style.zIndex = '1000';
        installAlert.style.display = 'flex';
        installAlert.style.alignItems = 'center';
        installAlert.style.justifyContent = 'space-between';
        installAlert.style.width = '95%';
        installAlert.style.maxWidth = '400px';
        installAlert.style.fontFamily = 'Arial, sans-serif';

        // Add content: message, install button, and close button
        installAlert.innerHTML = \`
            <div style="flex: 1;">
                <p style="
                    margin: 0;
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;
                ">Add to Home Screen</p>
                <p style="
                    margin: 0;
                    font-size: 14px;
                    color: #666;
                ">Install this app for a better user experience!</p>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <button id="install-pwa-button" style="
                    background-color: #ab5f14;
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: bold;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                ">Install</button>
                <button id="close-alert-button" style="
                    background-color: #bdbdbd;
                    color: #fff;
                    font-size: 14px;
                    font-weight: bold;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                ">Close</button>
            </div>
        \`;

        // Append the alert to the body
        document.body.appendChild(installAlert);

        // Automatically remove the alert after 15 seconds
        const timeout = setTimeout(() => {
            console.log('Install alert timed out after 15 seconds');
            installAlert.remove();
        }, 15000);

        // Handle "Install" button click
        const installButton = document.getElementById('install-pwa-button');
        installButton?.addEventListener('click', async () => {
            clearTimeout(timeout); // Cancel timeout when interacting
            if (deferredPrompt) {
                deferredPrompt.prompt(); // Trigger the install prompt
                const { outcome } = await deferredPrompt.userChoice;
                console.log('User choice:', outcome);
                deferredPrompt = null; // Clear saved prompt after user action
            }
            installAlert.remove(); // Once clicked, remove the alert
        });

        // Handle "Close" button click
        const closeButton = document.getElementById('close-alert-button');
        closeButton?.addEventListener('click', () => {
            console.log('Install alert closed manually by user');
            clearTimeout(timeout); // Cancel timeout
            installAlert.remove(); // Remove alert
        });
    });
}
`;
