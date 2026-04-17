const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(express.json());

// Check route
app.get('/api/message', (req, res) => {
    res.json({ message: "Backend is Active!" });
});

// MAIN ROUTE: Ab har link ke liye alag data aayega!
app.post('/api/analyze', (req, res) => {
    const { url } = req.body;
    console.log("Analyzing URL:", url);

    // AI Logic Simulation (Ab sab kuch RANDOM hoga)
    const score = Math.floor(Math.random() * 100); // 0 se 100 ke beech koi bhi Fake Score
    
    // Total reviews ko 50 se lekar 800 ke beech random rakhte hain
    const totalReviews = Math.floor(Math.random() * 750) + 50; 
    
    // Score ke hisaab se fake, suspicious aur real reviews calculate karte hain
    const fakeCount = Math.floor((score / 100) * totalReviews);
    const susCount = Math.floor(Math.random() * (totalReviews - fakeCount) * 0.4); // Bacha hua data thoda suspicious
    const realCount = totalReviews - fakeCount - susCount; // Baaki sab real
    
    const verifiedPercent = Math.floor(Math.random() * 40) + 50; // 50% se 90% ke beech random verified

    res.json({
        score: score,
        total: totalReviews,
        fakeCount: fakeCount,
        susCount: susCount,
        realCount: realCount,
        verified: verifiedPercent
    });
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));