# Simple Categorization App

This project is a **Categorization Web Application** created as part of the frontend intern assignment at Revispy. Built with **Next.js**, **Prisma**, **PostgreSQL**, **JWT** authentication, and deployed on **Vercel**, this app includes a sign-up and login flow, a protected page for users to select their preferred categories, and persistent category selection.

## Demo

[Live Demo](https://revispy-assignment-peach.vercel.app/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Authentication Flow](#authentication-flow)
- [Protected Route](#protected-route)
- [Usage](#usage)
- [Future Improvements](#future-improvements)

## Overview

This application allows users to register, log in, and access a protected page where they can mark categories of interest. Categories are displayed with pagination (6 per page), and selections are stored in the database to persist across sessions. This project demonstrates skills in authentication, protected routes, and database integration.

## Features

- **User Authentication**: Includes sign-up and login functionality with JWT authentication.
- **Protected Route**: Only accessible to authenticated users.
- **Category Display with Pagination**: Displays categories with pagination (6 categories per page).
- **Persistent Category Selection**: Stores user-selected categories in the database to persist across sessions.
- **Static Header**: A common header across all pages, as per assignment requirements.

## Tech Stack

- **Frontend**: Next.js, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL hosted on Neon
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Vercel

## Setup and Installation

To run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Sameercode660/Revispy-assignment.git
   cd categorization-app
