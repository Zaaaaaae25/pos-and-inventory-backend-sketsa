# Activity Log Verification Guide

Use the following flow to ensure the automatic activity logging matches the expected
`before`/`after` contract.

1. **Start the API**
   - Run migrations: `npm run prisma:migrate`.
   - Seed baseline data if needed: `npm run prisma:seed`.
   - Start the server: `npm run dev` or whichever script you use locally.

2. **Authenticate and capture a token**
   - Send `POST /api/auth/login` with a valid account from the seed data.
   - Copy the `accessToken` for later requests.

3. **Create an entity**
   - Example: `POST /api/units` with body `{"name":"Gram","abbreviation":"g"}` and the bearer token.
   - Expect HTTP 201 and note the returned `id` (e.g., `42`).

4. **Update the same entity**
   - `PUT /api/units/42` with body `{"name":"Gram","abbreviation":"gr"}`.
   - Expect HTTP 200. This guarantees both `before` and `after` snapshots.

5. **Delete the entity**
   - `DELETE /api/units/42`.
   - Expect HTTP 204.

6. **Inspect activity logs**
   - `GET /api/activity-logs` (permission: `view_reports`).
   - You should see three consecutive entries:
     - `action = create_units`: `contextJson.before` is `null`, `contextJson.after.id === 42`.
     - `action = update_units`: both `before` & `after` exist with the differing abbreviation values.
     - `action = delete_units`: `contextJson.before.id === 42`, `contextJson.after === null`.
   - `entityType` matches the table name (`units`) and `entityId` matches the affected row id (`42`).

7. **Automate with Postman**
   - Create a collection with the four requests above.
   - In the **Tests** tab of each request, add assertions such as:
     ```javascript
     pm.test('activity log recorded', function () {
       const latest = pm.response.json()[0];
       pm.expect(latest.entityType).to.eql('units');
     });
     ```
   - Use the Collection Runner so the flow executes sequentially; the pre-request script of each
     step can read/write `pm.collectionVariables` for the token and entity id.

If any of the checks do not match (e.g., `entityType` mismatch or missing `before` snapshot),
repeat the CRUD flow and verify the API responses as well as the `activity_logs` table directly
via your database client.
