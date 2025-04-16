# Signup Page updates:-

- [x] Form validation - correct email format, have some standard password checks as well (8 chars long, 1 caps, 1 nums etc)
- [x] Handle duplicate email addrewss/ user already exists by proper pop-up (Current only "Sign in failed" Error message is shown)
- [x] Already have a link to redirect login, add a button to go back to "Landing page"
- [x] Improve the pop-up with good UI, after successful signin of ("Sign in sucessful, Redirecting to Login")

# Login Page updates:-

- [x] Form validation - correct email format
- [x] Improve the "invalid credentials" UI after failed login
- [x] Add a back button to go back to "Landing page"

# User Tabs updates:-

- [x] Hash password in User Tabs before storing in database
- [x] Show user successfully created pop-up after sucess in create user User Tabs
- [x] Show user successfully edited pop-up after sucess in edit user User Tabs
- [x] Show user successfully deleted pop-up after sucess in delete user User Tabs
- [x] Show user/email exist error/pop-up in Create user User Tabs 
- [x] Show user/email exist error/pop-up in Edit user User Tabs

# Courses Tabs updates:-

- [x] Show course successfully created pop-up after success in create courses Course Tabs
- [x] Show course successfully edited pop-up after success in edit courses Course Tabs
- [x] Show course successfully deleted pop-up after success in deleted courses Course Tabs

Optional (complex) -

- [x] Have a pop-up before deleting a course or a user, to confirm if you really want to delete the user/course.

-> Have a assign user in courses, edit/create a new table and so now each user can have a corresponding course

-> In Edit you can edit, the user which the course is assigned as well.

Make Database consistent

- [ ] Make sure to make the database consistent, put your schemas/ table queries in code 
    - [ ] Proposed solutions - Amazon RDS, pgdump your local postgres onto amazon DB
- [ ] Develop CI/CD pipeline on github actions
    - [ ] CI , Install deps, run tests, build app
    - [ ] CD (optional)	Deploy build files via SSH or upload to S3
- [ ] Write unit tests for each component, APIs and overall page
    - [ ] Express backend - Jest or Mocha + supertest
    - [ ] Frontend - Vitest or React testing library