# retrieve list paginated
curl -X GET https://vercel-postgres-example-sable.vercel.app/users?page=1

# retrieve one
curl -X GET https://vercel-postgres-example-sable.vercel.app/user/:userId

# create
curl -X POST https://vercel-postgres-example-sable.vercel.app/user --header "Content-Type: application/json" --data "{\"name\": \"test_user\", \"email\": \"test@example.com\"}"

# update
curl -X PATCH https://vercel-postgres-example-sable.vercel.app/user/:userId --header "Content-Type: application/json" --data "{\"name\": \"changed_name\", \"email\": \"changed@example.com\"}"

# delete
curl -X DELETE  https://vercel-postgres-example-sable.vercel.app/user/:userId
