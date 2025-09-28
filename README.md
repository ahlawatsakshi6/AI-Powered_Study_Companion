
# AI-Powered Study Companion

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-000000?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

[Live Demo](https://ai-study-companion-a-5iee.bolt.host/)

---

## **Project Overview**
AI-Powered Study Companion is a web application that helps students **summarize notes, extract key points, and create flashcards** instantly. By leveraging AI, users can upload or paste their study material and get concise, organized content, saving time and improving learning efficiency.  

Built with **React**, **Node.js**, and **OpenAI API**, this project demonstrates full-stack web development with AI integration.  

---

## **Features**
- **Upload or Paste Notes:** Input study material easily.  
- **AI Summarization:** Generate concise summaries of long notes.  
- **Key Points Extraction:** Highlight important concepts.  
- **Flashcard Creation:** Convert notes into interactive flashcards.  
- **User-Friendly Interface:** Intuitive and clean design for seamless experience.  

---

## **Technologies Used**
- **Frontend:** React  
- **Backend:** Node.js + Express  
- **Database (optional):** MongoDB  
- **AI Service:** OpenAI API  
- **Hosting:** [Bolt](https://ai-study-companion-a-5iee.bolt.host/)  

---

## **How It Works**
1. Users open the web app and upload or paste their notes.  
2. Notes are sent to the Node.js backend.  
3. Backend calls the OpenAI API for summarization and key point extraction.  
4. AI results are returned to the frontend and displayed.  
5. Users can download summaries or flashcards for revision.  

---
## Installation & Setup

### Step 1: Clone the repository
```bash
git clone <your-repo-url>
cd ai-study-companion

Step 2: Install dependencies
npm install

Step 3: Set environment variables
Create a .env file in the backend folder and add:
env
OPENAI_API_KEY=your_openai_api_key
PORT=5000

Step 4: Start backend server
npm run server

Step 5: Start frontend
npm start

Step 6: Visit the app
Open your browser and go to:
http://localhost:3000
---
