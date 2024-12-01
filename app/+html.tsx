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
        {/* Others Browser script */}
        <script dangerouslySetInnerHTML={{ __html: swScript }} />

        {/* Include the Safari script */}
        <script dangerouslySetInnerHTML={{ __html: safariScript }} />

        {/* PWA IOS */}
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='#FFAF5D' />
        <meta name='apple-mobile-web-app-title' content='Buddha-Nature' />
        <meta name='theme-color' content='#FFAF5D' />
        <link rel='apple-touch-icon' href='icons/Icon-192.png' />

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
    const hasShownA2HS = localStorage.getItem('hasShownA2HS') === 'true';

    if (!hasShownA2HS) {
        // Listen for the "beforeinstallprompt" event
        window.addEventListener('beforeinstallprompt', (event) => {
            console.log('Detected beforeinstallprompt event');
            // Prevent default mini-info bar from appearing
            event.preventDefault();
            deferredPrompt = event; // Save the event for triggering the prompt later
            
            // Show the custom banner
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
                    if (outcome === 'accepted') {
                        localStorage.setItem('hasShownA2HS', 'true'); // Mark as installed
                    }
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
                localStorage.setItem('hasShownA2HS', 'false'); // Track dismissal
            });
        });
    }
}
`;

const safariScript = `
  // Detect if it's Safari on an iOS device (this excludes all non-iOS browsers like Chrome/Firefox on iOS)
  const isSafariOnIos = () => {
    const ua = window.navigator.userAgent.toLowerCase();
    return (
      /iphone|ipad|ipod/.test(ua) && // iOS devices
      /safari/.test(ua) &&          // Safari browser
      !(/crios|fxios|opera/.test(ua)) // Not Chrome, Firefox, or other browsers
    );
  };

  // Detect if the app is running in "standalone" mode (i.e., as an installed PWA on iOS)
  const isInStandaloneMode = () => {
    return 'standalone' in window.navigator && window.navigator.standalone;
  };

  // Show instructions for adding to the home screen on Safari
  const showInstallMessageForSafari = () => {
    // Prevent multiple banners if already shown
    if (document.getElementById('safariInstallBanner')) return;

    // Create the banner container
    const installBanner = document.createElement('div');
    installBanner.id = 'safariInstallBanner';
    installBanner.style.cssText = \`
      position: fixed;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 320px;
      background: #333;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
      text-align: center;
      z-index: 1000;
      font-family: Arial, sans-serif;
    \`;

    // Text and instructions
    installBanner.innerHTML = \`
      <p style="margin: 0; font-size: 14px;">
        <strong>Add to Home Screen:</strong> Tap the 
        <span style="font-size: 18px;">&#x25B3;</span> 
        icon and then select "Add to Home Screen".
      </p>
      <button id="closeSafariBanner" style="
        margin-top: 8px;
        background: #555;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
      ">Dismiss</button>
    \`;

    // Append the banner to the body
    document.body.appendChild(installBanner);

    // Close button functionality
    const closeButton = document.getElementById('closeSafariBanner');
    closeButton?.addEventListener('click', () => {
      localStorage.setItem('safariInstallDismissed', 'true');
      installBanner.remove();
    });
  };

  // Check and display the banner only when necessary
  window.addEventListener('load', () => {
    const dismissed = localStorage.getItem('safariInstallDismissed') === 'true';

    if (isSafariOnIos() && !isInStandaloneMode() && !dismissed) {
      showInstallMessageForSafari();
    }
  });
`;