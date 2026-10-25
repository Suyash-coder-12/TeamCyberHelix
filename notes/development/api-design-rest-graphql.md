# REST & GraphQL API Design Standards
**Author:** Suyash Rathod & Darshan Tripadwar | **Category:** API Architecture

---

## 📌 REST Endpoint Conventions
- Use nouns instead of verbs: `/api/v1/projects` instead of `/api/v1/getProjects`.
- Plural collection names: `/api/v1/members`, `/api/v1/notes`.
- Nested resources for hierarchy: `/api/v1/projects/{projectId}/alerts`.
- Standard HTTP status codes:
  - `200 OK` (Success with data)
  - `201 Created` (Resource created)
  - `400 Bad Request` (Malformed validation error)
  - `401 Unauthorized` (Missing or invalid token)
  - `403 Forbidden` (Authenticated but insufficient RBAC role)
  - `404 Not Found` (Resource does not exist)
  - `429 Too Many Requests` (Rate limit exceeded)

---

## 🛡️ Response Envelope Standard
```json
{
  "success": true,
  "timestamp": "2026-10-25T15:00:00Z",
  "data": { ... },
  "error": null
}
```
