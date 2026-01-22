For JSON AUTH reference link is "https://github.com/jeremyben/json-server-auth"

/\*
json-server-auth supports "guarded routes" using predefined permission codes.
These guarded routes are defined at the ROOT level and control access to
any resource that comes AFTER them in the URL.

Guarded routes format:
/<permission-code>/\*

The permission code determines:

- Who can READ the resource
- Who can WRITE (POST, PUT, PATCH, DELETE) the resource

---

PREDEFINED GUARDED ROUTE PERMISSION CODES

---

/664/\*

- READ : Everyone (public users + logged-in users)
- WRITE : Only logged-in users

/660/\*

- READ : Only logged-in users
- WRITE : Only logged-in users

/644/\*

- READ : Everyone
- WRITE : Only the OWNER of the resource

/640/\*

- READ : Only logged-in users
- WRITE : Only the OWNER of the resource

/600/\*

- READ : Only the OWNER of the resource
- WRITE : Only the OWNER of the resource
- This is the MOST RESTRICTIVE rule
- Commonly used for sensitive data like user profiles

/444/\*

- READ : Everyone
- WRITE : No one (read-only)

/440/\*

- READ : Only logged-in users
- WRITE : No one

/400/\*

- READ : Only the OWNER of the resource
- WRITE : No one

---

WHY WE USE GUARDED ROUTES

---

- To protect sensitive data (like users, orders, profiles)
- To enforce ownership-based access control
- To simulate real backend authorization logic
- To prevent unauthorized access in mock APIs

---

EXAMPLE USED IN THIS FILE

---

{
"/users\*": "/600"
}

Meaning:

- Only the logged-in user can READ or WRITE their OWN user data
- A user CANNOT access another user's data
- Unauthenticated requests are rejected

Example behavior:

- GET /600/users/1 (logged-in user with id = 1) → 200 OK
- GET /600/users/23 (logged-in user with id = 1) → 403 Forbidden
- GET /600/users/1 (not logged in) → 401 Unauthorized

NOTE:

- This project uses /600 because it is a PERSONAL project
- User data must be fully private and owner-restricted
  \*/
