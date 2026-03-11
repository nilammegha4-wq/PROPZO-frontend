import axios from 'axios';

async function testProxy() {
    try {
        const res = await axios.post("http://localhost:5173/api/auth/login", {
            email: "admin@gmail.com",
            password: "admin123",
            role: "admin"
        });
        console.log("Success! Response:", res.data);
    } catch (error) {
        console.log("Failed. Status:", error.response?.status);
        console.log("Response:", error.response?.data);
    }
}

testProxy();
