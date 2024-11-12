**App Name:** Better Reads
**By:** José Pereira


## Introduction

Welcome to the Better Reads app! This web app is designed to help you keep track of your reading habits, organize your books by genre, create custom bookshelves, rate your books, and manage your "to be read" list.

## Features

- **Book Organization:** You can group your books according to genre in predefined bookshelves or create custom bookshelves to suit your preferences.
  
- **Book Ratings:** Rate your books to keep track of your favorites and provide feedback on your reading experiences.
  
- **Book Information Editing:** Edit book details such as title, author, genre, and rating to keep your library up-to-date.
  
- **Add and Remove Books:** Easily add new books to your library or remove books you've finished or no longer wish to track.
  
- **To Be Read (TBR) List:** Maintain a "to be read" list where you can add books you're interested in reading. The list supports drag-and-drop functionality, allowing you to reorder books according to your priority.



**Getting Started:**

### Prerequisites

* Docker installed on your system (follow the instructions below to 
install)
* Basic knowledge of Docker and containerization

- **If you don't want to use the containerized version app you can use a static version (with some features disabled) in https://josepereira96.github.io/Better-Reads/**

### Installing Docker

To get started with this app, you'll need to have Docker installed on your 
system. You can download the latest version of Docker from the official 
website:

https://www.docker.com/get-started

Follow the installation instructions for your operating system.

### Running the App

Once you've got Docker up and running, follow these steps to get started 
with this app:

#### Step 1: Clone the Repository

Clone this repository using Git:
```bash
git clone https://github.com/josepereira96/better-reads.git
```

#### Step 2: Build and Run the Docker Container

Navigate to the cloned repository directory:
```bash
cd better-reads
```
Run the following command to build and start a new container:
```bash
docker-compose up --build
```
This will download the necessary dependencies, build the Docker image, and 
start a new container with the app running.

You can now access the web application by navigating to 
`http://localhost:3000` in your browser.

### Stopping the Container

To stop the container and clean up any resources used during execution, 
run:
```bash
docker-compose down
```


## Technologies Used

- **Google Books API:** Used to fetch book covers and additional book information.
- **HTML, CSS, JavaScript:** The core technologies used to build the web app.
- **Docker** App containerization.


## Support

If you encounter any issues while using Better Reads or have any suggestions for improvement, please feel free to reach out to me at [your-email@example.com](mailto:your-email@example.com).

Happy reading! 📚