# Tech Tasks — Setup

One-time setup. About 15 minutes. You only do this once.

---

## 1. Create a Firebase project

1. Go to **https://console.firebase.google.com** and sign in with any Google account.
2. Click **Add project**. Name it anything (e.g. `techtasks`). Skip Google Analytics.
3. Wait for it to finish, then click **Continue**.

## 2. Enable Email/Password sign-in

1. Left sidebar → **Build → Authentication → Get started**.
2. Click **Email/Password** → toggle **Enable** → **Save**.
3. Go to the **Users** tab → **Add user** twice:
   - Your email + a password (owner)
   - Your tech's email + a password (tech)
4. After creating each, copy their **User UID** (the long string in the Users list). You need both.

## 3. Enable Firestore

1. Left sidebar → **Build → Firestore Database → Create database**.
2. Pick a region close to you (e.g. `us-central`). Click **Next**.
3. Choose **Start in production mode** → **Create**.

## 4. Get your Firebase config

1. Top left → gear icon → **Project settings**.
2. Scroll down to **Your apps** → click the **`</>`** (Web) icon.
3. Give it a nickname (e.g. `techtasks-web`) → **Register app** (skip Firebase Hosting).
4. Firebase shows you a `firebaseConfig = { ... }` block. Copy those values.

## 5. Paste config into `index.html`

Open `index.html`. Find the **FIREBASE CONFIG** block near the top of the `<script>` and paste in your values:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "techtasks-xxxxx.firebaseapp.com",
  projectId: "techtasks-xxxxx",
  storageBucket: "techtasks-xxxxx.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};
```

Then paste the two UIDs from step 2:

```js
const OWNER_UID = "the long string for your account";
const TECH_UID  = "the long string for your tech's account";
```

(If you forgot to copy the UIDs, sign in to the app once and it'll show your UID on-screen.)

## 6. Lock down the database

1. In Firebase Console → **Firestore Database** → **Rules** tab.
2. Delete everything in the editor.
3. Open `firestore.rules` from this folder, replace the two `PASTE_*_UID` strings with the real UIDs, then paste the whole thing into the Rules editor.
4. Click **Publish**.

That's it — now only you and the tech can read or write tasks.

## 7. Deploy to GitHub Pages

1. Push the `techtasks` folder to a GitHub repo (or add it to your existing pages repo).
2. In the repo → **Settings → Pages** → set the branch and folder → **Save**.
3. Wait a minute, then open the URL GitHub gives you (`https://<you>.github.io/<repo>/techtasks/`).

## 8. Install as a desktop app

**On your machine (Chrome/Edge):**
1. Open the app URL.
2. Sign in.
3. Look for the **install icon** in the address bar (small monitor with a down-arrow) → click **Install**.
4. It now opens like a normal app with its own icon.

**On the tech's machine:**
Same three steps. He'll sign in with his email + password.

---

## Adding more people later

If you ever need a third user:
1. Add them in Firebase → Authentication → Users.
2. Copy their UID.
3. Add a third `const NEW_UID = "..."` in `index.html` and update the role check.
4. Add that UID to `firestore.rules` and re-publish.

## What it costs

Firebase's free tier ("Spark plan") covers ~50k reads / 20k writes per day. One tech using this daily won't come close. No credit card required.
