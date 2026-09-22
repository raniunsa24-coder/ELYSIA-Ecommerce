const API_URL = "https://elysia-hg3qhckr.b4a.run/api";

export async function getProducts() {
const response = await fetch(`${API_URL}/products`);

if (!response.ok) {
throw new Error("Failed to fetch products");
}

const data = await response.json();

if (!Array.isArray(data)) {
throw new Error("Invalid products response");
}

return data;
}

export async function getProductById(id) {
const response = await fetch(`${API_URL}/products/${id}`);

if (!response.ok) {
throw new Error("Failed to fetch product");
}

return await response.json();
}

export async function loginUser(credentials) {
const response = await fetch(`${API_URL}/auth/login`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(credentials),
});

const data = await response.json();

if (!response.ok) {
throw new Error(data.message || "Login failed");
}

return data;
}

export async function registerUser(userData) {
const response = await fetch(`${API_URL}/auth/register`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(userData),
});

const data = await response.json();

if (!response.ok) {
throw new Error(data.message || "Registration failed");
}

return data;
}

export async function createOrder(orderData) {
const response = await fetch(`${API_URL}/orders`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(orderData),
});

const data = await response.json();

if (!response.ok) {
throw new Error(
data.message || "Failed to place order"
);
}

return data;
}
