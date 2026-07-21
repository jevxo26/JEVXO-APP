#!/bin/bash

# Fix Railway SMTP Environment Variables
# This script removes quotes and special characters from SMTP variables

echo "Updating Railway environment variables..."

# Remove old variables first (if they exist)
railway variables --remove SMTP_HOST SMTP_PORT SMTP_USER SMTP_PASS SMTP_FROM AWS_REGION 2>/dev/null || true

echo "Setting new variables without quotes..."

# Set variables one by one without quotes
railway variables --set "SMTP_HOST=email-smtp.ap-south-1.amazonaws.com"
railway variables --set "SMTP_PORT=587"
railway variables --set "SMTP_USER=AKIA4XMAIIDGVFRCTSFS"
railway variables --set "SMTP_PASS=Av48tpTTBb+SghING0FhJcNkURaXdKeQGKmykhNEUwzt"
railway variables --set "SMTP_FROM=support@squadlog.studio"
railway variables --set "AWS_REGION=ap-south-1"

echo "Done! Railway will automatically redeploy."
