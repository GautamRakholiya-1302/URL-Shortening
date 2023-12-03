# URL-Shortening


# URL Shortener Service

## Overview

This repository contains the source code and documentation for a URL shortener service that generates unique short aliases for long URLs and provides seamless redirection to the original URLs.

## Features

- **Shorten URLs:** Generate short and unique aliases for long URLs.
- **Redirection:** Redirect users to the original URL.
- **Link Expiration:** URLs expire after a default time span.
- **High Availability:** Ensure high availability to prevent service downtime.
- **Real-time Redirection:** Redirect users in real-time with minimal latency.
- **Security:** Non-predictable short URLs for enhanced security.

## Assumptions

- Handles 30M new URL shortenings per month.
- Stores data for 5 years, resulting in approximately 1.8 billion records.
- Uses 7 characters for short URLs from the character set [A-Z, a-z, 0-9].

## Data Capacity Modeling

- Average long URL size: 2KB.
- Short URL size: 17 Bytes.
- Total storage estimation for 30M active users over 5 years.
- Selection of NoSQL database for scalability.

## URL Shortening Logic

### Base62 Encoding

- Utilizes a combination of characters and numbers (A-Z, a-z, 0–9).
- Allows for approximately 3.5 trillion unique URLs with 7 characters.

### MD5 Encoding

- MD5 generates a 128-bit output, but uses only 43 bits for a 7-character short URL.
- Addresses collisions by checking for existing IDs in the database.

## Database Selection

- Recommends NoSQL databases for better scalability despite eventual consistency.

## Techniques to Generate and Store TinyURL

### Technique 1

- Checks existence of short URL in the database before insertion.
- Addresses race conditions in a single-server setup.

### Technique 2 (MD5 Approach)

- Encodes long URLs using MD5 and takes the first 7 characters.
- Checks the database for existing short URLs.
- Saves space in the database for identical long URLs.

### Technique 3 (Counter Approach with Zookeeper)

- Uses counters for scalable solutions.
- Handles distributed hosts using Zookeeper for coordination.
- Divides URL space into ranges and assigns them to servers.

## High-Level Architecture

- User Interface for input and output.
- Application Server for URL processing and database interaction.
- Database for storing URL mappings.
- Caching for faster read operations.
- Redirection mechanism for short URL access.
- Analytics for tracking link clicks.
- Load Balancer for distributing traffic.
- Security measures against malicious activities.






