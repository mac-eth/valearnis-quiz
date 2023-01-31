# Mac's Quiz App

## Setting Discord Bot
You will need a Discord account, so register one if you haven’t already.

Navigate to https://discord.com/developers/applications↗ and click “New Application” in the top right corner. Give your application a name and agree to the Terms of Service.

Once your application has been created, navigate to “Settings → OAuth2 → General”.

Copy the “Client ID” and add it to your .env as DISCORD_CLIENT_ID.

Click “Reset Secret”, copy the new secret, and add it to your .env as DISCORD_CLIENT_SECRET.

Click “Add Redirect” and type in http://localhost:3000/api/auth/callback/discord.

Set the NEXTAUTH_SECRET in .env. Any string will work.

## Setting .ENV

``` 
DATABASE_URL="file:./db.sqlite"
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
```

Now to deploy just do:

```
yarn run dev
```
