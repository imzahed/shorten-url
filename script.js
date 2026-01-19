// Function to trigger Flower Falling effect
function shootFlowers() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        // Launch flower-like confetti from both sides
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffffff'],
            shapes: ['circle'], // Simulating petals
            scalar: 1.2
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffffff'],
            shapes: ['circle'],
            scalar: 1.2
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

document.getElementById('shortenBtn').addEventListener('click', async () => {
    const longUrl = document.getElementById('longUrl').value;
    const shortenBtn = document.getElementById('shortenBtn');
    const resultSection = document.getElementById('resultSection');
    const loader = document.getElementById('loader');
    const shortUrlInput = document.getElementById('shortUrl');
    const modal = document.getElementById('successModal');

    if (!longUrl) {
        alert("Please enter a valid URL!");
        return;
    }

    loader.classList.remove('hidden');
    resultSection.classList.add('hidden');
    shortenBtn.disabled = true;

    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        
        if (response.ok) {
            const data = await response.text();
            shortUrlInput.value = data;
            
            // Success Actions:
            resultSection.classList.remove('hidden');
            modal.classList.remove('hidden'); // Show Popup
            shootFlowers(); // Start Flower Rain
            
        } else {
            alert("Sorry, unable to shorten this link.");
        }
    } catch (error) {
        alert("Server error. Please try again later.");
    } finally {
        loader.classList.add('hidden');
        shortenBtn.disabled = false;
    }
});

// Close Modal
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('successModal').classList.add('hidden');
});

// Copy Functionality
document.getElementById('copyBtn').addEventListener('click', () => {
    const shortUrlInput = document.getElementById('shortUrl');
    shortUrlInput.select();
    document.execCommand('copy');
    
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
        copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
    }, 2000);
});