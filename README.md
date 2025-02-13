# Cypress API tests

## Introduction

This project contains automated API tests for validating CRUD operations on products. The tests are written using Cypress and TypeScript, and they ensure that the API endpoints for fetching, adding, updating, and deleting products are working as expected.

## Prerequisites

- Node.js (version 18 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   - git clone "your repo"

2. Navigate to repo directory
   
3. Install the dependencies:
   - npm install

## Running Tests Locally

To run the API tests locally, use the following command:
1. To run cypress GUI mode:
   - npx cypress open
   
2. To run tests via command line:
   - npm run api-tests

## Running Tests in GitHub Actions
The project is configured to run tests automatically on GitHub Actions. The configuration file is located at api-tests.yml.
The tests will run on every push and pull request to the master branch.

## Cypress Configuration

- baseUrl: The base URL for the API (https://dummyjson.com)
- reporter: The reporter used for test results (cypress-mochawesome-reporter)
- reports directory: cypress/reports



