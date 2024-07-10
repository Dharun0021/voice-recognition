document.addEventListener('DOMContentLoaded', (event) => {
    const btn = document.querySelector('.speak');
    const content = document.querySelector('.mick');

    if (btn && content) {
        function speak(text) {
            const text_speak = new SpeechSynthesisUtterance(text);
            text_speak.rate = 1;
            text_speak.volume = 1;
            text_speak.pitch = 1;
            window.speechSynthesis.speak(text_speak);
        }

        function wishMe() {
            const day = new Date();
            const hour = day.getHours();

            if (hour >= 0 && hour < 12) {
                speak("Good Morning Boss...");
            } else if (hour >= 12 && hour < 17) {
                speak("Good Afternoon Master...");
            } else {
                speak("Good Evening Sir...");
            }
        }

        window.addEventListener('load', () => {
            speak("Initializing Dharun...");
            wishMe();
        });

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onresult = (event) => {
            const currentIndex = event.resultIndex;
            const transcript = event.results[currentIndex][0].transcript;
            content.textContent = transcript;
            takeCommand(transcript.toLowerCase());
        };

        recognition.onend = () => {
            if (!stopRecognition) {
                recognition.start();
            }
        };

        let stopRecognition = false;

        btn.addEventListener('click', () => {
            content.textContent = "Listening...";
            stopRecognition = false;
            recognition.start();
        });

        function takeCommand(message) {
            if (message.includes('hey') || message.includes('hello')) {
                speak("Hello Sir, I am Dharun. How may I help you?");
            } else if (message.includes("open google")) {
                window.open("https://google.com", "_blank");
                speak("Opening Google...");
            } else if (message.includes("open youtube")) {
                window.open("https://www.youtube.com", "_blank");
                speak("Opening YouTube...");
            } else if (message.includes("open facebook")) {
                window.open("https://facebook.com", "_blank");
                speak("Opening Facebook...");
            } else if (message.includes("open linkedin")) {
                window.open("https://linkedin.com", "_blank");
                speak("Opening LinkedIn...");
            } else if (message.includes("open chatgpt")) {
                window.open("https://chat.openai.com", "_blank");
                speak("Opening ChatGPT...");
            } else if (message.includes("open my profile")) {
                // Replace with your profile URL
                window.open("https://your-profile-url.com", "_blank");
                speak("Opening your profile...");
            } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
                window.open(`https://www.google.com/search?q=${message.replace(/\s/g, "+")}`, "_blank");
                const finalText = "This is what I found on the internet regarding " + message;
                speak(finalText);
            } else if (message.includes('wikipedia')) {
                window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim().replace(/\s/g, "_")}`, "_blank");
                const finalText = "This is what I found on Wikipedia regarding " + message;
                speak(finalText);
            } else if (message.includes('time')) {
                const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
                const finalText = "The current time is " + time;
                speak(finalText);
            } else if (message.includes('date')) {
                const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
                const finalText = "Today's date is " + date;
                speak(finalText);
            } else if (message.includes('calculator')) {
                window.open('https://www.online-calculator.com/', '_blank');
                const finalText = "Opening online calculator";
                speak(finalText);
            } else if (message.includes('stop')) {
                speak("Stopping recognition... Thank you ");
                stopRecognition = true;
                recognition.stop();
            } else {
                window.open(`https://www.google.com/search?q=${message.replace(/\s/g, "+")}`, "_blank");
                const finalText = "I found some information for " + message + " on Google";
                speak(finalText);
            }
        }
    } else {
        console.error("Required elements not found in the DOM");
    }
});