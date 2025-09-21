function startRedirectCountdown(seconds, targetUrl) {
    let countdownTime = seconds;
    const countdownElement = document.getElementById('countdown');
    const skipButton = document.getElementById('skipButton');

    const interval = setInterval(() => {
        countdownTime--;
        if (countdownTime <= 0) {
            clearInterval(interval);
            window.location.href = targetUrl;
        }
        if (countdownElement) {
            countdownElement.textContent = `Redirecting in ${countdownTime} seconds...`;
        }
    }, 1000);

    if (skipButton) {
        skipButton.addEventListener('click', () => {
            clearInterval(interval);
            window.location.href = targetUrl;
        });
    }
}
