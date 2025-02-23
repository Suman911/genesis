# 🚀 Axios API with Timeout & Multiple AbortControllers

This is a custom **Axios API instance** designed for handling **timeouts**, **abort signals**, and **error handling** in a robust and flexible way. It allows for **cancellation of multiple requests**, supports **automatic timeouts**, and enables **retry mechanisms**.

---

## 📌 **Key Features**
✅ **Automatic Timeout Handling** (Default: `5000ms` per request)  
✅ **Multiple AbortControllers Support** (Cancel requests dynamically)  
✅ **Global Error Handling with Messages from Server**  
✅ **Custom Cleanup for AbortControllers**  
✅ **Cancel Multiple Requests via a Single Controller**  
✅ **Retry Mechanism for Failed Requests**  

---

## 📜 **API Code Overview**

### **Custom Axios Request Configuration**
```typescript
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    externalControllers?: AbortController[];
    cleanup?: () => void;
    timeoutController?: AbortController;
}
```
- `externalControllers`: List of **external AbortControllers**.
- `timeoutController`: Automatically created **timeout controller**.
- `cleanup()`: Function to **clear timeouts** after request completion.

---

## ⏳ **Timeout Mechanism**
```typescript
const createTimeoutSignal = (timeout = 5000, externalControllers: AbortController[] = []) => {
    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort("timeout"), timeout);

    return {
        signal: AbortSignal.any([timeoutController.signal, ...externalControllers.map(ctrl => ctrl.signal)]),
        cleanup: () => clearTimeout(timeoutId),
        timeoutController
    };
};
```
- Uses `AbortSignal.any()` to **combine timeout and external signals**.
- **Automatically cancels** the request if timeout exceeds.

---

## 📡 **Usage Examples**

### 🟢 **1. One Request, Two Controllers**
```typescript
const controller1 = new AbortController();
const controller2 = new AbortController();

Api.get("/users", { externalControllers: [controller1, controller2] })
    .then(data => console.log(data))
    .catch(error => console.error(error.message));

// Cancelling the request from either controller
controller1.abort(); // ✅ Request is aborted
controller2.abort(); // ✅ Request is aborted
```
👉 If **either controller** aborts, the request is cancelled.

---

### 🟢 **2. Two Requests, One Controller**
```typescript
const controller = new AbortController();

Api.get("/users", { externalControllers: [controller] })
    .then(data => console.log("Users:", data))
    .catch(error => console.error(error.message));

Api.get("/products", { externalControllers: [controller] })
    .then(data => console.log("Products:", data))
    .catch(error => console.error(error.message));

// Cancelling both requests at once
controller.abort(); // ✅ Both requests are aborted
```
👉 A **single controller** can **abort multiple requests**.

---

### 🟢 **3. Multiple Requests, One Button Cancels All**
```typescript
const controller = new AbortController();

const fetchUsers = () => Api.get("/users", { externalControllers: [controller] });
const fetchOrders = () => Api.get("/orders", { externalControllers: [controller] });
const fetchProducts = () => Api.get("/products", { externalControllers: [controller] });

Promise.all([fetchUsers(), fetchOrders(), fetchProducts()])
    .then(([users, orders, products]) => {
        console.log("Users:", users);
        console.log("Orders:", orders);
        console.log("Products:", products);
    })
    .catch(error => console.error(error.message));

// Cancel All Requests with One Button
document.getElementById("cancel-all").addEventListener("click", () => {
    controller.abort(); // ✅ All requests are cancelled
});
```
👉 A **single button** can **cancel multiple ongoing requests**.

---

### 🟢 **4. One Button for Each Request**
```typescript
const controller1 = new AbortController();
const controller2 = new AbortController();

const request1 = Api.get("/data1", { externalControllers: [controller1] });
const request2 = Api.get("/data2", { externalControllers: [controller2] });

document.getElementById("cancel-req1").addEventListener("click", () => {
    controller1.abort(); // ✅ Only Request 1 is cancelled
});

document.getElementById("cancel-req2").addEventListener("click", () => {
    controller2.abort(); // ✅ Only Request 2 is cancelled
});
```
👉 Each request has its **own abort button**.

---

## 🔄 **Retrying Requests**
To allow retrying failed requests, wrap API calls in a function:
```typescript
const fetchData = (controller: AbortController) => {
    Api.get("/data", { externalControllers: [controller] })
        .then(data => console.log("Data:", data))
        .catch(error => console.error(error.message));
};

// Retry on button click
document.getElementById("retry").addEventListener("click", () => {
    const newController = new AbortController();
    fetchData(newController);
});
```
👉 If a request **fails**, clicking "Retry" will **send it again**.

---

## ⚡ **Final Thoughts**
✅ **Flexible**: Works with single/multiple requests and controllers.  
✅ **User Control**: Can cancel individual or all requests at once.  
✅ **Retry-Friendly**: Failed requests can be retried with a button.  

🚀 **This is a powerful setup for handling API requests dynamically in React/Next.js!**

---

# 📤 Sending Form Data & Files Using Axios

This guide explains how to send form data, including files, from a React frontend to a PHP backend using Axios and the `FormData` class.

---

## 🎯 **What is FormData?**
`FormData` is a built-in JavaScript object that allows you to easily construct key-value pairs for form submission, including handling file uploads.

---

## 🚀 **Simple Example: Submitting Text and a Single File**

### **1️⃣ Frontend (React) - Sending Data with Axios**
```jsx
import React, { useState } from "react";
import Api from "./api"; // Using your Axios instance

const UploadForm = () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("file", file);
        
        try {
            const response = await Api.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Upload successful:", response.data);
        } catch (error) {
            console.error("Upload failed:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadForm;
```

---

### **2️⃣ Backend (PHP) - Handling File Uploads**
```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    
    if (!isset($_FILES['file']) || !isset($_POST['name'])) {
        echo json_encode(["success" => false, "message" => "Missing required fields"]);
        exit;
    }

    $name = $_POST['name'];
    $file = $_FILES['file'];

    $uploadDir = __DIR__ . "/uploads/";
    $uploadPath = $uploadDir . basename($file['name']);
    
    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        echo json_encode(["success" => true, "message" => "File uploaded successfully!", "name" => $name]);
    } else {
        echo json_encode(["success" => false, "message" => "File upload failed"]);
    }
}
?>
```

---

## 📂 **Uploading Multiple Files**
Modify the frontend to allow multiple file uploads:

### **1️⃣ Frontend (React) - Multiple Files**
```jsx
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);
    for (let i = 0; i < files.length; i++) {
        formData.append("files[]", files[i]);
    }
    
    await Api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};
```

### **2️⃣ Backend (PHP) - Handling Multiple Files**
```php
if (!empty($_FILES['files'])) {
    foreach ($_FILES['files']['tmp_name'] as $index => $tmpName) {
        $uploadPath = $uploadDir . basename($_FILES['files']['name'][$index]);
        move_uploaded_file($tmpName, $uploadPath);
    }
}
```

---

📺 **Reference Video:** [Image and File Uploading in React JS with Axios and FormData](https://www.youtube.com/watch?v=LyTAxm9UxI8)

This method ensures **efficient** and **secure** file uploads with minimal effort! 🚀

