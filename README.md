# Student Feedback Automation System

A full-stack feedback collection system that allows students to submit course feedback through a React web application. Submitted feedback is automatically processed using an n8n workflow, stored in Google Sheets, evaluated based on rating, and followed by an automated email response.

## Project Overview

The Student Feedback Automation System automates the process of collecting and managing student feedback.

The system connects a React frontend with n8n workflow automation to receive submissions, validate information, store responses, classify feedback based on rating, and send automated email notifications.

## Features

### Frontend Application

- Responsive feedback form interface
- Student name input
- Email address input
- Course name input
- 1-5 star rating system
- Feedback message input
- Client-side validation
- Loading state during submission
- Success and error notifications
- Fetch API integration with n8n webhook

### Automation Workflow

- Receives feedback through an n8n webhook
- Validates submitted data
- Stores responses in Google Sheets
- Applies rating-based feedback classification:
  - Rating 1-2: Needs Improvement
  - Rating 3-5: Positive Feedback
- Sends automated confirmation emails

## Technologies Used

### Frontend

- React.js
- JavaScript
- Tailwind CSS
- Fetch API

### Automation

- n8n Workflow Automation
- Webhook Trigger
- Conditional Logic
- Google Sheets Integration
- Gmail Integration

### Storage

- Google Sheets

## Project Structure

```
Student-Feedback-Automation-System/
│
├── src/
│   ├── components/
│   │   ├── Alert.jsx
│   │   ├── Button.jsx
│   │   ├── InputField.jsx
│   │   ├── Rating.jsx
│   │   ├── TextArea.jsx
│   │   └── FeedbackForm.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
│
├── package.json
├── package-lock.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```
## System Workflow

```
Student Feedback Form
          |
          ↓
React Application
          |
          ↓
n8n Webhook
          |
          ↓
Data Validation
          |
          ↓
Rating Evaluation
          |
     ┌───────────────┐
     ↓               ↓
Rating ≤ 2       Rating > 2
     ↓               ↓
Needs            Positive
Improvement      Feedback
     ↓               ↓
          Google Sheets
                 |
                 ↓
          Automated Email
```
## Form Fields

The application collects the following student feedback information:

| Field | Description | 

| Student Name  | Captures the student's full name |
| Email Address | Captures the student's email for confirmation notifications |
| Course Name   | Identifies the course being evaluated |
| Rating        | Allows students to provide a rating from 1 to 5 stars |
| Feedback      | Allows students to provide detailed feedback about the course |

## Form Validation

The system performs client-side validation before submission:

- Student name cannot be empty
- Email address must be provided and follow a valid format
- Course name is required
- A rating between 1 and 5 must be selected
- Feedback message cannot be empty

If validation fails, the user receives an error message and must correct the highlighted fields before submitting.

## Feedback Submission Process

When a student submits feedback:

1. The React application validates the entered information.
2. The feedback data is converted into JSON format.
3. The data is sent to the n8n production webhook using a POST request.
4. The n8n workflow processes and stores the feedback.
5. The student receives a confirmation notification after successful submission.

## Installation and Setup

Follow the steps below to run the project locally.

## Environment Configuration

The application communicates with an n8n automation workflow through a production webhook URL.

Before running the application, configure the webhook endpoint used for submitting feedback.

### Create Environment File

Create a `.env` file in the root directory of the React project:

```
VITE_N8N_WEBHOOK_URL=your_n8n_production_webhook_url
```

# n8n Automation Workflow

The Student Feedback Automation System uses n8n to automate the processing of student feedback submissions.

The workflow receives feedback from the React frontend through a webhook, validates the submitted information, classifies feedback based on rating, stores the response in Google Sheets, and sends an automated email notification.

## n8n Workflow Overview

~~~text
React Feedback Form
        |
        ↓
Webhook Trigger
        |
        ↓
Data Validation
        |
        ↓
Rating Classification
        |
        ↓
Google Sheets Storage
        |
        ↓
Email Notification
~~~

---

# Workflow Setup

## 1. Webhook Trigger Node

The workflow starts with a Webhook node that receives feedback submissions from the React application.

### Configuration

~~~text
Node Type:
Webhook

HTTP Method:
POST

Path:
student-feedback

Response Mode:
Immediately
~~~

The React application sends feedback data using a POST request.

Example request data:

~~~json
{
  "studentName": "Kamogelo Legae",
  "email": "student@example.com",
  "course": "AI101",
  "rating": 5,
  "feedback": "The course content was very helpful."
}
~~~

---

# 2. Data Validation

After receiving the feedback, the workflow validates that all required information has been provided.

## Required Fields

~~~text
✓ Student Name
✓ Email Address
✓ Course Name
✓ Rating
✓ Feedback Message
~~~

If validation fails:

~~~text
Webhook
   |
   ↓
Validation
   |
   ↓
Stop Workflow
~~~

If validation succeeds:

~~~text
Webhook
   |
   ↓
Validation
   |
   ↓
Continue Processing
~~~

---

# 3. Rating Classification

The workflow evaluates the student's rating using conditional logic.

## Logic

~~~text
IF Rating <= 2

Category:
Needs Improvement


IF Rating > 2

Category:
Positive Feedback
~~~

Workflow:

~~~text
              Rating Check
                   |
        ┌──────────┴──────────┐
        ↓                     ↓
   Rating <= 2           Rating > 2
        ↓                     ↓
Needs Improvement     Positive Feedback
~~~

---

# 4. Google Sheets Storage

After processing the feedback, the information is stored in Google Sheets.

## Configuration

~~~text
Node Type:
Google Sheets

Operation:
Append Row
~~~

Stored information:

| Field | Description |
|---|---|
| Student Name | Student who submitted feedback |
| Email | Student email address |
| Course | Course being reviewed |
| Rating | Rating value from 1-5 |
| Feedback | Written feedback message |
| Category | Feedback classification |

---

# 5. Email Notification

After storing the feedback, an automated confirmation email is sent.

## Configuration

~~~text
Node Type:
Gmail

Action:
Send Email
~~~

Example email:

~~~text
Subject:
Feedback Submission Received

Message:

Hello {{studentName}},

Thank you for submitting your feedback.

Your response has been successfully recorded.

We appreciate your time and input.

Regards,
Student Feedback System
~~~

---

# Production Webhook Configuration

The React application uses the production webhook URL.

~~~text
Production:
https://your-n8n-instance.com/webhook/student-feedback

Test:
https://your-n8n-instance.com/webhook-test/student-feedback
~~~

The production webhook only works when the workflow is published.

---

# Complete n8n Workflow

~~~text
                 React Application
                        |
                        ↓
              Webhook Trigger (POST)
                        |
                        ↓
              Validate Feedback Data
                        |
                        ↓
              Rating Classification
                        |
             ┌──────────┴──────────┐
             ↓                     ↓
       Rating <= 2            Rating > 2
             ↓                     ↓
   Needs Improvement      Positive Feedback
             |
             ↓
        Google Sheets
             |
             ↓
       Gmail Notification
~~~

---

# Testing the Workflow

1. Start the React application.
2. Complete the feedback form.
3. Submit feedback.
4. Confirm the webhook receives the request.
5. Check the n8n execution history.
6. Verify the data appears in Google Sheets.
7. Confirm the email notification is sent.

This automation removes manual feedback processing by automatically collecting, analysing, storing, and responding to student feedback.

## Prerequisites

Before installing the project, ensure you have the following installed:

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)
- Git

Verify your installations:

```bash
node -v
```


