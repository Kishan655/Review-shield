const express = require('express');
const cors = require('cors'); 
const path = require('path');

const app = express();

// Deployment ke liye Port setting (Cloud apna port khud dega, ya default 5000 lega)
const PORT = process.env.PORT || 5000; 

app.use(cors()); 
app.use(express.json());

// --- FRONTEND SERVING ---
// Ye line aapki index.html file ko browser mein load karegi
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- API LOGIC (Review Analysis) ---
app.post('/api/analyze', (req, res) => {
    const { url } = req.body;
    const lowerUrl = url.toLowerCase();
    console.log("Analyzing URL:", url);

    // 1. SMART DEMO: iPhone (Genuine Case)
    if (lowerUrl.includes('iphone')) {
        return res.json({
            score: 12,
            total: 3450,
            fakeCount: 414,
            susCount: 150,
            realCount: 2886,
            verified: 92
        });
    }
    
    // 2. SMART DEMO: Kurta/Shoes (Fake Case)
    else if (lowerUrl.includes('kurta') || lowerUrl.includes('shoes')) {
        return res.json({
            score: 78,
            total: 420,
            fakeCount: 327,
            susCount: 40,
            realCount: 53,
            verified: 35
        });
    }

    // 3. RANDOM CASE: Kisi bhi aur link ke liye
    else {
        const score = Math.floor(Math.random() * 100); 
        const totalReviews = Math.floor(Math.random() * 700) + 100; 
        const fakeCount = Math.floor((score / 100) * totalReviews);
        const susCount = Math.floor(Math.random() * (totalReviews - fakeCount) * 0.3); 
        const realCount = totalReviews - fakeCount - susCount; 
        const verifiedPercent = Math.floor(Math.random() * 40) + 50; 

        return res.json({
            score: score,
            total: totalReviews,
            fakeCount: fakeCount,
            susCount: susCount,
            realCount: realCount,
            verified: verifiedPercent
        });
    }
});

// Server Start
app.listen(PORT, () => {
    console.log(`✅ Server is live on port: ${PORT}`);
});