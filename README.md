# E-Commerce Web App: React + Redux + EmailJS

## Overview

This project contains a basic e-commerce web application built upon the Fake Store API (https://fakestoreapi.com/). The application displays product cards, includes a shopping cart, and leverages the Email.js library for sending order confirmation emails.

## Installation

1. Clone the repository: `git clone https://github.com/alina-vakulenko/ecommerce-app-with-emails`
2. Change into the project directory
3. Install dependencies: `npm install`

## Environment Variables

This project relies on certain environment variables to configure various settings. These variables should be defined in a .env file in the root of the project. To help you get started, a template file named .env.example has been provided. Make a copy of this file and replace the placeholder values with your actual configuration.

# EmailJS Configuration

- VITE_EMAILJS_PUBLIC_KEY: Provide your EmailJS public key. You can obtain this key by signing up on the EmailJS platform.

- VITE_EMAILJS_SERVICE_ID: Set your EmailJS service ID. This identifies the EmailJS service you are using for sending emails.

- VITE_EMAILJS_TEMPLATE_ID: Specify the EmailJS template ID that corresponds to the email template you want to use.

## Usage

1. Run the application: npm run dev
2. Open your browser and navigate to http://localhost:5173/

## Technical Stack

- React
- React Router with v6.4 Data APIs
- TypeScript
- Redux Toolkit
- react-hook-form
- zod for validation
- Tailwind CSS + shadcn-ui components
- react-email for beautiful emails
- EmailJS for sending emails
