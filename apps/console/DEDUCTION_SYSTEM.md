# Payroll Deduction & Bonus System

## Overview

The Payroll Deduction & Bonus System is a comprehensive feature that allows administrators to manage employee payroll deductions and project-based bonuses across Projects, Leave Management, and Payroll sections. The system automatically tracks assignments and applies them to employee paychecks.

## Features

### 1. **Deduction Types**

#### Project Penalty (`PROJECT_PENALTY`)

- Applied when employees miss project deadlines or perform poorly.
- Automatically suggested based on the "Assigned Amount" for an employee on a project.
- Admin can choose to deduct the full assigned amount or a partial amount.

#### Leave Deduction (`LEAVE_DEDUCTION`)

- **Automatic**: When an "Unpaid Leave" request is approved, the system automatically calculates a deduction based on the employee's daily salary and the number of leave days.
- **Manual**: Admins can also manually create leave-based deductions for other leave violations.

#### Manual Deduction (`MANUAL`)

- General purpose deductions for disciplinary actions, equipment damage, etc.

### 2. **Bonus Types (Project Assignments)**

#### Project Bonus/Payment

- Admins can assign a specific amount of money to each employee for a project.
- This is done via the **Project Team & Budget** section on each project's detail page.
- These amounts are automatically added to the employee's next payroll as a `bonus`.
- Once a payroll is created, the project assignment is marked as `Paid`.

### 3. **Integration Points**

#### Project Detail Page

- **Project Team & Budget Section**: Manage which employees are on the project and how much they will receive.
- **Apply Penalty Button**: Quick action to penalize a member. The list of employees is automatically filtered to show only project members.

#### Leave Management Section

- **Automatic Calculation**: Approving "Unpaid Leave" triggers an automatic calculation: `(Monthly Salary / 30) * Leave Days`.
- **Deduction Creation**: A deduction record is automatically created and linked to the leave request.

#### Payroll Section

- **Deductions Tab**: Management dashboard for all pending and applied deductions.
- **Payroll Generation**: When generating payroll, the system automatically:
  1. Fetches all pending deductions.
  2. Fetches all unpaid project assignments (bonuses).
  3. Updates the `bonus`, `deductions`, and `netPay` fields accordingly.
  4. Marks the source records as processed/paid.

---

## Workflow Examples

### Scenario A: Successful Project Completion

1. Admin assigns Employee A to "Project X" with an assigned amount of $500.
2. Project X is completed.
3. At the end of the month, Admin creates payroll for Employee A.
4. System sees the $500 assignment, adds it to the `bonus` field.
5. Employee A receives their base salary plus the $500 bonus.

### Scenario B: Project Late Delivery

1. Admin assigns Employee A to "Project X" with an assigned amount of $500.
2. Employee A fails to deliver on time.
3. Admin clicks **Apply Penalty** on the project page.
4. Admin selects Employee A, and the system shows they were assigned $500.
5. Admin decides to deduct $200 as a penalty.
6. A deduction record of $200 is created.
7. At the end of the month, the payroll includes the $500 bonus AND the $200 deduction, resulting in a net +$300 adjustment.

### Scenario C: Unpaid Leave

1. Employee B requests 3 days of "Unpaid Leave".
2. Admin approves the leave.
3. System calculates `(Salary / 30) * 3` and creates a `LEAVE_DEDUCTION`.
4. The deduction is automatically applied to Employee B's next payroll.

---

## Usage Guide

### Managing Project Team & Budget

1. Go to **Admin → Projects** and select a project.
2. Scroll to the **Project Team & Budget** section.
3. Click **Add Member** to assign an employee and their payment amount.
4. Use the trash icon to remove assignments.

### Applying a Penalty

1. On the project page, click the **Apply Penalty** button in the header.
2. Select the employee (the list shows only project members).
3. The system will display the amount assigned to them for this project for reference.
4. Enter the deduction amount and reason.

### Managing Deductions in Payroll

1. Go to **Admin → Payroll**.
2. Click the **Deductions** tab.
3. You can see which deductions are `Pending` and which have been `Applied`.
4. Only `Pending` deductions can be deleted.

---

## API Summary

### Project Member API (`/project-members`)

- `GET /project-members/project/:projectId`: Get all members and their assigned amounts.
- `POST /project-members`: Assign a member or update their amount.
- `DELETE /project-members/:id`: Remove a member assignment.

### Deduction API (`/deductions`)

- `GET /deductions`: Get all deductions.
- `POST /deductions`: Create a new deduction.
- `DELETE /deductions/:id`: Delete a pending deduction.

---

**Last Updated**: January 30, 2026
**Version**: 1.1.0 (Added Project Member/Bonus integration)
