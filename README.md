# SE 2030 Webring

A webring for Software Engineering class of 2030 students at the University of Waterloo.

## Join the Webring

To add yourself to the webring:

1. Fork this repository
2. Add your profile picture:
   - Add your profile picture image file to the `assets/pfps/` directory
   - Use a descriptive filename (e.g., `your-name.jpg` or `your-name.png`)
   - Recommended: Square image, at least 200x200 pixels
3. Open `src/data/students.ts`
4. Add your entry at the bottom of the `students` array:
   ```typescript
   {
     name: "Your Full Name",
     website: "https://yourwebsite.com",
     pfp: "assets/pfps/your-name.jpg"
   }
   ```
   - Make sure the `pfp` path matches the filename you added in step 2
5. Create a pull request with your changes (include both the image file and the updated `students.ts`)
6. Once approved, your site will be added to the webring!

## Embed The Webring Widget

Here's what to add to your personal website in order to be part of the webring functionality:

**HTML:**

```html
<div style="display: flex; align-items: center; gap: 8px;">
  <a href="https://se30webring.com?from=https://your-site.com&dir=prev">←</a>
  <a href="https://se30webring.com?from=https://your-site.com" target="_blank">
    <img src="https://se30webring.com/assets/icon.svg" alt="SE '30 Webring" style="width: 24px; height: 24px;" />
  </a>
  <a href="https://your-hub-url.com?from=https://your-site.com&dir=next">→</a>
</div>
<!-- Make sure to replace 'your-site.com' with your actual personal site URL -->
```

**JSX:**

```jsx
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <a href={`https://se30webring.com?from=${window.location.href}&dir=prev`}>←</a>
  <a href={`https://se30webring.com?from=${window.location.href}`} target="_blank">
    <img 
      src="https://se30webring.com/assets/icon.svg" 
      alt="SE '30 Webring" 
      style={{ width: '24px', height: '24px', opacity: 0.8 }} 
    />
  </a>
  <a href={`https://se30webring.com?from=${window.location.href}&dir=next`}>→</a>
</div>
```

**How it works:**
- Clicking the arrows (← or →) navigates to the hub with your site URL and direction
- The hub then redirects you to the previous or next site in the webring
- Clicking the icon takes you to the webring hub homepage

## Credits & Inspiration

This webring was heavily inspired by the works of the general [SE Webring](https://se-webring.xyz/) and the [CS Webring](https://cs.uwatering.com/).
